import { formatEngagementStatisticsValues } from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { Roles } from 'constants/defaults/users';
import format from 'date-fns/format';
import * as _ from 'lodash';

const spaceSymbol = ' ';
export const blockSeparator = '  ';
export const stringsSeparator = '   ';

export const modalHeight = '600px';
export const modalWidth = '830px';
export const headerModalHeight = '45px';
export const bodyModalHeight = parseInt(modalHeight) - parseInt(headerModalHeight) + 'px';

export const hiddenValue = 'Hidden';
export const emptyValue = '...';

export const getConfidentialValue = (access: Roles, value?: string) =>
    access === Roles.SuperAdministrator || access === Roles.Administrator ? value || emptyValue : hiddenValue;

type getPublicType = string | number | undefined | null;
export const getPublicValue = (value: getPublicType) => {
    if (typeof value === 'number') return value ? formatEngagementStatisticsValues(value) : 0;

    return value || emptyValue;
};
const getPublicValueAndAddSpaces = (value: getPublicType, length: number) => {
    const newValue = getPublicValue(value).toString();

    return newValue.length > length ? newValue : _.repeat(spaceSymbol, length - newValue.length) + newValue;
};

export const engagementsParameter: Array<keyof BULLZ.EngagementsOnContent> = ['all', 'public', 'private'];

export const generateTitleColumnWithSpaces = (titles: string[]) => {
    let length = titles.reduce((length, title) => (title.length > length ? title.length : length), 0);
    return titles.map(i => (i.length > length ? i : i + _.repeat(spaceSymbol, length - i.length)));
};

export type EngagementKey = keyof BULLZ.EngagementsParameters;
export const generateEngagementTableWithSpaces = (engagements: BULLZ.EngagementsOnContent, keys: EngagementKey[]) => {
    const columnLengths = engagementsParameter.map(i => i.length);
    engagementsParameter.forEach((parameter, i) =>
        keys.forEach(key => {
            const length = getPublicValue(engagements[parameter][key]).toString().length;
            columnLengths[i] < length && (columnLengths[i] = length);
        })
    );
    const rowValues = keys.map(key =>
        engagementsParameter
            .map((parameter, i) => getPublicValueAndAddSpaces(engagements[parameter][key], columnLengths[i]))
            .join(' | ')
    );
    return [
        engagementsParameter.map((parameter, i) => getPublicValueAndAddSpaces(parameter, columnLengths[i])).join(' | '),
        ...rowValues
    ];
    // return engagementsParameter.map((parameter, i) =>
    //     keys.forEach(key => {
    //         const length = engagements[parameter][key].toString().length;
    //         columnLengths[i] < length && (columnLengths[i] = length);
    //     })
    // );
};

export const getEngagementValue = (engagements: BULLZ.EngagementsOnContent, key: EngagementKey) =>
    engagementsParameter.map(engagement => getPublicValue(engagements[engagement][key])).join(' | ');

export const getDateValue = (value?: string) =>
    value ? format(new Date(value), 'yyyy-MM-dd hh:mm:ss') : getPublicValue(value);
