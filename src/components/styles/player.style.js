import styled from 'styled-components';
import '../../css/variables.css';

export const StyledPlayer = styled.div`
    grid-area: player;
    width: 100%;
    min-width: 620px;
    height: 72px;
    min-height: 0;
    background-color: var(--background-main);
    z-index: 1000;

    .player-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 72px;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            border: 0;
            padding: 0 var(--spacing-thinner);
            cursor: pointer;

            &:not(.play-pause-btn) {
                background-color: transparent;
                color: var(--text-tertiary);
                font-size: 1.5em;
            }
            &.play-pause-btn {
                font-size: 1.5em;
                border-radius: 32px;
                background-color: #fff;
                color: #000;
            }
            &.save-track-btn {
                font-size: 1em;
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
    .track-col, .controls-col, .more-options-col, .controls, .player-controls, .playback-slider {
        display: flex;
        align-items: center;
    }
    .track-col {
        flex-direction: row;
        min-width: 180px;
        width: 30%;
        padding-left: var(--spacing-main);
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
        grid-template: "title" "artists"/auto 1fr;
        align-items: center;
        gap: var(--spacing-thinner);
        padding-right: var(--spacing-main);
    }
    .track-title {
        grid-area: title;
        color: var(--text-main);
        font-size: 0.875em;
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
        font-size: var(--text-size-smaller);
        color: var(--text-secondary);
        user-select: none;
    }
    .controls-col {
        flex-direction: column;
        justify-content: center;
        max-width: 722px;
        width: 40%;
        
        .controls {
            flex-direction: row;
            flex-flow: row nowrap;
            width: 100%;
            gap: var(--spacing-wider-2);
            margin-bottom: var(--spacing-main);

            .active-btn {
                color: var(--text-accent);
            }
        }
    }
    .player-controls {
        flex: 1;
        gap: var(--spacing-main);

        &.left {
            justify-content: flex-end;
        }
        &.right {
            justify-content: flex-start;
        }
    }
    .playback-slider {
        width: 100%;
        gap: var(--spacing-main);
        
        span {
            color: var(--text-secondary);
            font-size: 0.75em;
            min-width: 40px;

            &:first-child {
                text-align: right;
            }
            &:last-child {
                text-align: left;
            }
        }
    }
    .slider-bar-container, .volume-bar-container {
        position: relative;
        height: 12px;
        width: 100%;
        touch-action: none;
        border-radius: 2px;
        display: flex;
        align-items: center;
        
        .slider-bar {
            width: 100%;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            accent-color: #fff;
            
            &:hover {
                accent-color: var(--text-accent);
            }
        }
    }
    .more-options-col {
        flex-direction: row;
        justify-content: flex-end;
        flex-grow: 1;
        min-width: 180px;
        width: 30%;
        padding-right: var(--spacing-main);

        button {
            padding: var(--spacing-thinner);
        }
        .active-btn {
                color: var(--text-accent) !important;
            }
    }
    .volume {
        display: flex;
        align-items: center;
        margin-right: var(--spacing-main);
        flex: 0 1 125px;
    }
`