import { clearInputButtonWidthAndHeight } from 'componentsNewDesign/common/buttons/ClearInputButton/constants';

export const inputFontSize = '12px';
export const inputWrapperHeight = countInputWrapperHeight(parseInt(inputFontSize));
export const inputVerticalPadding = countInputVerticalPadding(parseInt(inputFontSize));

function countInputWrapperHeight(fontSize: number) {
    return fontSize <= 20 ? clearInputButtonWidthAndHeight : `${fontSize + 5}px`;
}

function countInputVerticalPadding(fontSize: number) {
    return fontSize <= 20 ? (parseInt(inputWrapperHeight) - (fontSize + 2)) / 2 + 'px' : '0px';
}
export const iconWrapperVerticalPadding =
    (parseInt(inputWrapperHeight) - parseInt(clearInputButtonWidthAndHeight)) / 2 + 'px';
