import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import { TrendingCardWrapperProps } from 'componentsNewDesign/wrappers/TrendingCardWrapper/types';
import { white } from 'constants/styles/colors';
import { cardMargin } from 'constants/styles/sizes';
import styled, { css } from 'styled-components';

export const TrendingCardWrapper = styled.div<TrendingCardWrapperProps>`
    position: relative;
    ${({ width }) => width && `width: ${width}`};
    margin-right: ${({ marginRight }) => marginRight || cardMargin};
    margin-bottom: ${({ marginBottom }) => marginBottom || cardMargin};
    border-radius: ${({ borderRadius }) => borderRadius || '8px'};
    background-color: ${({ backgroundColor }) => backgroundColor || white};
    ${({ background }) =>
        background &&
        css`
            background: ${background};
            background-size: cover;
        `};

    :hover ${CardHoverOpacityEffect} {
        opacity: 1;
    }
`;
