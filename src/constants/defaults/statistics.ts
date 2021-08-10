import { getDateBeforeAndReturnISO } from 'utils/parsers';
import { defaultPage } from 'constants/defaults/filterSettings';

export const defaultStatisticsValues: YEAY.QueryVideoStatisticsRequest = {
    pageIndex: defaultPage,
    limit: 100,
    returnQueryCount: true,
    utcStart: getDateBeforeAndReturnISO(7),
    utcEnd: getDateBeforeAndReturnISO(-1),
    sortByViewCountAsc: false,
    isUserDisabled: false,
    isVideoDeleted: false
    //sort: sortTagsValuesDefault + sortModeTagsValuesDefault
};
