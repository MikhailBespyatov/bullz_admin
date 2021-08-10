import { antdTrendingCardStyle, padding, sideBarWidth } from 'constants/styles/sizes';
import { multiplyPixels, pixelsAddition } from 'utils/parsers';

export const trendingsLimit = 20;
export const trendingVideoWrapperWidth = multiplyPixels(
    pixelsAddition(antdTrendingCardStyle.width, antdTrendingCardStyle.marginRight),
    3
);
// TODO: + side paddings (now as 100px)
export const adaptiveWidth = pixelsAddition(pixelsAddition(trendingVideoWrapperWidth, sideBarWidth), '100px');
export const trendingFeaturesHeight = '28px';

export const plugWidth = `calc(100% - ${padding})`;
export const plugHeight = plugWidth;
