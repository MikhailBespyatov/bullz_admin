import styled from 'styled-components';
import { BackgroundColor, Margin, ZIndex } from 'types/styles';

interface Props extends Margin, ZIndex, BackgroundColor {}

export const MarginWrapper = styled.div<Props>`
    ${({ margin }) => margin && `margin: ${margin};`};
    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`};
    ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`};
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`};
    ${({ zIndex }) => (zIndex !== undefined ? `z-index: ${zIndex};` : ``)};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`};
`;
