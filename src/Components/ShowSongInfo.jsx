import React from 'react';
import SongInfo from './SongInfo';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { Button } from 'react-bootstrap';

const ShowSongInfo = ({ token, gameState, setGameState }) => {
    const player = useSpotifyPlayer();

    const handleClick = () => {
        setGameState(prevState => ({ ...prevState, guessing: true }));
        setGameState(prevState => ({ ...prevState, is_paused: false }));
        player.nextTrack();
    };

    if (player === null) return null;
    else {
        return (
            <div>
                <SongInfo token={token} />
                <Button onClick={handleClick}>Next Song</Button>
            </div>
        );
    }
};

export default ShowSongInfo;
