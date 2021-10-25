import { contentWrapperBorderRadius } from 'componentsNewDesign/wrappers/ContentWrapper/constants';

export const popoverWidth = '210px';
//to calculate the middle of the parent block popover
export const popoverHalfWidth = parseInt(popoverWidth) / 2 + 'px';
export const popoverBackgroundColor = '#2C2E3A';

export const popoverVerticalMargin = '5px';

export const popoverArrowDiameter = '30px';
export const popoverArrowHeight = Math.round(parseInt(popoverArrowDiameter) * Math.sqrt(2)) + 'px';
// 5 - coefficient at distortion of the length of the arrow block when rotating 45 degrees
export const popoverArrowVerticalMargin = parseInt(popoverArrowDiameter) / 5 + 'px';
export const popoverFinalVerticalMargin = parseInt(popoverVerticalMargin) + parseInt(popoverArrowVerticalMargin) + 'px';
export const popoverArrowHalfDiameter = parseInt(popoverArrowDiameter) / 2 + 'px';
export const popoverArrowTop = parseInt(popoverArrowDiameter) + parseInt(popoverFinalVerticalMargin) + 'px';

export const lastItemBorderRadius = contentWrapperBorderRadius;
