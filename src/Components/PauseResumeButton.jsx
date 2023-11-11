import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { useEffect, useState } from "react";

function PauseResumeButton() {
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState();
    const [is_paused, setPaused] = useState(false);

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
                <button onClick={() => {player.previousTrack()}}>Previous</button>
                <button id="togglePlay" className="btn-spotify" onClick={() => { is_paused ? playMusic() : pauseMusic() }} >
                    {is_paused ? "PLAY" : "PAUSE"}
                </button>
                <button onClick={() => {player.nextTrack()}}>Next</button>
            </div>
        );
    }

}

export default PauseResumeButton