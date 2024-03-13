import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../css/variables.css';

export const StyledCard = styled(Link)`
    width: 100%;
    height: 100%;
    padding: var(--spacing-wider);
    color: var(--text-main);
    border-radius: 8px;
    cursor: pointer;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.07);

        .section-img div {
            opacity: 1;
            transform: translateY(-8px);
        }
    }
    .section-img {
        margin-bottom: 16px;
        position: relative;
        padding-bottom: 100%;
        
        img {
            border-radius: 8px;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
            object-position: center center;
            height: 100%;
        }
        &.artists img {
            border-radius: 50%;
        }

        div {
            position: absolute;
            bottom: 8px;
            right: 8px;
            border-radius: 50%;
            box-shadow: 0 8px 8px rgba(0,0,0,.3);
            opacity: 0;
            transform: translateY(8px);
            transition: all .2s ease-out;
            z-index: 2;
        }
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border: 0;
            outline: none;
            cursor: pointer;
            user-select: none;
            transition: all .2s ease-out;

            &:hover {
                scale: 1.1;
                background-color: #1fdf64;
            }
        }
        .play-btn {
            background-color: var(--text-accent);
            width: 48px;
            height: 48px;
            border-radius: 50%;
            color: #000000;
            font-size: 26px;
        }
    }
    
    .section-info {
        min-height: 62px;
    }
    .section-title {
        margin: 0;
        padding-bottom: 8px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .section-description {
        font-size: var(--text-size-smaller);
        color: var(--text-secondary);

        a {
            color: var(--text-secondary);
            
            &:hover {
                text-decoration: underline;
                color: var(--text-main);
            }
        }
    }
`