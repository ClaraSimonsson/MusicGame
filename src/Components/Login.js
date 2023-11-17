import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Confetti from 'react-confetti';

function Login() {
    /*     const [clientId, setClientId] = useState('');
        const [clientSecret, setClientSecret] = useState('');
    
        const handleSubmit = async (e) => {
            e.preventDefault();
          
            const response = await fetch('/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ clientId, clientSecret }),
            });
            console.log(response)
          }; */

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
/* 
<form onSubmit={handleSubmit}>
<input
    value={clientId}
    onChange={(e) => setClientId(e.target.value)}
    placeholder="Client ID"
/>
<input
    value={clientSecret}
    onChange={(e) => setClientSecret(e.target.value)}
    placeholder="Client Secret"
/>
</form> */
