import { addDays, subMonths } from 'date-fns';
import format from 'date-fns/format';

export const addDaysToIsoString = (dayIsoString: string, differenceInSelectedDays: number) =>
    addDays(new Date(dayIsoString), differenceInSelectedDays).toISOString();

const getDayBeforeMonth = (monthNumber: number) => subMonths(new Date(), monthNumber);

export const defaultDateRangeRequest = [
    getDayBeforeMonth(1).toISOString(),
    addDays(getDayBeforeMonth(1), 7).toISOString()
];

export const defaultNextDateRangeRequest: [string, string] = [
    addDays(new Date(defaultDateRangeRequest[0]), 8).toISOString(),
    addDays(new Date(defaultDateRangeRequest[1]), 8).toISOString()
];

export const headerForCSVTable: Array<{ label: string; key: keyof YEAY.MarketingStatistics }> = [
    { label: 'From', key: 'utcStart' },
    { label: 'To', key: 'utcEnd' },
    { label: 'Not Verified Users', key: 'notVerifiedUserCount' },
    { label: 'Verified Users', key: 'verifiedUserCount' },
    { label: 'Accepted Videos', key: 'videoCount' },
    { label: 'Rejected Videos', key: 'rejectedVideoCount' },
    { label: 'Comments', key: 'commentCount' },
    { label: 'Views', key: 'viewCount' },
    { label: 'Shares', key: 'shareCount' }
];

export const csvFilename = () => `dashboard_${format(new Date(), 'yyyy_MM_dd_HH_mm_ss')}.csv`;

export const dateFormatInCSV = 'yyyy-mm-dd';
