import { contentWrapperBorderRadius } from 'componentsNewDesign/wrappers/ContentWrapper/constants';
import { black, grey23, grey29, white } from 'constants/styles/colors';

export const paginationHeight = '65px';

export const paginationCellWidth = '27px';
export const paginationCellHeight = '29px';
export const paginationCellBorderRadius = '8px';
export const paginationCellBackground = grey23;
export const paginationCellActiveBackground = grey29;
export const paginationCellColor = 'black';
export const paginationCellActiveColor = 'white';
export const PaginationCellFontWeight = '500';
export const PaginationCellActiveFontWeight = '700';
export const PaginationCellFontSize = '11px';
export const PaginationCellLineHeight = '13px';
export const PaginationCellLetterSpacing = '0';
export const PaginationCellMarginRight = '8px';

export const paginationInputWidth = '93px';
export const paginationInputHeight = '29px';
export const paginationInputPadding = '10px';

export const arrowImgWidth = '6px';
export const arrowImgHeight = '10px';

export const paginationWrapperHorizontalMargin = '32px';

export const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// * only odd whole non zero number
export const paginationLimit = 5;
export const paginationLimitMobile = 1;

export const pagination = Array.from({ length: paginationLimit }, () => 1);
export const paginationMobile = Array.from({ length: paginationLimitMobile }, () => 1);

export const sizeValues = ['10', '20', '50', '100'];

export const selectorHorizontalPadding = '10px';
export const selectorVerticalPadding = '8px';

export const itemHeight = '30px';

export const lastItemBorderRadius = contentWrapperBorderRadius;

const beforeBorderRadiusHeight = '5px';
export const lastItemBorderHeight = parseInt(lastItemBorderRadius) + parseInt(beforeBorderRadiusHeight) + 'px';

export const selectedColor = white;
export const hoveredColor = white;
export const selectedTextColor = black;

export const expandButtonHeight = '10px';

export const borderItemColor = 'rgba(0, 0, 0, 0.2)';

export const threeDots = '...';

export const paginationWrapperMarginRight =
    parseInt(paginationWrapperHorizontalMargin) - parseInt(PaginationCellMarginRight) + 'px';
