import borderImage from 'assets/border_report.svg';
import {
    cardButtonHeight,
    cardButtonMarginBottom,
    cardButtonTextFontSize
} from 'componentsNewDesign/common/buttons/CardButton/constants';
import {
    buttonBorderRadius,
    buttonInnerTextFontWeight
} from 'componentsNewDesign/common/buttons/SimpleButton/constants';
import { black, white } from 'constants/styles/colors';
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
    color: ${white};
    background-color: ${black};
    border-radius: ${buttonBorderRadius};
    background-image: url(${borderImage});
    background-repeat: no-repeat;
    background-position: center;
    border: none;
`;
