import { clickableWrapperDiameter } from 'componentsNewDesign/wrappers/ClicableWrapper/constants';
import { disableDefaultButtonStyleMixin, flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Round, Sizes } from 'types/styles';

interface Props extends Round, Sizes {}

export const ClickableWrapper = styled.button<Props>`
    ${disableDefaultButtonStyleMixin};
    ${flexCenter};
    ${({ round }) => round && 'border-radius: 50%;'};
    width: ${({ width }) => width || clickableWrapperDiameter};
    height: ${({ height }) => height || clickableWrapperDiameter};
    ${({ disabled }) => disabled && 'cursor: default;'};
    z-index: 3;
`;

export const DivClickableWrapper = styled.div<Sizes>`
    ${({ width }) => width && `width: ${width}`};
`;
