import { Button } from 'react-bootstrap';
import Confetti from 'react-confetti';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <Confetti />
                <h1>Welcome to this funny music game</h1>
                <h2>Just login with Spotify & the game will be started🎉</h2>
                <br />
                <Button href='/auth/login' type="button" variant="dark" size="lg">
                    Start game
                </Button>
            </header>
        </div>
    );
}

export default Login;
