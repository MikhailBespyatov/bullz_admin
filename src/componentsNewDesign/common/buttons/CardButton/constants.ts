import { blue, errorColor, grey6, grey7, paleBlue, white } from 'constants/styles/colors';

export const cardButtonTextFontSize = '11px';
export const cardButtonMinWidth = '103px';
export const cardButtonHeight = '45px';
export const cardButtonMarginBottom = '8px';

export const disabledCardButtonBackgroundColor = grey6;
export const disabledCardButtonTextColor = grey7;

export const textColors = {
    primary: blue,
    secondary: white,
    danger: errorColor
};
type TextColorsObjectType = typeof textColors;
export type TextColorsType = keyof TextColorsObjectType;

export const backgroundColors: TextColorsObjectType = {
    primary: paleBlue,
    secondary: errorColor,
    danger: '#ffe7e7'
};
