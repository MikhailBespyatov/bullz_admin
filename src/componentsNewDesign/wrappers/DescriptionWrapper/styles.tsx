import { CardWrapperProps } from 'componentsNewDesign/wrappers/CardWrapper/types';
import { black } from 'constants/styles/colors';
import { wrapperDisabledStyleMixin } from 'constants/styles/mixins';
import { descriptionPadding } from 'constants/styles/sizes';
import styled from 'styled-components';

export const DescriptionWrapper = styled.div<CardWrapperProps>`
    width: ${({ width, marginRight }) => width || `calc(100% - ${marginRight})`};
    border-radius: ${({ borderRadius }) => borderRadius || '8px'};
    background-color: ${({ backgroundColor }) => backgroundColor || black};
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};
    padding: ${({ padding }) => (padding ? padding : descriptionPadding)};
    ${wrapperDisabledStyleMixin}
`;
