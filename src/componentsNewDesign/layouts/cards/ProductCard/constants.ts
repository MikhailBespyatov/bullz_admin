import { errorColor, grey10 } from 'constants/styles/colors';
import { calculateBlockWidth } from 'utils/calculators';

export const productSectionHeight = '178px';

export const deleteTitle = 'Delete';
export const parseDeleteModalContent = (name: string) => 'Are you sure you want to delete a video ' + name + '?';
export const parseDeleteProductSuccessMessage = (name: string) => 'Product ' + name + ' successfully deleted';

export const noProductImageIconHeight = '41px';
export const brandImageHeight = '104px';

export const textFontSize = '12px';
export const textLineHeight = '14px';
export const infoTextColor = grey10;
export const deleteButtonTextColor = errorColor;

export const propertyBlockWidth = calculateBlockWidth(2, 16);
export const cardButtonWidth = calculateBlockWidth(2, 16);

export const copyProductIDMessage = 'Product Id was copied!';
export const copyTopicLinkMessage = 'Topic Link was copied!';
