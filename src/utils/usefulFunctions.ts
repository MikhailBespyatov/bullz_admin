import { dateBadgeFormat, timeFormat } from 'constants/defaults/formats';
import { accessRoles, Roles } from 'constants/defaults/users';
import { errorDataMessage, errorNotEntryAllowed } from 'constants/notifications';
import { boundaryNumber, quantityNumbersAfterComma } from 'constants/others';
import { isoLanguageCodeRegExp, mongoDbObjectIdRegExp } from 'constants/regularExpressions';
import { cardPaddingMultiplier, responsiveNumber } from 'constants/styles/others';
import { padding } from 'constants/styles/sizes';
import format from 'date-fns/format';
import * as locale from 'locale-codes';
import { Auth } from 'types/global';

// Convert locale-codes to locale language names and return it as sring
// ['en-US', 'os-RU'] -> 'English, Ossetian'

export const getLanguagesName = (array: string[]) => {
    if (!array || !array.length) return undefined;

    let stringOfLanguagesName = '';

    for (let i = 0; i < array.length; i++) {
        if (!(array[i] && isoLanguageCodeRegExp.test(array[i]))) {
            continue;
        }

        if (locale.getByTag(array[i])) stringOfLanguagesName += locale.getByTag(array[i]).name + ' ';
    }

    return stringOfLanguagesName.trim();
};

// export const getLanguagesName = (array: string[]) =>
//     array
//         .map(code => locale.getByTag(code).name)
//         .join()
//         .replace(',', ', ');

//getLanguagesName(['', '', '']);
//getLanguagesName(['en-CA', 'de-AT', 'fr-BE']);

// INPUT NUMBER WHICH POINTING THE QUANTITY OF CARDS IN A ROW FOR SELECTED WIDTH INTERVAL (FROM TO)
export const adaptiveCard: (n: number, from: string, to: string) => string = (n, from, to) => {
    if (Number.isInteger(n))
        if (n > 0)
            return `@media (min-width: ${from}) and (max-width: ${to}) {
       // width: calc(100% / ${n} - ${cardPaddingMultiplier} * ${padding} * ${n} / ${n});
         width: calc(100% / ${n} - ${cardPaddingMultiplier} * ${padding} * ${n - 1} / ${n});
         &:nth-child(${n}n) {
          margin-right: 0;
       }
    }`;

    return '';
};

export const toCamelCaseRole = (role: string) =>
    role
        .toLowerCase()
        .split(/(manager|super)/)
        .filter(word => word !== '')
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join('');

// TRIGGER COPY TO CLIPBOARD
export const triggerCopy: (text: string) => void = text => navigator.clipboard.writeText(text);

// give access a user as natural (-1 - no any access) number (the less number, the more rights user has)
export const giveAccess: (user: BULLZ.UserAuthorizeResponse) => number = user => {
    const roles = user?.user?.roles?.map(role => toCamelCaseRole(role));

    let access: Roles = Roles.Unknown;

    if (roles && roles.length) {
        accessRoles.forEach(role => {
            // !!! Because role - it is key for Roles enum, but I was unable to type the accessRoles array !!!
            // @ts-ignore
            roles.includes(role) && (access > Roles[role] || access === Roles.Unknown) && (access = Roles[role]);
        });
    }
    return access;
};

// REPLACE EXACT NUMBER TO APPROXIMATE NUMBER TO REDUCE ITS LENGTH
export const numberConverter: (n: number) => string = n => {
    if (n <= 0 || n === Infinity) return '0';
    if (!Number.isInteger(n)) n = Math.round(n);
    let str = n.toString();
    let i = 0;
    if (n < boundaryNumber)
        while (str.length > 4) {
            i++;
            str = str.substring(0, str.length - 3);
        }
    else
        while (str.length > 3) {
            i++;
            str = str.substring(0, str.length - 3);
        }

    if (i !== 0) {
        if (i === 1) str += 'K';
        else if (i === 2) str += 'M';
        else if (i === 3) str += 'B';
        else str += 'B+';
    }

    return str;
};

export const addZero = (date: number, n = 2) => date.toString().padStart(n, '0');

// PARSE CALENDAR DATE
export const parseCalendarDate: (date: Date) => string = date => {
    if (date.toString() === 'Invalid Date') return 'invalid date';

    //"23.07.2020 (09:18:07)"  date-fns library
    const formattedDate = format(date, dateBadgeFormat);
    const formattedTime = format(date, timeFormat);

    return `${formattedDate} (${formattedTime})`;

    /*
        date.toString() === 'Invalid Date'
                ? 'invalid date'
                : addZero(date.getDate()) +
                '.' +
                addZero(date.getMonth() + 1) +
                '.' +
                date.getFullYear() +
                ' (' +
                addZero(date.getHours()) +
                ':' +
                addZero(date.getMinutes()) +
                ':' +
                addZero(date.getSeconds()) +
                ')';
 */
};

// SUM AVERAGE OF ARRAY OF NUMBERS
export const averageValue: (array: number[]) => number = array => {
    const length = array.length;
    if (length < 1) return 0;

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (isNaN(array[i])) return NaN;
        sum += array[i];
    }

    return Number((sum / length).toFixed(quantityNumbersAfterComma));
};

