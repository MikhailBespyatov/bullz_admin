import { black } from 'constants/styles/colors';
import { dividePixels, pixelsAddition } from 'utils/parsers';

// * padding
export const padding = '10px';
export const filterMargin = '21px';
export const cardMargin = '16px';
export const descriptionPadding = '8px';

// * others
export const primaryBorderRadius = '8px';

export const borderWidth = '1px';
export const borderRadius = '4px';
export const opacity = 0.8;
export const disabledOpacity = 0.5;
export const textInfoFontSize = '14px';
export const textInfoLineHeight = '16px';

// * layouts
export const headerHeight = '40px';
export const headerPaddingBottom = '10px';
export const fullHeaderHeight = parseInt(headerHeight) + parseInt(headerPaddingBottom) + 'px';
export const sideBarWidth = '235px';
export const smallSideBarWidth = '150px'; //100px
export const miniPlayerHeight = '200px';
export const pinnedSphereDiameter = '32px';
export const featureHeight = '40px';
export const avatarDiameter = '40px';
export const iconsFontSIze = '20px';
export const footerHeight = '105px';
export const CloseButtonDiameter = '40px';
export const hashtagsSliderHeight = '30px';
export const featureIconSize = '25px';

// * cards
export const antdCardWidth = '250px';
export const antdCardHeight = '250px';
export const trendingCardWidth = dividePixels(antdCardWidth, 2);
export const antdTrendingCardHeight = pixelsAddition(dividePixels(antdCardHeight, 2), '50px');
export const antdCardBottomBarHeight = '48px';
export const ellipsisRowWidth = `calc(${antdCardWidth} - 2 * ${padding})`;
export const antdCardAvatarWidth = '100px';
export const antdCardStyle = { width: antdCardWidth, marginBottom: padding, marginRight: padding };
export const antdTrendingCardStyle = {
    width: trendingCardWidth,
    height: antdTrendingCardHeight,
    marginBottom: padding,
    marginRight: padding,
    backgroundColor: black,
    border: 'none'
};

// * adaptive
export const xs = '480px';
export const sm = '576px';
export const md = '768px';
export const lg = '992px';
export const xl = '1200px';
export const xxl = '1600px';

export const xs_1 = '479px';
export const sm_1 = '575px';
export const md_1 = '767px';
export const lg_1 = '991px';
export const xl_1 = '1199px';
export const xxl_1 = '1599px';

export const ipadProMaxResolution = '1367px';

export const scrollBarWidth = '5px';
