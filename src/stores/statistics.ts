import { differenceInDays, set } from 'date-fns';
import { createEffect, createEvent, createStore, restore } from 'effector';
import { addDaysToIsoString, defaultNextDateRangeRequest } from 'pages/Dashboard/constants';
import { API } from 'services';
import { getDateAfterAndReturnISO } from 'utils/parsers';

const setNextDateRange = createEvent<[string, string]>();

const getActivityStatistics = createEffect({
    handler: async ({ utcEnd, utcStart }: Required<BULLZ.CreateMarketingStatisticsRequest>) => {
        try {
            //normalizing Date because React DatePicker library setting bad data
            const requestedData: BULLZ.CreateMarketingStatisticsRequest = {
                utcStart: set(new Date(utcStart), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toISOString(),
                utcEnd: set(new Date(utcEnd), { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }).toISOString()
            };

            setNextDateRange([utcStart, utcEnd]);

            const activityStatisticsData = await API.statistics.getActivity(requestedData);

            const differenceInSelectedDays = differenceInDays(new Date(utcEnd), new Date(utcStart)) + 1;

            setNextDateRange([
                addDaysToIsoString(utcStart, differenceInSelectedDays),
                addDaysToIsoString(utcEnd, differenceInSelectedDays)
            ]);

            return { ...activityStatisticsData, utcEnd, utcStart };
        } catch {
            return {};
        }
    }
});

const clearStatistics = createEvent();

const removeActivityStatistics = createEvent<number>();

const activityStatistics = createStore<BULLZ.MarketingStatistics[]>([])
    .on(getActivityStatistics.doneData, (statistics, newStatistics) => [...statistics, newStatistics])
    .on(removeActivityStatistics, (statistics, removeNumber) => statistics.filter((_, i) => i !== removeNumber))
    .on(clearStatistics, () => []);

const nextDateRange = restore<[string, string]>(setNextDateRange, defaultNextDateRangeRequest).on(
    removeActivityStatistics,
    () => {
        const lastActivityStatistics = activityStatistics.getState()[activityStatistics.getState().length - 1];
        const utcEnd = lastActivityStatistics.utcEnd || getDateAfterAndReturnISO(1);
        const utcStart = lastActivityStatistics.utcStart || getDateAfterAndReturnISO(8);

        //normalizing Date because React DatePicker library setting bad data
        const differenceInSelectedDays = differenceInDays(
            set(new Date(utcEnd), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
            set(new Date(utcStart), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        );

        return [
            addDaysToIsoString(utcStart, differenceInSelectedDays + 1),
            addDaysToIsoString(utcEnd, differenceInSelectedDays + 1)
        ];
    }
);

const setCountStatistics = createEvent<number>();

const countStatistics = createStore(0)
    .on(setCountStatistics, (_, newCount) => newCount)
    .on(getActivityStatistics.doneData, count => count + 1)
    .on(clearStatistics, _ => 0)
    .on(removeActivityStatistics, count => count - 1);

const reloadStatistics = createEffect({
    handler: async ({ utcEnd, utcStart }: Required<BULLZ.CreateMarketingStatisticsRequest>) => {
        const count = countStatistics.getState();
        await clearStatistics();
        for (let i = 0; i < count; i++) {
            //normalizing Date because React DatePicker library setting bad data
            const differenceInSelectedDays = differenceInDays(
                set(new Date(utcEnd), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
                set(new Date(utcStart), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
            );
            const extendedDays = (differenceInSelectedDays + 1) * i;

            await getActivityStatistics({
                utcEnd: addDaysToIsoString(utcEnd, extendedDays),
                utcStart: addDaysToIsoString(utcStart, extendedDays)
            });

            if (i === count - 1) {
                setNextDateRange([
                    addDaysToIsoString(utcStart, (differenceInSelectedDays + 1) * count),
                    addDaysToIsoString(utcEnd, (differenceInSelectedDays + 1) * count)
                ]);
            }
        }
    }
});

export const statisticsStores = { activityStatistics, nextDateRange, countStatistics };
export const statisticsEffects = { getActivityStatistics, reloadStatistics };
export const statisticsEvents = { removeActivityStatistics, clearStatistics, setNextDateRange, setCountStatistics };
