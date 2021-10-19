import { defaultLimit, defaultPage } from './filterSettings';

export const defaultPromotionsValues: BULLZ.QueryAdminPromotionRequest = {
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const defaultPromotionValues: BULLZ.GetAdminPromotionResponse = {
    id: undefined,
    userAgeRanges: undefined,
    userGenders: undefined,
    location: undefined,
    icon: undefined,
    isActive: undefined,
    pageLocation: undefined
};

// export const defaultPromotionValues: BULLZ.GetAdminPromotionResponse = {
//     id: '111111111',
//     userAgeRanges: [
//         {
//             start: 15,
//             end: 20
//         }
//     ],
//     userGenders: [1, 2],
//     location: ['Russia'],
//     pageLocation: 'https://someurl.com/3456',
//     icon: sampleImage,
//     isActive: true
// };
