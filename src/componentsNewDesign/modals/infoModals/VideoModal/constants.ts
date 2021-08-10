import { black, errorColor, grey8, grey9 } from 'constants/styles/colors';
import { calculateBlockWidth } from 'utils/calculators';

export const videoIdFontSize = '12px';
export const videoIdFontWeight = '500';

export const deleteVideoButtonFontSize = '11px';
export const buttonsHeight = '36px';
export const curateButtonFontSize = '12px';
export const editButtonHeight = '12px';
export const editButtonFontSize = '10px';
export const editButtonColor = '#fb003f';
export const curateButtonWidth = '118px';

export const videoPlayerWidth = '180px';
export const videoPlayerHeight = '257px';

export const subTitleFontWeight = '700';
export const subTitleColor = grey9;

export const posterBackground = grey8;
export const successMessageColor = '#03a400';
export const neutralMessageColor = '#9d41ac';

// export const propertyBlockHeight = '50px';
// export const propertyBlockPadding = '8px 8px 10px';
export const propertyBlockWidth = calculateBlockWidth(3, 8);

export function formatDate(dateISOString: string) {
    //'2021-01-09T13:57:15.832Z'
    if (!dateISOString) return '';
    //'2021-01-09T13:57:15.832Z' -> "09.01.2021"
    const formatedDate = dateISOString.substr(0, 10).split('-').reverse().join('.');

    return formatedDate;
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
    10: 'NotProductRecommendation'
};

// export const language = {
//     en: 'English'
// };

// export function getFullLanguage(arr: string[]) {
//     if (arr.length === 0) return '';
//     let languagesStr = '';
//     let language = '';

//     arr.forEach((item: string) => {
//         switch (item) {
//             case 'en':
//                 language = 'English';
//                 break;
//             case 'ru':
//                 language = 'Russian';
//                 break;
//             case 'pt':
//                 language = 'Portuguese';
//                 break;
//             default:
//                 language = '';
//                 break;
//         }
//         languagesStr += language + ' ';
//     });

//     return languagesStr;
// }
