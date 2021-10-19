import { formatEngagementStatisticsValues } from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { Roles } from 'constants/defaults/users';
import { errorDataMessage, errorNotEntryAllowed } from 'constants/notifications';
import { cardPaddingMultiplier } from 'constants/styles/others';
import { padding } from 'constants/styles/sizes';
import { sortTrending } from 'utils/filters';
import {
    dividePixels,
    multiplyPixels,
    parseCreateTrendingVideoPosition,
    pixelsAddition,
    pixelsSubtraction
} from 'utils/parsers';
import {
    adaptiveCard,
    addZero,
    averageValue,
    capitalizeChar,
    formatDateISOString,
    getAuthData,
    getDateFromString,
    getLanguagesName,
    getStoriesTitle,
    getTimeFromString,
    getWidthString,
    giveAccess,
    isObjectId,
    numberConverter,
    objectIsEmpty,
    parseAssignRoleDescription,
    parseCalendarDate,
    parseKeyWithoutId,
    toggleValueToArray
} from 'utils/usefulFunctions';

describe('getLanguageNameFromCode', () => {
    it('Test for language code converting to language name', () => {
        expect(getLanguagesName(['hy-AM'])).toBe('Armenian');
        expect(getLanguagesName(['hy'])).toBe('Armenian');
        expect(getLanguagesName(['ast-ES'])).toBe('Asturian');
        expect(getLanguagesName(['co-FR', 'nl-BE'])).toBe('Corsican Dutch');
        expect(getLanguagesName(['en-CA', 'de-AT', 'fr-BE'])).toBe('English German French');
        expect(getLanguagesName(['el', 'he', 'id'])).toBe('Greek Hebrew Indonesian');
        expect(getLanguagesName(['', '', ''])).toBe('');
        expect(getLanguagesName([])).toBe(undefined);
        expect(getLanguagesName([''])).toBe('');
        expect(getLanguagesName([' '])).toBe('');
        expect(getLanguagesName(['1'])).toBe('');
        expect(getLanguagesName(['%'])).toBe('');
    });
});

describe('adaptiveCard', () => {
    it('Test adaptivity', () => {
        expect(adaptiveCard(-1, '0', '100px')).toBe('');
        expect(adaptiveCard(0, '0', '100px')).toBe('');
        expect(adaptiveCard(1, '0', '100px')).toBe(`@media (min-width: 0) and (max-width: 100px) {
        width: calc(100% / 1 - ${cardPaddingMultiplier} * ${padding} * 0 / 1);
        &:nth-child(1n) {
        margin-right: 0;
      }
    }`);
        expect(adaptiveCard(2, '0', '100px')).toBe(`@media (min-width: 0) and (max-width: 100px) {
        width: calc(100% / 2 - ${cardPaddingMultiplier} * ${padding} * 1 / 2);
        &:nth-child(2n) {
        margin-right: 0;
      }
    }`);
        expect(adaptiveCard(3, '0', '100px')).toBe(`@media (min-width: 0) and (max-width: 100px) {
        width: calc(100% / 3 - ${cardPaddingMultiplier} * ${padding} * 2 / 3);
        &:nth-child(3n) {
        margin-right: 0;
      }
    }`);
        expect(adaptiveCard(4, '0', '100px')).toBe(`@media (min-width: 0) and (max-width: 100px) {
        width: calc(100% / 4 - ${cardPaddingMultiplier} * ${padding} * 3 / 4);
        &:nth-child(4n) {
        margin-right: 0;
      }
    }`);
    });
});

