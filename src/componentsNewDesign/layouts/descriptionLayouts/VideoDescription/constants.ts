import commentsIcon from 'assets/comments_icon.svg';
import likesIcon from 'assets/likes_icon.svg';
import savesIcon from 'assets/saves_icon.svg';
import sharesIcon from 'assets/shares_icon.svg';
import sampleImage from 'assets/user_image_sample.svg';
import viewsIcon from 'assets/views_icon.svg';
import { black, errorColor, grey8, grey9 } from 'constants/styles/colors';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { QueryPostsResponseExtended } from 'stores/comments/videoComments';

export const videoIdFontSize = '12px';
export const videoIdFontWeight = '500';
export const contentTextLineHeight = '14px';

export const buttonsFontSize = '10px';
export const buttonsFontWeight = '400';
export const buttonsBorderRadius = '4px';
export const buttonsPadding = '8px';

export const curateButtonWidth = '82px';

export const titlePadding = '0 5px';
export const engagementMarginRight = '5px';

export const editButtonHeight = '12px';
export const editButtonFontSize = '10px';
export const editButtonColor = '#fb003f';

export const videoPlayerWidth = '310px';
export const videoPlayerHeight = '257px';

export const subTitleFontWeight = '700';
export const subTitleColor = grey9;

export const posterBackground = grey8;
export const successMessageColor = '#03a400';
export const neutralMessageColor = '#9d41ac';

// export const propertyBlockHeight = '50px';
//export const propertyBlockPadding = '8px 8px 10px';
export const propertyBlockWidth = '209px';

export function formatDate(dateISOString: string) {
    // '2021-01-09T13:57:15.832Z'
    if (!dateISOString) return '';

    // '2021-01-09T13:57:15.832Z' -> "09.01.2021"
    return dateISOString.substr(0, 10).split('-').reverse().join('.');
}

// export const parseDeleteSuccessMessage = (name: string) => 'Video ' + name + ' successfully deleted';
// export const parseDeleteModalContent = (name: string) => 'Are you sure you want to delete a video ' + name + '?';
// export const deleteTitle = 'Delete';

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
    11: 'WrongLanguage'
};

export type NameEngagementType = 'likes' | 'saves' | 'views' | 'commentCount' | 'shares';

export const indicatorsArray = [
    { name: 'likes', imageSource: likesIcon, imageHeight: '12px', imageWidth: '13px' },
    { name: 'saves', imageSource: savesIcon, imageHeight: '12px', imageWidth: '10px' },
    { name: 'views', imageSource: viewsIcon, imageHeight: '12px', imageWidth: '13px' },
    { name: 'commentCount', imageSource: commentsIcon, imageHeight: '12px', imageWidth: '13px' },
    { name: 'shares', imageSource: sharesIcon, imageHeight: '12px', imageWidth: '12px' }
];

// export const getFormattedDate = (dateISOString?: string) =>
//     `${getDateFromString(dateISOString)} ${getTimeFromString(dateISOString)}`;

export const differenceFromCurrentDate = (dateISOString: string) =>
    formatDistanceToNowStrict(Date.parse(dateISOString) /*, {addSuffix: true}*/);

export type NameWOMQualityScoreType = 'quality' | 'authenticity' | 'creativity' | 'positivity';
export type IndicatorWomQuality = {
    name: NameWOMQualityScoreType;
    qualityIndicator: string;
};

export const indicatorsWOMQualityScoreArray: IndicatorWomQuality[] = [
    { name: 'quality', qualityIndicator: 'Q' },
    { name: 'authenticity', qualityIndicator: 'A' },
    { name: 'creativity', qualityIndicator: 'C' },
    { name: 'positivity', qualityIndicator: 'P' }
];

export const countTotalVideoCommentsQuantity = (videoComments: QueryPostsResponseExtended) => {
    if (!videoComments.items) return '';

    return videoComments.items?.reduce(
        (previousRepliesCount, { repliesCount }) =>
            repliesCount ? previousRepliesCount + repliesCount : previousRepliesCount,
        videoComments.totalRecords || 0
    );
};

//video comments Mock data

export const videoComments: QueryPostsResponseExtended = {
    queryStatistics: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
    },
    totalRecords: 3,
    returnedRecords: 0,
    items: [
        {
            repliesCount: 7,
            userId: '000000000000000000000001',
            profileImageUrl: sampleImage,
            username: 'Unknown',
            isFollowed: true,
            isTrusted: true,
            id: '000000000000000000000011',
            parentId: '000000000000000000000000',
            // postBodyType <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
            bodyType: undefined,
            body: 'cntr + alt + del = control yourself alter your thinking delete negativity',
            utcUpdated: '2021-04-21T14:07:23.947Z',
            utcCreated: '2021-04-21T14:07:23.947Z',
            deep: 0,
            reportedState: undefined,
            replies: [
                {
                    userId: '000000000000000000000003',
                    profileImageUrl: sampleImage,
                    username: 'Margo Robbie',
                    isFollowed: true,
                    isTrusted: true,
                    id: '100000000000000000000000',
                    parentId: '000000000000000000000011',
                    bodyType: 0,
                    body: 'Reply 1',
                    utcUpdated: '2021-04-27T09:42:04.258Z',
                    utcCreated: '2021-04-27T09:42:04.258Z',
                    deep: 0,
                    reportedState: 0
                },
                {
                    userId: '000000000000000000000003',
                    profileImageUrl: sampleImage,
                    username: 'Margo Robbie',
                    isFollowed: true,
                    isTrusted: true,
                    id: '200000000000000000000000',
                    parentId: '000000000000000000000011',
                    bodyType: 0,
                    body: 'Reply 2',
                    utcUpdated: '2021-04-27T09:42:04.258Z',
                    utcCreated: '2021-04-27T09:42:04.258Z',
                    deep: 0,
                    reportedState: 0
                },
                {
                    userId: '000000000000000000000003',
                    profileImageUrl: sampleImage,
                    username: 'Margo Robbie',
                    isFollowed: true,
                    isTrusted: true,
                    id: '300000000000000000000000',
                    parentId: '000000000000000000000011',
                    bodyType: 0,
                    body: 'Reply 3',
                    utcUpdated: '2021-04-27T09:42:04.258Z',
                    utcCreated: '2021-04-27T09:42:04.258Z',
                    deep: 0,
                    reportedState: 0
                }
            ]
        },

        {
            userId: '000000000000000000000002',
            profileImageUrl: sampleImage,
            username: 'Sidney Smith',
            isFollowed: true,
            isTrusted: true,
            id: '000000000000000000000022',
            parentId: '000000000000000000000000',
            // postBodyType <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
            bodyType: undefined,
            body: 'We can not know what will happen tomorrow, the point is to stay happy today...',
            utcUpdated: '2021-05-21T14:07:43.947Z',
            utcCreated: '2021-06-21T14:07:53.947Z',
            deep: 0,
            reportedState: undefined
        },
        {
            userId: '000000000000000000000003',
            profileImageUrl: sampleImage,
            username: 'Santa Claus',
            isFollowed: true,
            isTrusted: true,
            id: '000000000000000000000033',
            parentId: '000000000000000000000000',
            // postBodyType <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
            bodyType: undefined,
            body: 'Merry Christmas!',
            utcUpdated: '2021-05-21T14:07:43.947Z',
            utcCreated: '2021-06-21T14:07:53.947Z',
            deep: 0,
            reportedState: undefined
        }
    ]
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
