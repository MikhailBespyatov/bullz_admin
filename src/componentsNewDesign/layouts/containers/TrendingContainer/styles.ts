import { xs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const Title = styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;

    @media (max-width: ${xs}) {
        font-size: 14px;
        line-height: 16px;
    }
`;
