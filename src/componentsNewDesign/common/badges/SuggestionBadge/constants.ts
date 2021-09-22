import { darkBlue, darkError, darkOrange, errorColor, orange, skyBlue } from 'constants/styles/colors';
import { BackgroundColor, Color } from 'types/styles';

interface BadgeStyles extends BackgroundColor, Color {}

export type SuggestionObjType = {
    low: BadgeStyles;
    medium: BadgeStyles;
    high: BadgeStyles;
};

export const suggestionObj: SuggestionObjType = {
    low: { backgroundColor: darkBlue, color: skyBlue },
    medium: { backgroundColor: darkOrange, color: orange },
    high: { backgroundColor: darkError, color: errorColor }
};

export const badgePadding = '10px 16px 12px';
export const titlePadding = '0px 0px 5px';
export const badgeTextFontWeight = '500';