// describe('checkOnAdmin', () => {
//     it('Test for admin', () => {
//         expect(checkOnAdmin({})).toBe(false);
//         expect(
//             checkOnAdmin({
//                 user: {
//                     userId: 'dawd'
//                 }
//             })
//         ).toBe(false);
//         expect(
//             checkOnAdmin({
//                 user: {
//                     userId: 'dawd',
//                     roles: []
//                 }
//             })
//         ).toBe(false);
//         expect(
//             checkOnAdmin({
//                 user: {
//                     userId: 'dawd',
//                     roles: ['dawdadad']
//                 }
//             })
//         ).toBe(false);
//         expect(
//             checkOnAdmin({
//                 user: {
//                     userId: 'dawd',
//                     roles: ['dawdadad', administratorTypeName, 'dawdadawd']
//                 }
//             })
//         ).toBe(true);
//     });
// });

describe('giveAccess', () => {
    it('Test for returning access', () => {
        expect(giveAccess({})).toBe(-1);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd'
                }
            })
        ).toBe(-1);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: []
                }
            })
        ).toBe(-1);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['dawdadad']
                }
            })
        ).toBe(-1);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['dawdadad', 'administrator', 'adawd']
                }
            })
        ).toBe(0);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['dawdadad', 'administrator', 'Curator']
                }
            })
        ).toBe(0);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['ContentManager', 'Curator']
                }
            })
        ).toBe(1);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['Curator', 'Registered']
                }
            })
        ).toBe(2);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['Curator', 'Facilitator']
                }
            })
        ).toBe(2);
        expect(
            giveAccess({
                user: {
                    userId: 'dawd',
                    roles: ['Tracked', 'Registered', 'Facilitator']
                }
            })
        ).toBe(3);
    });
});

describe('numberConverter', () => {
    it('Test for converting', () => {
        expect(numberConverter(-1.21)).toBe('0');
        expect(numberConverter(0)).toBe('0');
        expect(numberConverter(1.21)).toBe('1');
        expect(numberConverter(123)).toBe('123');
        expect(numberConverter(1234.99)).toBe('1235');
        expect(numberConverter(12342)).toBe('12K');
        expect(numberConverter(12342111)).toBe('12M');
        expect(numberConverter(12342111222)).toBe('12B');
        expect(numberConverter(12342111222333)).toBe('12B+');
        expect(numberConverter(12342111222333444)).toBe('12B+');
    });
});

describe('formatEngagementStatisticsValues', () => {
    it('Test for formatting income numbers', () => {
        expect(formatEngagementStatisticsValues(-1.21)).toBe('0');
        expect(formatEngagementStatisticsValues(0)).toBe('0');
        //expect(formatEngagementStatisticsValues(1.21)).toBe('1');
        expect(formatEngagementStatisticsValues(123)).toBe('123');
        expect(formatEngagementStatisticsValues(1234.99)).toBe('1.2k');
        expect(formatEngagementStatisticsValues(12342)).toBe('12.3k');
        expect(formatEngagementStatisticsValues(12342111)).toBe('12.3m');
        expect(formatEngagementStatisticsValues(12342111222)).toBe('12.3b');
    });
});

describe('addZero', () => {
    it('Test for adding zero', () => {
        expect(addZero(9)).toBe('09');
        expect(addZero(1)).toBe('01');
        expect(addZero(0)).toBe('00');
        expect(addZero(12, 3)).toBe('012');
        expect(addZero(123, 4)).toBe('0123');
    });
});

describe('parseCalendarDate', () => {
    it('Test for dates', () => {
        expect(parseCalendarDate(new Date('dadadad'))).toBe('invalid date');
        expect(parseCalendarDate(new Date(''))).toBe('invalid date');
        expect(parseCalendarDate(new Date('undefined'))).toBe('invalid date');
        expect(parseCalendarDate(new Date('2021-06-03T12:50:20.490Z'))).toBe('03.06.2021 (15:50:20)');
        expect(parseCalendarDate(new Date('2021-06-03T10:10:50.490Z'))).toBe('03.06.2021 (13:10:50)');
        expect(parseCalendarDate(new Date('2020-07-23T06:18:07.264Z'))).toBe('23.07.2020 (09:18:07)');
        expect(parseCalendarDate(new Date('2020-07-03T10:00:00.264Z'))).toBe('03.07.2020 (13:00:00)');
    });
});

