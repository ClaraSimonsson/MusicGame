import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import { DiscogsClient } from '@lionralfs/discogs-client';

function SongInfo(props) {
  const playbackState = usePlaybackState();
  const [trackYear, setTrackYear] = useState(null);
  const db = new DiscogsClient({ auth: { userToken: 'nalQJToGqxVvJEFxrptuleWRwTQfhwHMtFvOXQsr' } }).database();
  useEffect(() => {
    if (playbackState === null) return;

    const current_track = playbackState.track_window.current_track;

    async function getTrackYear(track_id) {
      let year = 0;
      await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          let spotify_artist = data.artists[0].name
          db.search({ release_title: data.name, artist: spotify_artist, type: 'master' })
            .then(function ({ data }) {
              let earliestYear = Infinity; // Start with a very large year
              let earliestMaster = {};
              for (let result of data.results) {
                console.log(result)
                let id = result.id;
                if (id) {
                  db.getMaster(id)
                  .then( master => {
                    console.log('Master ' + master)
                    if  (master.artists.name === spotify_artist) {
                      if (master.year < earliestYear) {
                        earliestYear = master.year;
                        earliestMaster = master
                      }
                    }
                  })
                  .catch(function (error) {
                    console.error('Error:', error);
                    console.log(error)
                  })
                }
              }
              return earliestMaster;
            })
        .then(function ({ data }) {
              if (data) {
                console.log(data)
                setTrackYear(data.year);
              }
              else {
                year = checkForExceptions(data);
                console.log('Year is: ' + year)
                if (year === null) {
                  year = 0;
                }
                setTrackYear(year);
              }
        })
        .catch(function (error) {
              if (error) {
                year = checkForExceptions(data);
                console.log('Year is: ' + year)
                if (year === null) {
                  year = 0;
                }
                setTrackYear(year);
            }
        });
      })
      .catch(error => console.error('Error:', error));
    }
    getTrackYear(current_track.id);
  }, [playbackState]);

  function checkForExceptions(data) {
    switch (data.name) {
      case "It's In The Kiss (The Shoop Shoop Song)":
        return 1957;
      case "Piece of My Heart":
        return 1967;
      case "These Boots Are Made for Walkin'":
        return 1965;
      //case "Iron Lion Zion - 7\" Mix":
      //  return 1992;
      case "Tainted Love - Single Version":
        return 1965;
      case "You Can Call Me Al":
        return 1986;
      default:
        return new Date(data.album.release_date).getFullYear();
    }
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