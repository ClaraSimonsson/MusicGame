import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { usePlaybackState } from "react-spotify-web-playback-sdk";

function SongTitle(props) {
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
        year = new Date(data.album.release_date).getFullYear();
      })
      .catch(error => console.error('Error:', error));
      setTrackYear(year);
    }

    getTrackYear(current_track.id);
  }, [playbackState]);

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
export default SongTitle