describe('averageValue', () => {
    it('Test for average value', () => {
        expect(averageValue([])).toBe(0);
        expect(averageValue([0, -1, 2])).toBe(0.3);
        expect(averageValue([NaN, -1, 2])).toBe(NaN);
        expect(averageValue([0, -1, NaN])).toBe(NaN);
        expect(averageValue([0, 2, 2])).toBe(1.3);
        expect(averageValue([4, 5, 6.3])).toBe(5.1);
    });
});

// describe('filterTagsConverter', () => {
//     it('Test for filter tags', () => {
//         expect(filterTagsConverter(['Reported'])).toStrictEqual({
//             isReported: true,
//             hasHlsStream: true
//         });
//         expect(filterTagsConverter(['No HLS stream'])).toStrictEqual({
//             isReported: false,
//             hasHlsStream: false
//         });
//         expect(filterTagsConverter(['No HLS stream', 'Reported'])).toStrictEqual({
//             isReported: true,
//             hasHlsStream: false
//         });
//         expect(filterTagsConverter(['No HLS dawd', 'awdadwawd'])).toStrictEqual({
//             isReported: false,
//             hasHlsStream: true
//         });
//         expect(filterTagsConverter([])).toStrictEqual({
//             isReported: false,
//             hasHlsStream: true
//         });
//     });
// });

describe('getWidthString', () => {
    it('Test for adaptive string', () => {
        expect(getWidthString(0)).toBe('');
        expect(getWidthString(-1)).toBe('');
        expect(getWidthString(1.1)).toBe('');
        expect(getWidthString(1)).toBe(`width: 8.333333333333332%;`);
        expect(getWidthString(13)).toBe('');
        expect(getWidthString(7)).toBe(`width: 58.333333333333336%;`);
    });
});

describe('parseAssignRoleDescription', () => {
    it('Test for assign role modal description', () => {
        expect(parseAssignRoleDescription('', '')).toBe('Do you want to assign a user anonymous a role unknown?');
        expect(parseAssignRoleDescription('God turd', '')).toBe(
            'Do you want to assign a user God turd a role unknown?'
        );
        expect(parseAssignRoleDescription('', 'God turd')).toBe(
            'Do you want to assign a user anonymous a role God turd?'
        );
        expect(parseAssignRoleDescription('God turd', 'God turd')).toBe(
            'Do you want to assign a user God turd a role God turd?'
        );
    });
});

describe('parseKeyWithoutId', () => {
    it('Test for path keys', () => {
        expect(parseKeyWithoutId('')).toBe('');
        expect(parseKeyWithoutId('/')).toBe('/');
        expect(parseKeyWithoutId('/parse')).toBe('/parse');
        expect(parseKeyWithoutId('/parse/')).toBe('/parse/');
        expect(parseKeyWithoutId('/parse/wadadwadad')).toBe('/parse/');
        expect(parseKeyWithoutId('/parse/1/adadadw')).toBe('/parse/1/');
    });
});

describe('objectIsEmpty', () => {
    it('Test for object Is Empty', () => {
        expect(objectIsEmpty({})).toBe(true);
        expect(objectIsEmpty({ bestLanguage: 'JS' })).toBe(false);
        expect(objectIsEmpty({ bestFramework: 'REACT', bestFutureFramework: 'SVELTE' })).toBe(false);
    });
});

describe('multiplyPixels', () => {
    it('Test for multiplyPixels', () => {
        expect(multiplyPixels('100ppx', 2)).toBe('0');
        expect(multiplyPixels('100px', 2)).toBe('200px');
        expect(multiplyPixels('100px', 3)).toBe('300px');
    });
});

describe('dividePixels', () => {
    it('Test for multiplyPixels', () => {
        expect(dividePixels('100px', 0)).toBe('0');
        expect(dividePixels('100ppx', 2)).toBe('0');
        expect(dividePixels('50px', 3)).toBe('17px');
        expect(dividePixels('100px', 2)).toBe('50px');
        expect(dividePixels('100px', 3)).toBe('33px');
    });
});

