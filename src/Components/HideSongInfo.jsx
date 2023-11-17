import React from 'react';
import { Button } from 'react-bootstrap';

const HideSongInfo = ({ setGuessing }) => {
    return (
      <div>
        <Button onClick={() => setGuessing(false)} variant="primary">Show answer</Button>
      </div>
    );
};

export default HideSongInfo;
