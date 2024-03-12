import styled from 'styled-components';
import '../../css/variables.css';

export const StyledSidebar = styled.aside`
    display: flex;
    width: 100%;
    /* width: 420px; */
    gap: 0;
    min-height: 0;
    height: 100%;
    background-color: var(--background-main);
    color: var(--text-main);
    z-index: 10;
    overflow: hidden;
    user-select: none;
    container-type: inline-size;

    

    nav {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-main);
        min-height: 0;
        height: 100%;
        width: 100%;
    }
    .nav-top {
        width: 100%;
    }
    .nav-items {
        margin: 0;
        padding: 8px 12px;
    }
    .nav-icons {
        font-size: 1.7em;
    }
    .nav-item {
        padding: 4px 12px;

        a {
            display: flex;
            align-items: center;
            gap: var(--spacing-wider-3);
            height: 40px;
            color: var(--text-tertiary);
            font-weight: 700;

            &.active-link, &:hover {
                color: var(--text-main);
            }
        }
    }
    .nav-library {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 100%;
        min-height: 0;
    }
    .library-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
    }
    .show-nav-btn, .library-add-btn, .library-search-btn, .library-sort-btn {
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--text-secondary);
        cursor: pointer;
    }
    .show-nav-btn:hover, .library-add-btn:hover {
        color: var(--text-main);
    }
    .show-nav-btn {
        font-family: inherit;
        font-size: var(--text-size-main);
        font-weight: 700;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: var(--spacing-wider);
        align-items: center;
        height: 40px;
    }
    .library-items-container {
        gap: var(--spacing-main);
        padding: 0 8px 8px;
        position: relative;
        bottom: 0;
        width: 100%;
        height: 100%;
        container-type: size;
    }
    .wrapper-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        height: 100%;
        min-height: 100%;
        overscroll-behavior-y: contain;
        overflow-y: scroll;

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
            transition: background-color 0.15s ease-out;
        }
        &:hover::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);

            &:hover {
                background: rgba(255, 255, 255, 0.6); 
            }
        }
    }
    .library-filter-options {
        display: flex;
        justify-content: space-between;
        padding: 4px 8px;
        height: 100%;
    }
    .library-search-btn {
        padding: 8px;
        font-size: var(--text-size-main);
        border-radius: 50%;

        &:hover {
            color: var(--text-main);
            background-color: var(--background-tinted-highlight);
        }
    }
    .library-sort-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-thinner);
        padding: 8px 16px;
        font-size: var(--text-size-smaller);

        &:hover {
            color: var(--text-main);
        }
        .nav-icons {
            font-size: 1.5em;
        }
    }
    .items-container {
        height: 100%;
    }
    .library-items {
        margin: 0;
        padding: 0 8px 8px;
        position: relative;
    }
    .library-item {
        width: 100%;
        padding: 8px;
        min-block-size: 56px;
        border-radius: 6px;
        
        &:hover{
            background-color: var(--background-tinted-main);
        }
        a {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-auto-rows: auto 1fr auto;
            gap: var(--spacing-wider);
            color: var(--text-main);
        }
    }
    .library-item-info {
        grid-column-end: -1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .library-item-info div:first-child {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .speaker {
        padding: 8px;

        .nav-icons {
            font-size: 1.2em;
            color: var(--text-accent);
        }
    }
    .library-item-img {
        grid-column: 1;
        width: 48px;
        height: 48px;
        pointer-events: none;
        
        img {
            width: 100% !important;
            height: 100%;
            border-radius: 4px;
            object-fit: cover;
            object-position: center center;
        }
    }
    .library-item-title {
        overflow-wrap: anywhere;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin: 0;
        font-weight: 400;
    }
    .library-item-metadata {
        font-size: var(--text-size-smaller);
        font-weight: 400;
        margin: 0;
        overflow-wrap: anywhere;
        word-break: break-all;
        color: var(--text-secondary);
    }

    @container (max-width: 72px) {
        .library-filter-options {
            display: none;
        }
        li, .show-nav-btn {
            font-size: 0;
            /* text-indent: -9999; */
        }
        .nav-icons {
            position: absolute;
            font-size: 28px;
        }
    }
`