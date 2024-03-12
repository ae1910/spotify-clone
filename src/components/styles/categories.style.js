import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../../css/variables.css';

export const StyledCategoryContainer = styled.div`
    margin-top: var(--spacing-wider-2);

    h2 {
        margin: 0 0 var(--spacing-wider);
    }

    .categories-items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%/2, max(180px, 100%/11)), 1fr));
        grid-template-rows: 1fr;
        grid-auto-rows: auto;
        gap: var(--spacing-wider-4);
        min-width: 360px;
    }
`
export const StyledCategory = styled(Link)`
    background-color: rgb(0, 100, 80);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    user-select: none;

    img {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: rotate(25deg) translate(18%, -2%);
        width: 100px;
        height: 100px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    }
    span {
        position: absolute;
        top: 0;
        max-width: 100%;
        padding: var(--spacing-wider-2);
        overflow-wrap: break-word;
        font-size: var(--text-size-larger);
        font-weight: 700;
        color: var(--text-main);
    }
`