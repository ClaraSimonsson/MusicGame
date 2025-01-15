import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import { DiscogsClient } from '@lionralfs/discogs-client';

function SongInfo(props) {
  const playbackState = usePlaybackState();
  const [trackYear, setTrackYear] = useState(null);
  const db = new DiscogsClient({ auth: { userToken: process.env.REACT_APP_DISCOGS_TOKEN } }).database();
  useEffect(() => {
    if (playbackState === null) return;

    const current_track = playbackState.track_window.current_track;

    async function getTrackYear(track_id) {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
        }
      })
      const jsonData = await response.json();
      const spotify_artists = jsonData.artists[0].name.includes('&') ? jsonData.artists[0].name.split('&').map(artist => artist.trim()) : [jsonData.artists[0].name];
      const spotifyTitle = jsonData.name.includes('-') ? jsonData.name.split('-')[0].trim() : jsonData.name;

      const discogsResult = await db.search({ query: spotify_artists + ' - ' + spotifyTitle, type: 'master' })
      const spotifyArtistRegexes = createArtistRegexes(spotify_artists);
      const spotifyTitleRegexes = createTitleRegexes(jsonData.name);

      let matchingDiscogsResult = findMatches(discogsResult, spotifyTitleRegexes, spotifyArtistRegexes);
      const discogsMasters = await Promise.all(matchingDiscogsResult.map(result => db.getMaster(result.id)))
      const year = findLowestMatchingYear(discogsMasters);
      setTrackYear(year);
    }
    getTrackYear(current_track.id);
  }, [playbackState?.track_window.current_track.id, props.token]);

function createArtistRegexes(spotify_artists) {
  return spotify_artists.map(artist => new RegExp(artist.split(' ').join('.*'), 'i'));
}

  function createTitleRegexes(spotifyTitle) {
    let spotifyTitleRegexes;
    if (spotifyTitle.includes(' - ')) {
      const [spotifyTitleBeforeDash, spotifyTitleAfterDash] = spotifyTitle.split(' - ').map(part => part.trim());
      spotifyTitleRegexes = [
        new RegExp(`\\b${spotifyTitle.split(' ').join('\\b.*\\b')}\\b`, 'i'),
        new RegExp(`\\b${spotifyTitleBeforeDash.split(' ').join('\\b.*\\b')}\\b`, 'i'),
        new RegExp(`\\b${spotifyTitleAfterDash.split(' ').join('\\b.*\\b')}\\b`, 'i')
      ];
    } else {
      spotifyTitleRegexes = [
        new RegExp(`\\b${spotifyTitle.split(' ').join('\\b.*\\b')}\\b`, 'i')
      ];
    }
    return spotifyTitleRegexes;
  }

  function findMatches(discogsResult, spotifyTitleRegexes, spotifyArtistRegexes) {
    let matchingDiscogsResult = []
    for (let result of discogsResult.data.results) {
      const resultData = result.title.split(' - ');
      const artistName = resultData[0];
      const title = resultData[1];
      if (spotifyTitleRegexes.some(regex => regex.test(title)) && spotifyArtistRegexes.some(regex => regex.test(artistName))) {
        matchingDiscogsResult.push(result);
      }
    }
    return matchingDiscogsResult;
  }

  function findLowestMatchingYear(discogsMasters) {
    let year = Infinity;
    for (let master of discogsMasters) {
      if (master.data.year !== 0 && master.data.year < year) {
        year = master.data.year;
      }
    }
    return year;
  }

  if (playbackState === null) return null;
  const current_track = playbackState.track_window.current_track;
  if (trackYear === null) return (<div></div>);
  else {
    return (
      <>
        <Image src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
        <div className="now-playing__name">{trackYear}</div>
        <div className="now-playing__name">{current_track.name}</div>
        <div className="now-playing__artist">{current_track.artists[0].name}</div>
      </>);
  }
}
export default SongInfo