import './css/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import { token } from './hooks/index'
import Account from './pages/account';
import Login from './pages/login';

function App() {
  const [accessToken, setAccessToken] = useState('')
  
  useEffect(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    setAccessToken(token)
  }, []);
  
  return (
    <div id='app-container'>
      {accessToken ?
          <Account />
          : <Login />
        }
    </div>
  );
}

export default App;