describe('pixelsAddition', () => {
    it('Test for pixelsAddition', () => {
        expect(pixelsAddition('100ppx', '0')).toBe('0');
        expect(pixelsAddition('100ppx', '0px')).toBe('0');
        expect(pixelsAddition('100px', '101px')).toBe('201px');
        expect(pixelsAddition('19px', '20px')).toBe('39px');
    });
});

describe('pixelsSubtraction', () => {
    it('Test for pixelsSubtraction', () => {
        expect(pixelsSubtraction('100ppx', '0')).toBe('0');
        expect(pixelsSubtraction('100ppx', '0px')).toBe('0');
        expect(pixelsSubtraction('200px', '101px')).toBe('99px');
        expect(pixelsSubtraction('19px', '20px')).toBe('-1px');
    });
});

describe('sortTrending', () => {
    it('Test for filter tags', () => {
        expect(
            sortTrending([
                {
                    position: 1
                },
                {
                    position: 0
                },
                {
                    position: 3
                },
                {
                    position: 2
                }
            ])
        ).toStrictEqual([
            {
                position: 0
            },
            {
                position: 1
            },
            {
                position: 2
            },
            {
                position: 3
            }
        ]);
        expect(
            sortTrending([
                {
                    position: 1
                },
                {
                    position: 0
                },
                {
                    position: undefined
                },
                {
                    position: 2
                }
            ])
        ).toStrictEqual([]);
        expect(
            sortTrending([
                {
                    position: 2
                },
                {
                    position: 1
                },
                {
                    position: 0
                }
            ])
        ).toStrictEqual([
            {
                position: 0
            },
            {
                position: 1
            },
            {
                position: 2
            }
        ]);
    });
});

// const mockCallback = jest.fn(() => '2020-12-12T12:18:36.845Z');
// forEach([0, 1], mockCallback);

//TODO: I don't know how solve problem with Date.now()
// describe('getDateBeforeAndReturnISO', () => {
//     it('Test for dates', () => {
//         expect(getDateBeforeAndReturnISO(-1)).toBe('2020-12-12T12:18:36.845Z');
//         expect(getDateBeforeAndReturnISO()).toBe('invalid date');
//         expect(getDateBeforeAndReturnISO(1)).toBe('invalid date');
//     });
// });

describe('parseCreateTrendingVideoPosition', () => {
    it('Test for parseCreateTrendingVideoPosition', () => {
        expect(parseCreateTrendingVideoPosition([])).toBe(0);
        expect(parseCreateTrendingVideoPosition(null)).toBe(0);
        expect(parseCreateTrendingVideoPosition(undefined)).toBe(0);
        expect(parseCreateTrendingVideoPosition([], 2)).toBe(2);
    });
});

describe('getStoriesTitle', () => {
    it('Test for getStoriesTitle', () => {
        expect(getStoriesTitle('src/test/folder/current/Select/')).toBe('current/Select');
        expect(getStoriesTitle('src/test/folder')).toBe('src/test');
        expect(getStoriesTitle('src/test')).toBe('src');
    });
});

describe('getDateFromString', () => {
    it('Test for getDateFromString', () => {
        expect(getDateFromString('2021-01-09T13:57:15.832Z')).toBe('2021-01-09');
        expect(getDateFromString('')).toBe('');
        expect(getDateFromString()).toBe('');
        expect(getDateFromString('adadaasdasd')).toBe('adadaasdasd');
        expect(getDateFromString('adadaTasdasd')).toBe('adada');
    });
});

describe('formatDateISOString', () => {
    it('Test for formatDateISOString', () => {
        expect(formatDateISOString('2021-01-09T13:57:15.832Z')).toBe('09.01.2021');
        expect(formatDateISOString('')).toBe('');
        expect(formatDateISOString()).toBe('');
        expect(formatDateISOString('adadaasdasd')).toBe('');
        expect(formatDateISOString('1231321321')).toBe('');
    });
});

