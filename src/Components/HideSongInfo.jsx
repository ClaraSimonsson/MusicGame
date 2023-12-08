import React from 'react';
import { Button } from 'react-bootstrap';

const HideSongInfo = ({ gameState, setGameState }) => {
    return (
      <div>
        <Button onClick={() => setGameState(prevState => ({ ...prevState, guessing: false }))} variant="primary">Show answer</Button>
      </div>
    );
};

export default HideSongInfo;
