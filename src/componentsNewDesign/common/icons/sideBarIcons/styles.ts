import { lg } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Expanded } from 'types/data';
import { Active } from 'types/global';

export interface AdaptiveProps extends Active, Expanded {}

export const AdaptiveWrapper = styled.div<AdaptiveProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    /* ${({ isExpanded }) => isExpanded && 'justify-content: flex-start;'}; */

    @media (min-width: ${lg}) {
        margin-right: 3px;
    }
`;
