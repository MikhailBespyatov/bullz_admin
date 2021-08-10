import { trendingVideoLimit } from 'constants/defaults/trendings';
import { antdTrendingCardStyle, sideBarWidth } from 'constants/styles/sizes';
import { multiplyPixels, pixelsAddition } from 'utils/parsers';

export const cardsInRow = 3;
export const cardsInColumns = 4;
export const cardsInBlock = cardsInRow * cardsInColumns;
export const cardsInLastBlock = 3;
export const indexOfLastBlock = Math.ceil(trendingVideoLimit / cardsInBlock);

export const trendingsLimit = 20;
export const trendingVideoWrapperWidth = multiplyPixels(
    pixelsAddition(antdTrendingCardStyle.width, antdTrendingCardStyle.marginRight),
    cardsInRow
);
export const trendingVideoWrapperHeight = multiplyPixels(
    pixelsAddition(antdTrendingCardStyle.height, antdTrendingCardStyle.marginBottom),
    cardsInColumns
);
// TODO: + side paddings (now as 100px)
export const adaptiveWidth = pixelsAddition(pixelsAddition(trendingVideoWrapperWidth, sideBarWidth), '100px');
export const trendingVideoWrapperPadding = '40px';
