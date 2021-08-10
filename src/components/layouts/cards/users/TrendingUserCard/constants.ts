import { imgDiameter } from 'components/common/imgComponents/UserImg/constants';
import { antdCardBottomBarHeight, antdTrendingCardStyle, padding } from 'constants/styles/sizes';

export const trendingUserCardHeight = '98px';

// // TODO: 39px is a meta with title height
// export const relativeWrapperHeight = pixelsSubtraction(
//     antdTrendingCardStyle.height,
//     pixelsAddition('39px', antdCardBottomBarHeight)
// );
export const relativeWrapperHeight =
    parseInt(antdTrendingCardStyle.height) -
    parseInt(imgDiameter) -
    parseInt(antdCardBottomBarHeight) -
    2 * parseInt(padding) +
    'px';
