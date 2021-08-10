import { grey11, grey12, grey13 } from 'constants/styles/colors';
import { calculateBlockWidth } from 'utils/calculators';

export const buttonsFontSize = '10px';
export const buttonsFontWeight = '400';
export const buttonsBorderRadius = '4px';

export const brandImageHeight = '104px';

export const tableHeaderBackgroundColor = grey12;
export const tableDataPadding = '0px 25px';
export const tableDataBorder = `1px solid ${grey11}`;
export const tableBorderRadius = '8px';

export const assistiveTextColor = grey13;
export const urlBackgroundColor = '#eaecf1';
export const urlColor = '#3360ff';

// export const successMessageColor = '#03a400';
// export const neutralMessageColor = '#9d41ac';

// export const propertyBlockHeight = '48px';
export const propertyBlockWidth = calculateBlockWidth(2, 8);
export const propertyBlockHorizontalPadding = '4px';

export const parseDeleteSuccessMessage = (name: string) => 'Video ' + name + ' successfully deleted';
export const parseDeleteModalContent = (name: string) => 'Are you sure you want to delete a video ' + name + '?';
export const deleteTitle = 'Delete';
