import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import './App.css';
import DemoPlayer from './Components/DemoPlayer';

function App() {

  const [token, setToken] = useState('');
/*   useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []); */

  return (
    <>
        { token ? <Dashboard token={token}/> : <Login setToken={setToken}/> }
    </>
  );
}


export default App;