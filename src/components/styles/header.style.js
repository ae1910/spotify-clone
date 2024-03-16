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
    form {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1 0 364px;

        input {
            background-color: #242424;
            height: 48px;
            width: 100%;
            padding: 6px 36px;
            border: 0;
            border-radius: 50px;
            color: var(--text-main);
            font-family: var(--main-font);
            font-size: var(--text-size-smaller);
            font-weight: 400;
            text-overflow: ellipsis;

            &:hover {
                background-color: #2a2a2a;  
            }
            &:hover+div span, &:focus+div span {
                color: var(--text-main);
            }
        }
        
        div {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: space-between;
            top: 0;
            left: 12px;
            right: 12px;
            height: 48px;
            font-size: 1.25em;
            pointer-events: none;

            span {
                display: inline-flex;
                align-items: center;
                color: var(--text-tertiary);
            }
            button {
                display: inline-flex;
                align-items: center;
                background-color: transparent;
                font-size: 1.15em;
                padding: 0;
                border: 0;
                cursor: pointer;
            }
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
    .user-container {
        position: relative;

        .dropdown {
            display: none;
            z-index: 9999;
            position: absolute;
            inset: 0 0 auto auto;
            transform: translate(0, 40px);
            min-width: 150px;
            background-color: #282828;

            ul {
                padding: var(--spacing-thinner);
                list-style: none;
                margin: 0;

                li {
                    display: flex;
                    align-items: center;
                    border-radius: 2px;
                    width: 100%;
                    height: 40px;
                    padding: var(--spacing-wider);
                    cursor: pointer;
                    user-select: none;
                    font-weight: 400;
                    font-size: var(--text-size-smaller);

                    a {
                        color: var(--text-main);
                        width: 100%;
                        height: 100%;
                    }
                    &:hover {
                        background-color: var(--background-tinted-main);
                    }
                }
            }

            &.show {
                display: block;
            }
        }
    }

    @media (max-width: 1024px) {
        .nav-btn.right {
            display: none;
        }
    }
`