import styled from 'styled-components';
import '../../css/variables.css';

export const StyledLogin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--background-main);
    
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 324px;
        padding: 0 24px;
        gap: var(--spacing-wider-4);
    }
    .logo-container {
        position: relative;
        width: 250px;
    }
    h2 {
        font-size: 2em;
        text-align: end;
        margin: -23px 43px 0 0;
        padding: 0;
    }
    .login-btn {
        width: 100%;
        text-align: center;
        background-color: var(--text-accent);
        color: #000;
        font-weight: 700;
        padding: 12px;
        border-radius: 30px;
        cursor: pointer;
    }
`