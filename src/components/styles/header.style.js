import styled from 'styled-components';
import '../../css/variables.css';

export const StyledHeader = styled.header`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 100;
    border-radius: 50%;

    button {
        background-color: rgba(0, 0, 0, 0.7);
        border: none;
        height: 32px;
        color: var(--text-main);
        cursor: pointer;
    }

    .navigation-btns {
        display: flex;
        align-items: center;
        gap: var(--spacing-main);
        
        .nav-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            padding: 0;
            font-size: 2em;
            border-radius: 50%;
        }
    }
    .header-options {
        display: flex;
        align-items: center;
        gap: var(--spacing-main);
        
        .install-btn {
            display: flex;
            align-items: center;
            gap: var(--spacing-thinner);
            border-radius: 32px;
            font-weight: 700;
            font-size: var(--text-size-smaller);
            padding: 8px 10px;
            
            svg {
                font-size: 1.75em;
            }
        }
        .profile-btn {
            width: 32px;
            border-radius: 50%;
            padding: 4px;

            div {
            border-radius: 50%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            
                img {
                    border-radius: 50%;
                }
            }
        }
    }
`