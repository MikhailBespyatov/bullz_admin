import {
    resetButtonBorderRadius,
    resetButtonHeight,
    resetButtonTextColor,
    resetButtonTextFontSize,
    resetButtonTextFontWeight,
    resetButtonWidth
} from 'componentsNewDesign/common/buttons/ResetButton/constants';
import { blue } from 'constants/styles/colors';
import { disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ResetButton = styled.button`
    ${disableDefaultButtonStyleMixin};
    width: 60px;
    // width: ${resetButtonWidth};
    // height: ${resetButtonHeight};
    /* font-size: ${resetButtonTextFontSize};
    font-weight: ${resetButtonTextFontWeight};
    color: ${resetButtonTextColor}; */
    background-color: transparent;
    border-radius: ${resetButtonBorderRadius};
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 13px;
    letter-spacing: 0.04em;
    text-align: right;
    text-decoration: underline;
    color: ${blue};
    padding: 16px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
`;