describe('getTimeFromString', () => {
    it('Test for getTimeFromString', () => {
        expect(getTimeFromString('2021-01-09T13:57:15.832Z')).toBe('13:57:15');
        expect(getTimeFromString('')).toBe('');
        expect(getTimeFromString()).toBe('');
        expect(getTimeFromString('asssad')).toBe('');
        expect(getTimeFromString('asssadTasasdasd')).toBe('asasdasd');
    });
});

describe('capitalizeChar', () => {
    it('Test for capitalizeChar', () => {
        expect(capitalizeChar('')).toBe('');
        expect(capitalizeChar('a')).toBe('A');
        expect(capitalizeChar('A')).toBe('A');
        expect(capitalizeChar('asssad')).toBe('Asssad');
        expect(capitalizeChar('asssad', 2)).toBe('asSsad');
        expect(capitalizeChar('asssad', 8)).toBe('asssad');
    });
});

describe('getAuthData', () => {
    it('Test for getAuthData', () => {
        const mockUserAdministrator: BULLZ.UserAuthorizeResponse = {
            user: { userId: '123', roles: ['Administrator'] }
        };

        const mockUserContentManager: BULLZ.UserAuthorizeResponse = {
            user: { userId: '123', roles: ['ContentManager'] }
        };

        const mockUserCurator: BULLZ.UserAuthorizeResponse = {
            user: { userId: '123', roles: ['Curator'] }
        };

        const mockUserCombined: BULLZ.UserAuthorizeResponse = {
            user: { userId: '123', roles: ['ContentManager', 'Administrator', 'Curator'] }
        };

        const mockUserAny: BULLZ.UserAuthorizeResponse = {
            user: { userId: '123', roles: ['Any'] }
        };

        const mockEmptyUserWithMessage: BULLZ.UserAuthorizeResponse = {
            message: 'Error'
        };

        expect(getAuthData({})).toEqual({
            access: Roles.Unknown,
            authDenyReason: errorDataMessage
        });
        expect(getAuthData(mockEmptyUserWithMessage)).toEqual({
            access: Roles.Unknown,
            authDenyReason: errorDataMessage
        });
        expect(getAuthData(mockUserAdministrator)).toEqual({
            access: Roles.Administrator,
            authDenyReason: ''
        });
        expect(getAuthData(mockUserContentManager)).toEqual({
            access: Roles.ContentManager,
            authDenyReason: ''
        });
        expect(getAuthData(mockUserCurator)).toEqual({
            access: Roles.Curator,
            authDenyReason: ''
        });
        expect(getAuthData(mockUserCombined)).toEqual({
            access: Roles.Administrator,
            authDenyReason: ''
        });
        expect(getAuthData(mockUserAny)).toEqual({
            access: Roles.Unknown,
            authDenyReason: errorNotEntryAllowed
        });
    });
});

describe('isObjectId', () => {
    it('Test for isObjectId', () => {
        expect(isObjectId('')).toBe(false);
        expect(isObjectId('000000')).toBe(false);
        expect(isObjectId('A')).toBe(false);
        expect(isObjectId('5e4cfc6e09748da8240c3ad3')).toBe(true);
        expect(isObjectId('5e4cfc6e09748da8240c3ad')).toBe(false);
        expect(isObjectId('5f6322a60208c2f19b766f84')).toBe(true);
    });
});

describe('toggleValueToArray', () => {
    it('Test for toggleValueToArray', () => {
        expect(toggleValueToArray(['test', 'test2', 'test3'], 'test4')).toStrictEqual([
            'test',
            'test2',
            'test3',
            'test4'
        ]);
        expect(toggleValueToArray(['test', 'test2', 'test3', 'test4'], 'test4')).toStrictEqual([
            'test',
            'test2',
            'test3'
        ]);
        expect(toggleValueToArray([], 'test4')).toStrictEqual(['test4']);
    });
});
