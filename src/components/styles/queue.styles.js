import styled from 'styled-components';
import '../../css/variables.css';

export const StyledQueue = styled.div`
    container-type: inline-size;
    background: linear-gradient(#14602B 0%, var(--background-main) 7%);

    .queue-view-container {
        max-width: 1955px;
        margin: 40px var(--spacing-wider-2) 0;
    }
    h1 {
        margin: 0 0 var(--spacing-main);
        font-size: var(--text-size-larger);
        font-weight: 700;
    }
    h2 {
        height: 32px;
        display: flex;
        align-items: flex-end;
        margin: 0 0 var(--spacing-main);
        font-size: var(--text-size-main);
        font-weight: 700;
        color: var(--text-secondary);

        &:last-child {
            margin-top: 32px;
        }
    }

    @container (min-width: 536px) {
        .col-3 {
            display: flex;
            align-items: center;
        }
    }
    
`

