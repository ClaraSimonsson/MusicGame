import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { Button } from "react-bootstrap";

function PauseResumeButton( {is_paused, setPaused} ) {
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState();

    function playMusic() {
        player.resume();
        setPaused(false)
    }
    function pauseMusic() {
        player.pause();
        setPaused(true)
    }

    if (playbackState === null) return null;
    if (player === null) return null;

    else {
        return (
            <div>
                <Button onClick={() => { is_paused ? playMusic() : pauseMusic() }} >
                    {is_paused ? "PLAY" : "PAUSE"}
                </Button>
            </div>
        );
    }

}

export default PauseResumeButton