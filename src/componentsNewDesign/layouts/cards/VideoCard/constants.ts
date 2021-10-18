import { black, errorColor, grey8 } from 'constants/styles/colors';
import { calculateBlockWidth } from 'utils/calculators';

export const textFontSize = '14px';
export const minorTextFontSize = '12px';
export const minorTextFontWeight = '500';

export const topPartBackground = grey8;
export const successMessageColor = '#03a400';
export const neutralMessageColor = '#9d41ac';

export const popularityIndicatorTextFontSize = '10px';
export const popularityIndicatorTextFontWeight = '500';
export const popularityIndicatorTextHorizontalPadding = '5px';

export const propertyBlockHorizontalPadding = '4px';
export const propertyBlockWidth = calculateBlockWidth(2, 16);

export const videoCardButtonWidth = calculateBlockWidth(2, 16);

export function formatEngagementStatisticsValues(statisticsValue: number) {
    if (statisticsValue <= 0 || !Number.isFinite(statisticsValue)) return '0';
    let result: string | number;
    const arr = [
        { power: 9, letter: 'b' },
        { power: 6, letter: 'm' },
        { power: 3, letter: 'k' }
    ];

    for (let i = 0; i < arr.length; i++) {
        if (statisticsValue >= Math.pow(10, arr[i].power)) {
            result =
                statisticsValue % Math.pow(10, arr[i].power) === 0
                    ? `${Math.round(statisticsValue / Math.pow(10, arr[i].power))}${arr[i].letter}`
                    : `${(statisticsValue / Math.pow(10, arr[i].power)).toFixed(1)}${arr[i].letter}`;

            return result.toString();
        }
    }
    result = statisticsValue;
    return result.toString();
}

export const parseDeleteSuccessMessage = (name: string) => 'Video ' + name + ' successfully deleted';
export const parseDeleteModalContent = (name: string) => 'Are you sure you want to delete a video ' + name + '?';
export const deleteTitle = 'Delete';

export const statuses = {
    0: { text: '', color: black },
    1: { text: 'Processing...', color: neutralMessageColor },
    2: { text: 'Accepted', color: successMessageColor },
    3: { text: 'Rejected', color: errorColor },
    4: { text: 'This video is deleted', color: errorColor }
};

export const rejectionReasonText = {
    0: 'None',
    1: 'Decline Requested',
    2: 'Inappropriate',
    3: 'Graphic Content',
    4: 'Violence',
    5: 'Copyright',
    6: 'Test Video',
    7: 'Incorrect Format',
    8: 'User Requested',
    9: 'Other',
    10: 'NotProductRecommendation',
    11: 'WrongLanguage',
    12: 'QualityGuidelines'
};
