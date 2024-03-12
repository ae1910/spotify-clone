import styled from 'styled-components';
import '../../css/variables.css';

export const StyledCard = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--spacing-wider);
    border-radius: 8px;
    cursor: pointer;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.07);
    }
    .section-img {
        margin-bottom: 16px;
        position: relative;
        
        img {
            border-radius: 8px;
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