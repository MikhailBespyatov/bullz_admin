import borderImage from 'assets/border.png';
import {
    cardButtonHeight,
    cardButtonMarginBottom,
    cardButtonTextFontSize
} from 'componentsNewDesign/common/buttons/CardButton/constants';
import {
    buttonBorderRadius,
    buttonInnerTextFontWeight
} from 'componentsNewDesign/common/buttons/SimpleButton/constants';
import { black, grey8 } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const StyledButton = styled.button`
    ${flexCenter}
    height: ${cardButtonHeight};
    width: 110px;
    margin-bottom: ${cardButtonMarginBottom};
    font-size: ${cardButtonTextFontSize};
    font-weight: ${buttonInnerTextFontWeight};
    cursor: pointer;
    white-space: nowrap;
    color: ${black};
    background-color: ${grey8};
    border-radius: ${buttonBorderRadius};
    border-image: url(${borderImage}) 10% round;
    outline: none;
`;
