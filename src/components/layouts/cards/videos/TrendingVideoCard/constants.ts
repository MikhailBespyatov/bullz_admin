import { antdCardBottomBarHeight, antdTrendingCardStyle, padding } from 'constants/styles/sizes';
import { multiplyPixels, pixelsAddition, pixelsSubtraction } from 'utils/parsers';

export const relativeWrapperHeight = pixelsSubtraction(
    antdTrendingCardStyle.height,
    pixelsAddition(multiplyPixels(padding, 2), antdCardBottomBarHeight)
);

export const addButtonHeight = pixelsSubtraction(antdTrendingCardStyle.height, multiplyPixels(padding, 2));

export const featuresWrapperBorderRadius = '15px';
export const featuresWrapperPadding = '5px';

export const playImgDiameter = '14px';

export const positionWrapperMinWidth = '22px';
