import { CardWrapperProps } from 'componentsNewDesign/wrappers/CardWrapper/types';
import { white } from 'constants/styles/colors';
import { descriptionPadding } from 'constants/styles/sizes';
import styled from 'styled-components';
import { wrapperDisabledStyleMixin } from 'constants/styles/mixins';

export const DescriptionWrapper = styled.div<CardWrapperProps>`
    width: ${({ width, marginRight }) => width || `calc(100% - ${marginRight})`};
    border-radius: ${({ borderRadius }) => borderRadius || '8px'};
    background-color: ${({ backgroundColor }) => backgroundColor || white};
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};
    padding: ${descriptionPadding};
    ${wrapperDisabledStyleMixin}
`;
