import styled from 'styled-components';

export const CatalogGrid = styled.div`
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 1200px) {
        justify-content: flex-start;
    }
`;
