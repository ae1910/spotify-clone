import '../css/App.css';
import { StyledLogin } from '../components/styles/login.style';
import logoGreen from '../img/Spotify_Logo_RGB_Green.png'
import { useState } from 'react';

const Login = () => {
    // const AUTH_URL = `${apiURL}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURL}&state=${state}&scope=${scope.join(" ")}`;

    const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/login'
        : '';

    return (
        <StyledLogin id="login">
            <div className="login-container">
                <div className='logo-container'>
                    <img src={logoGreen} />
                    <h2>Limited</h2>
                </div>
                <a className='login-btn' href={LOGIN_URI}>Connect to Spotify</a>
            </div>
        </StyledLogin>
    );
}

export default Login;