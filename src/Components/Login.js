import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Confetti from 'react-confetti';

function Login({ setToken }) {
    const [inputToken, setInputToken] = useState('');

    const handleInputChange = (event) => {
        setInputToken(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setToken(inputToken);
    };
    return (
        <div className="App">
            <header className="App-header">
                <Confetti />
                <h1>Welcome to this funny music game</h1>
                <h2>Just login with Spotify & the game will be started🎉</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="token">Your spotify token:</label>
                    <input id="token" value={inputToken} onChange={handleInputChange}></input>
                    <Button type="submit" variant="dark" size="lg">
                        Start game
                    </Button>
                </form>
            </header>
        </div>
    );
}

export default Login;
