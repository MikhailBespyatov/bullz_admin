import { AbsoluteWrapperProps } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper/types';
import { padding } from 'constants/styles/sizes';
import styled from 'styled-components';
import { ZIndex } from 'types/styles';

export const AbsoluteWrapper = styled.div<AbsoluteWrapperProps>`
    position: absolute;
    ${({ top, bottom }) => (top ? `top: ${top}` : bottom ? `bottom: ${bottom}` : `top: ${padding}`)};
    ${({ left, right }) => (left ? `left: ${left}` : right ? `right: ${right}` : `left: ${padding}`)};
    ${({ width }) => width && `width: ${width}`};
    ${({ height }) => height && `height: ${height}`};
    display: ${({ isClosed }) => (isClosed ? 'none' : 'block')};
    ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
`;

export const AbsoluteCenterAlignment = styled.div<ZIndex>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
`;
