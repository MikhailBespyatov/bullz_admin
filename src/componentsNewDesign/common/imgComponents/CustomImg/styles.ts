import { ImgProps, ImgWrapperProps } from 'componentsNewDesign/common/imgComponents/CustomImg/types';
import { buttonEffectMixin, flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
    background-size: auto;
`;

export const CustomImage = styled.img<ImgProps>`
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    ${flexCenter};
    ${({ borderRadius }) => (borderRadius ? `border-radius: ${borderRadius}; overflow: hidden` : ``)};
    overflow: hidden;
    ${({ rotate }) => (rotate ? `transform: rotate(${rotate}deg);` : ``)};
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')};
    ${({ center }) => center && 'margin: auto;'};
    ${buttonEffectMixin}
`;

export const ImgWrapper = styled.div<ImgWrapperProps>`
    ${flexCenter};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    ${({ center }) => center && 'margin: auto;'};
`;