// CHECK FOR EXISTING TAG IN TEST ARRAY AND RETURN CORRESPONDING OBJECT WITH EXISTING KEYS
// @ts-ignore
// export const filterTagsConverter: (tags: string[], testArray?: TestArrayType[]) => BULLZ.QueryAllVideosRequest = (
//     tags,
//     testArray = testFilterArray
// ) => {
//     const newValues = {};
//     testArray.forEach(item => {
//         //@ts-ignore
//         newValues[item.searchKey] = item.searchValue;
//         for (let i = 0; i < tags.length; i++)
//             if (tags[i] === item.match) {
//                 //@ts-ignore
//                 newValues[item.searchKey] = item.searchValue;
//                 for (let i = 0; i < tags.length; i++)
//                     if (tags[i] === item.match) {
//                         //@ts-ignore
//                         newValues[item.searchKey] = !item.searchValue;
//                         break;
//                     }
//             }
//     });

//     return newValues;
// };

// FOR GRID ADAPTIVE CELL
export const getWidthString = (span: number) => {
    if (!span || !Number.isInteger(span) || span < 0 || span > responsiveNumber) return '';

    return `width: ${(span / responsiveNumber) * 100}%;`;
};

// IMITATING ASYNC REQUEST
export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

// PARSE MODAL ASSIGN ROLE DESCRIPTION
export const parseAssignRoleDescription: (username: string, role: string) => string = (username, role) =>
    `Do you want to assign a user ${username ? username : 'anonymous'} a role ${role ? role : 'unknown'}?`;

// PARSE KEY FOR SIDE BAR ACTIVE BUTTONS AND SUBMENU
export const parseKeyWithoutId: (path: string) => string = path => {
    let i = 0;
    path.replace(new RegExp(`/`, 'gi'), () => {
        i++;
        return '/';
    });

    if (i < 2) return path;
    return path.slice(0, path.lastIndexOf('/') + 1);
};

export const objectIsEmpty = (obj: object) => !Object.values(obj).length;

export const getStoriesTitle = (base: string) => base.split('/').slice(-3, -1).join('/');

export const getDateFromString = (dateISOString?: string) => {
    if (!dateISOString) return '';

    //2021-01-09T13:57:15.832Z -> 2021-01-09
    return dateISOString.split('T')[0];
};

export const formatDateISOString = (dateISOString?: string) => {
    const date = dateISOString && Date.parse(dateISOString);

    return date ? format(date, dateBadgeFormat) : '';
};

export const getTimeFromString = (dateISOString?: string) => {
    if (!dateISOString) return '';
    //2021-01-09T13:57:15.832Z -> 13:57:15.832Z

    const time = dateISOString.split('T')[1];
    if (!time) return '';

    //13:57:15.832Z => 13:57:15
    return time.split('.')[0];
};

export const findElementInChildrenList = (targetElement: Element, searchElement: EventTarget | null) => {
    let isInParentBlock = false;
    const checkChildrenRef = (el: Element) => {
        if (el.childElementCount === 0) return;
        else
            el.childNodes.forEach((el: any) => {
                if (searchElement === el) isInParentBlock = true;
                checkChildrenRef(el);
            });
    };

    checkChildrenRef(targetElement);
    return isInParentBlock;
};

export const getTotalRecords = (totalRecords: number | undefined | null) =>
    totalRecords && totalRecords !== -1 ? totalRecords : 0;

export const capitalizeChar = (str: string, charAt = 0) =>
    str.slice(0, charAt) + str.charAt(charAt).toUpperCase() + str.slice(charAt + 1);

export const getAuthData: (user: BULLZ.UserAuthorizeResponse) => Auth = user =>
    objectIsEmpty(user)
        ? {
              access: Roles.Unknown,
              authDenyReason: errorDataMessage
          }
        : user.message
        ? {
              access: Roles.Unknown,
              authDenyReason: errorDataMessage
          }
        : giveAccess(user) !== Roles.Unknown
        ? {
              access: giveAccess(user),
              authDenyReason: ''
          }
        : {
              access: Roles.Unknown,
              authDenyReason: errorNotEntryAllowed
          };

export const isObjectId = (id: string) => mongoDbObjectIdRegExp.test(id);

export const toggleValueToArray = (array: string[], value: string) =>
    array.some(item => item === value) ? array.filter(item => item !== value) : [...array, value];

export const getWOMValidationResult = (result: WOM.ValidationResult) => {
    switch (result) {
        case 0:
            return 'Not Processed';
        case 1:
            return 'Accepted By Consensus';
        case -1:
            return 'Rejected By Consensus';
    }
};

export const getWOMEndedReason = (result: WOM.ValidationEndedReason) => {
    switch (result) {
        case 0:
            return 'None';
        case 1:
            return 'Completed Normally';
        case 2:
            return 'Consensus Not Reached';
        case 3:
            return 'Terminated In Hold';
    }
};

export const getWOMValidationStage = (result: WOM.ValidationStage) => {
    switch (result) {
        case 0:
            return 'Not Started';
        case 1:
            return 'Processing';
        case 2:
            return 'Ended';
        case 3:
            return 'Held';
    }
};

export const getDiffDateMoreDateNow = (date: string) => {
    const dayInMillisecond = 86400000;
    const dateNowTime = new Date().getTime();
    const dateBeforeTime = new Date(date).getTime();

    return Math.abs(dateNowTime - dateBeforeTime) > dayInMillisecond;
};

export function isValidHttpUrl(string: string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
}

export const getEllipsisAddress = (str: string, quantity = 12) =>
    str.length < quantity ? '' : '...' + str.substring(str.length - quantity, str.length);
