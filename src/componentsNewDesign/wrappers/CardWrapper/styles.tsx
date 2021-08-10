import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import { CardWrapperProps } from 'componentsNewDesign/wrappers/CardWrapper/types';
import { black, white } from 'constants/styles/colors';
import { wrapperDisabledStyleMixin } from 'constants/styles/mixins';
import { cardMargin, lg, lg_1, xl, xl_1, xxl, xxl_1 } from 'constants/styles/sizes';
import styled from 'styled-components';
import { adaptiveCard } from 'utils/usefulFunctions';

export const CardWrapper = styled.div<CardWrapperProps>`
    ${wrapperDisabledStyleMixin};
    position: relative;
    ${({ width }) => width && `width: ${width}`};
    margin-right: ${({ marginRight }) => marginRight || cardMargin};
    margin-bottom: ${({ marginBottom }) => marginBottom || cardMargin};
    border-radius: ${({ borderRadius }) => borderRadius || '8px'};
    background-color: ${({ backgroundColor }) => backgroundColor || white};
    ${({ background }) => background && `background: ${background}`};
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`};
    border: 1px solid ${({ isSelected }) => (isSelected ? black : 'transparent')};

    :hover ${CardHoverOpacityEffect} {
        opacity: 1;
    }

    ${adaptiveCard(5, '2000px', '2700px')}
    ${adaptiveCard(4, xxl, '2000px')}
    ${adaptiveCard(3, xl, xxl_1)};
    ${adaptiveCard(2, lg, xl_1)};
    ${adaptiveCard(1, '0', lg_1)};
`;

/*
    @media (min-width: 992px) {
        width: 326px;
    }
    @media (min-width: 1200px) {
        width: 265px;
    }
    @media (min-width: 1600px) {
        width: 275px;
    }
*/
