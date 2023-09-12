import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard'
import Login from './Login'
import './App.css';

function App() {

  const [token, setToken] = useState('');
  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      //console.log(json.access_token)
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
        { (token === '') ? <Login/> : <Dashboard token={token} /> }
    </>
  );
}


export default App;