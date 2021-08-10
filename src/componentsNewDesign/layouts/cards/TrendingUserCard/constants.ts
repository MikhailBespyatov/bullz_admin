import { hoverModalHeight, hoverModalWidth } from 'componentsNewDesign/modals/TrendingCardHoverModal/constants';
import { countHoverModalPosition } from 'utils/calculators';

export const cardWrapperMargin = '8px';

export const cardContentHorizontalMargin = '16px';
export const cardContentVerticalMargin = '8px';

export const usernamePadding = '16px 7px';

export const usernameFontSize = '10px';
export const usernameFontWeight = '500';

export const avatarImageWidthAndHeight = '52px';

export const userCardHeight = '105px';
export const userCardWidth = '98px';

export const hoverModalPositionTop = countHoverModalPosition(userCardHeight, hoverModalHeight);
export const hoverModalPositionLeft = countHoverModalPosition(userCardWidth, hoverModalWidth);
