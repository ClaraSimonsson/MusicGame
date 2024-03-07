import { usePlayerDevice } from "react-spotify-web-playback-sdk";
import { useEffect, useState } from "react";
import ShowSongInfo from "./ShowSongInfo";
import HideSongInfo from "./HideSongInfo";
import PauseResumeButton from "./PauseResumeButton";
import Confetti from 'react-confetti';


function MyPlayer({ token }) {
    
    //spotify:playlist:5mQVbkcILLiU2aqVOplsMy - Hitster
    const SPOTIFY_URI = "spotify:album:06O9GpgtDESYZkUfhKpFcK";
    const device = usePlayerDevice();
    const [gameState, setGameState] = useState(() => {
        const savedGameState = sessionStorage.getItem('game_state');
        return savedGameState ? JSON.parse(savedGameState) : {
            game_started: false,
            guessing: true,
            is_paused: false,
        };
    });

    useEffect(() => {
        sessionStorage.setItem('game_state', JSON.stringify(gameState));
    }, [gameState]);

    useEffect(() => {
        if (device && device.status === "ready" && !gameState.game_started) {
            startGame();
        }
    }, [device, gameState.game_started]);

    async function startGame() {
        // Start playback
        await fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    context_uri: SPOTIFY_URI,
                    offset: { position: 0 } //position: Math.floor(Math.random() * 251)
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
        setGameState(prevState => ({ ...prevState, game_started: true }));
    }

    useEffect(() => {
        if (gameState.game_started) {
            if (device?.device_id === undefined) return;
            setGameState(prevState => ({ ...prevState, is_paused: true }));
            // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
            fetch(`https://api.spotify.com/v1/me/player`, {
                method: "PUT",
                body: JSON.stringify({ device_ids: [device.device_id], play: false }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    }, [device?.device_id]);

    if (!device) {
        return (
            <div>Spotify app is loading...</div>
        );
    } else {
        return (
            <div className="container">
                <p className="wrong">Take a shot if you were wrong...</p>
                <p className="force">Also, take a shot if are able to see this...</p>
                <div className="main-wrapper">
                    <Confetti />
                    <h1>Which year was this song released?</h1>
                    <h2>If you succeed, what is the name of the title and artist?</h2>
                    <div className="now-playing__side">
                        {
                            !gameState.guessing ?
                                <ShowSongInfo token={token} gameState={gameState} setGameState={setGameState} /> :
                                <HideSongInfo gameState={gameState} setGameState={setGameState} />
                        }
                        <PauseResumeButton gameState={gameState} setGameState={setGameState} />
                    </div>
                    <Confetti />
                </div>
            </div>
        );
    }

}

export default MyPlayer