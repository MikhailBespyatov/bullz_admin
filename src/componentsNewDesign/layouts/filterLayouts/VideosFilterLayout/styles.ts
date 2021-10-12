import { filterMargin, lg } from 'constants/styles/sizes';
import styled from 'styled-components';

export const ComponentWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0px;
    margin-bottom: ${filterMargin};

    @media (max-width: ${lg}) {
        flex-wrap: wrap;
        margin-bottom: 20px;
        width: 380px;
        justify-content: space-between;
    } ;
`;
