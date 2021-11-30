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
import { grey29, white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import { xs } from 'constants/styles/sizes';
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
    color: ${white};
    background-color: ${grey29};
    border-radius: ${buttonBorderRadius};
    border-image: url(${borderImage}) 10% round;
    // background-repeat: no-repeat;
    // background-position: center;
    outline: none;

    @media (max-width: ${xs}) {
        font-size: 10px;
        height: 28px;
        width: 81px;
    }
`;
