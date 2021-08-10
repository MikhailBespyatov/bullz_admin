import { flexStart } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Size } from 'types/styles';

export const TooltipWrapper = styled.div`
    ${flexStart}
`;

interface ButtonWrapperProps extends Size {}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    display: block;

    @media (max-width: ${({ sizes }) => sizes}) {
        display: none;
    }
`;

interface TooltipButtonWrapperProps extends Size {}

export const TooltipButtonWrapper = styled.div<TooltipButtonWrapperProps>`
    display: none;

    @media (max-width: ${({ sizes }) => sizes}) {
        display: block;
    }
`;
