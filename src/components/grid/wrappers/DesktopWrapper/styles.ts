import { md_1 } from 'constants/styles/sizes';
import styled from 'styled-components';

export const DesktopWrapper = styled.div`
    @media (max-width: ${md_1}) {
        display: none;
    }
`;
