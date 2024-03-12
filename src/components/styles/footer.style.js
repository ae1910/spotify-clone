import styled from 'styled-components';
import '../../css/variables.css';

export const StyledFooter = styled.footer`
    padding: 48px 24px 40px;
    line-height: 1.4;
    
    a, .second-footer-two {
        color: var(--text-secondary);
    }

    .footer-halves {
        margin-top: 32px;
    }
    .first-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .links-list-container {
        display: flex;
        flex-flow: column wrap;
        flex-direction: row;
        flex: 1 1 50%;
    }
    .links-list {
        width: 40%;
        margin: 0 16px 32px 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        overflow-wrap: break-word;
        
        p {
            margin: 0;
            font-weight: 700;
        }
        a {
            margin: 4px 0;
            width: fit-content;
            font-weight: 400;

            &:hover {
                color: var(--text-main);
                text-decoration: underline;
            }
        }
    }
    .social-media-btns {
        display: flex;
        gap: var(--spacing-wider-2);

        a div {
            color: var(--text-main);
            background-color: var(--background-tinted-highlight);
            font-size: 1em;
            width: 40px;
            height: 40px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;

            &:hover {
                background-color: rgba(255, 255, 255, 0.3);
            }
        }
    }
    hr {
        margin: 0  0 var(--spacing-wider-4);
        border: 1px solid var(--background-tinted-main);
    }
    .second-footer {
        padding-top: var(--spacing-wider-2);
        font-size: 0.875em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-flow: column wrap;
    }
    .second-footer-one {
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        flex-wrap: wrap;

        a {
            margin: var(--spacing-thinner) var(--spacing-wider-2) var(--spacing-main) 0;

            &:hover {
                color: var(--text-main);
            }
        }
    }

    @media (min-width: 992px) {
        .links-list {
            width: 20%;
        }
        .second-footer {
            flex-flow: row;
        }
    }
`