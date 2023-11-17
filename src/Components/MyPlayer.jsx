import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { useState } from "react";
import ShowSongInfo from "./ShowSongInfo";
import HideSongInfo from "./HideSongInfo";
import PauseResumeButton from "./PauseResumeButton";


function MyPlayer({ token }) {
    const SPOTIFY_URI = "spotify:playlist:5mQVbkcILLiU2aqVOplsMy";
    const device = usePlayerDevice();
    const [game_started, setGameStarted] = useState(false);
    const [guessing, setGuessing] = useState(true);
    const [is_paused, setPaused] = useState(false);

    async function startGame() {
        // Start playback
        await fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    context_uri: SPOTIFY_URI,
                    offset: { position: Math.floor(Math.random() * 251) }
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        )

        // Enable shuffle mode
        await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=true&device_id=${device.device_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        setGameStarted(true);
    }

    if (device) {
        if (!game_started) {
            startGame();
        } else {
            return (
                <div className="container">
                    <div className="main-wrapper">
                        <h1>Which year was this song released?</h1>
                        <h2>If you succeed, what is the name of the title and artist?</h2>
                        <div className="now-playing__side">
                            {!guessing ? <ShowSongInfo token={token} setGuessing={setGuessing} setPaused={setPaused} /> : <HideSongInfo setGuessing={setGuessing} />}
                            <PauseResumeButton is_paused={is_paused} setPaused={setPaused} />
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div>Spotify app is loading...</div>
        );
    }
}

export default MyPlayer