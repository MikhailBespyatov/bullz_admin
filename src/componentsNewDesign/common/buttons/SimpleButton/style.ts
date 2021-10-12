import { disabledCardButtonTextColor } from 'componentsNewDesign/common/buttons/CardButton/constants';
import {
    buttonBorderRadius,
    buttonInnerTextFontSize,
    buttonInnerTextFontWeight,
    buttonPadding
} from 'componentsNewDesign/common/buttons/SimpleButton/constants';
import { SimpleButtonProps } from 'componentsNewDesign/common/buttons/SimpleButton/types';
import { black, greenYellow, grey24, grey7 } from 'constants/styles/colors';
import { disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import styled, { css } from 'styled-components';

const disableButtonMixin = css`
    background: ${grey24};
    color: ${disabledCardButtonTextColor};
`;

export const SimpleButton = styled.button<SimpleButtonProps>`
    ${disableDefaultButtonStyleMixin};
    ${({ width }) => width && `width: ${width}`};
    ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
    ${({ height }) => height && `height:  ${height}`};
    font-size: ${({ fontSize }) => fontSize || buttonInnerTextFontSize};
    font-weight: ${({ fontWeight }) => fontWeight || buttonInnerTextFontWeight};
    color: ${({ color }) => color || black};
    background-color: ${({ background }) => background || greenYellow};
    ${({ border }) => border && `border: ${border}`};
    border-radius: ${({ borderRadius }) => borderRadius || buttonBorderRadius};
    padding: ${({ padding }) => padding || buttonPadding};
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};
    ${({ marginTop }) => marginTop && `margin-top: ${marginTop}`};
    ${({ margin }) => margin && `margin: ${margin}`};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;

    ${({ disabled }) =>
        disabled &&
        css`
            ${disableButtonMixin};
            cursor: not-allowed;
        `};

    ${({ blocked }) =>
        blocked &&
        css`
            ${disableButtonMixin};
        `};
    :hover {
        background-color: ${({ backgroundHover }) => backgroundHover || 'initial'};
        color: ${({ textHover }) => textHover || grey7};
    }
`;
