import styled from 'styled-components';
import '../../css/variables.css';

export const StyledTrackItem = styled.div`
    height: 56px;
    border-radius: 4px;
    font-size: 14px;
    color: var(--text-secondary);
    user-select: none;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);

        .col-5 button {
            visibility: visible;
        }
        .col-1 {
            span {
                visibility: hidden;
            }
            button {
                visibility: visible;
            }
        }
    }    
    a {
        color: var(--text-secondary);

        &:hover {
            text-decoration: underline;
            color: var(--text-main);
        }
        &:not(.artists) {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: unset;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .col-1 {
        position: relative;

        span {
            visibility: visible;
        }
        button {
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: transparent;
            padding: 1px 3px;
            border: 0;
            color: var(--text-main);
            font-size: 1.4em;
            cursor: pointer;
        }
    }
    .col-2 {
        gap: var(--spacing-wider);
    }
    .track-image{
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 4px;

        img {
            border-radius: 4px;
        }
    }
    .track-info {
        display: grid;
        grid-template: "title title" "badge artists"/auto 1fr;
        align-items: center;
        gap: var(--spacing-thinner);
        padding-right: var(--spacing-main);

        svg {
            grid-area: badge;
        }
    }
    .track-title {
        grid-area: title;
        color: var(--text-main);
        font-size: 1rem;
        font-weight: 400;
    }
    .track-artists {
        grid-area: artists;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .col-5 {
        display: flex;
        align-items: center;
        button {
            background: none;
            color: var(--text-secondary);
            border: none;
            outline: none;
            font-size: 1rem;
            cursor: pointer;
            visibility: hidden;
            padding: 0;

            &:hover {
                color: var(--text-main);
            }
            .save-track-btn {
                margin-right: var(--spacing-wider);
            }
            svg {
                margin-right: 0;
            }
            
        }
        span {
            display: flex;
            justify-content: flex-end;
            margin-right: var(--spacing-wider);
            width: 5ch;
        }
    }
`