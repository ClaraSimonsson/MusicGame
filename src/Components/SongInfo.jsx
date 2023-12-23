import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { usePlaybackState } from "react-spotify-web-playback-sdk";

function SongInfo(props) {
  const playbackState = usePlaybackState();
  const [trackYear, setTrackYear] = useState(null);

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
          year = checkForExceptions(data);
        })
        .catch(error => console.error('Error:', error));
      setTrackYear(year);
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
      case "Iron Lion Zion - 7\" Mix":
        return 1992;
      case "Pata Pata - Stereo Version":
        return 1967;
      case "Tainted Love - Single Version":
        return 1965;
      default:
        return new Date(data.album.release_date).getFullYear();
    }
  }

  if (playbackState === null) return null;

  const current_track = playbackState.track_window.current_track;
  return (
    <>
      <Image src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
      <div className="now-playing__name">{trackYear}</div>
      <div className="now-playing__name">{current_track.name}</div>
      <div className="now-playing__artist">{current_track.artists[0].name}</div>
    </>);
}
export default SongInfo
