import { hoverModalHeight, hoverModalWidth } from 'componentsNewDesign/modals/TrendingCardHoverModal/constants';
import { countHoverModalPosition } from 'utils/calculators';

export const videoPosterWidth = '100px';
export const videoPosterHeight = '143px';

export const cardWrapperMargin = '8px';
export const cardContentHorizontalMargin = '4px';
export const cardContentVerticalMargin = '4px';

export const positionPadding = '3px 6px';
export const positionHeight = '18px';

export const playIconWidth = '14px';
export const viewCountPadding = '2px 6px 3px 4px';
export const viewCountMargin = '7px';
export const viewCountBackgroundColor = 'rgba(0, 0, 0, 0.25)';
export const viewCountBorderRadius = '7px';

export const textFontSize = '10px';
export const textFontWeight = '500';

export const hoverModalPositionTop = countHoverModalPosition(videoPosterHeight, hoverModalHeight);
export const hoverModalPositionLeft = countHoverModalPosition(videoPosterWidth, hoverModalWidth);
