import { contentWrapperBorderRadius } from 'componentsNewDesign/wrappers/ContentWrapper/constants';
import { black, selectHover, white } from 'constants/styles/colors';

export const selectorRightPadding = '12px';
export const selectorLeftPadding = selectorRightPadding;
export const selectorVerticalPadding = '8px';
export const selectPadding = '12px 5px';

export const itemHeight = '27px';

export const lastItemBorderRadius = contentWrapperBorderRadius;

const beforeBorderRadiusHeight = '5px';
export const lastItemBorderHeight = parseInt(lastItemBorderRadius) + parseInt(beforeBorderRadiusHeight) + 'px';

export const selectedColor = black;
export const hoveredColor = selectHover;
export const selectedTextColor = white;

export const expandButtonHeight = '20px';

export const borderItemColor = 'rgba(0, 0, 0, 0.2)';

export const titleMarginBottom = '0px';
export const absoluteWrapperTop = '50px';
export const absoluteWrapperWithTitleTop = parseInt(absoluteWrapperTop) + parseInt(titleMarginBottom) + 'px';
export const mobileItemHeight = 32;
export const selectZIndex = 10;
