import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';
import { BackgroundColor, Center, Visibility, ZIndex } from 'types/styles';

interface Props extends ZIndex, BackgroundColor, Center, Visibility {}

export const FixedWrapper = styled.div<Props>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
    ${({ center }) => center && flexCenter};
`;
