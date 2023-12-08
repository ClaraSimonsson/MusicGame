import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { Button } from "react-bootstrap";

function PauseResumeButton( {gameState, setGameState} ) {
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState(true, 1000);

    function playMusic() {
        player.resume();
        setGameState(prevState => ({ ...prevState, is_paused: false }))
    }
    function pauseMusic() {
        player.pause();
        setGameState(prevState => ({ ...prevState, is_paused: true }))
    }

    if (playbackState === null) return null;
    if (player === null) return null;

    else {
        return (
            <div>
                <Button onClick={() => { gameState.is_paused ? playMusic() : pauseMusic() }} >
                    {gameState.is_paused ? "PLAY" : "PAUSE"}
                </Button>
            </div>
        );
    }

}

export default PauseResumeButton