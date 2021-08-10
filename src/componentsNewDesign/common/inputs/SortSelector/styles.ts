import { disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import { filterMargin } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Active } from 'types/global';

export const StyledButton = styled.button<Active>`
    ${disableDefaultButtonStyleMixin};
    padding-bottom: 12px;
    opacity: 0.5;
    ${({ active }) => active && 'border-bottom: 1px solid black; opacity: 1;'};
    //margin-right: ${filterMargin};
    //margin-bottom: ${filterMargin};
    margin: 15px 15px 0px;
`;
