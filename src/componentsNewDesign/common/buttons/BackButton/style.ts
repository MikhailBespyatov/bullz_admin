import {
    backButtonBackgroundColor,
    backButtonInnerTextFontSize,
    backButtonInnerTextFontWeight
} from 'componentsNewDesign/common/buttons/BackButton/constants';
import { BackButtonProps } from 'componentsNewDesign/common/buttons/BackButton/types';
import { black } from 'constants/styles/colors';
import { disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import styled from 'styled-components';

export const BackButton = styled.button<BackButtonProps>`
    ${disableDefaultButtonStyleMixin};
    ${({ width }) => width && `width: ${width}`};
    ${({ height }) => height && `height: ${height}`};
    font-size: ${({ fontSize }) => fontSize || backButtonInnerTextFontSize};
    font-weight: ${({ fontWeight }) => fontWeight || backButtonInnerTextFontWeight};
    color: ${({ color }) => color || black};
    background-color: ${({ background }) => background || backButtonBackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
