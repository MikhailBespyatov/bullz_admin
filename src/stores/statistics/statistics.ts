import axios, { CancelTokenSource } from 'axios';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { API } from 'services';
import { defaultStatisticsValues } from 'constants/defaults/statistics';
import { defaultPage } from 'constants/defaults/filterSettings';

let cancelToken: CancelTokenSource | undefined;

const updateInitialLoading = createEvent();
const setInitialLoading = createEvent<boolean>();
const initialLoading = createStore<boolean>(false)
    .on(updateInitialLoading, state => !state)
    .on(setInitialLoading, (_, state) => state);

const updateLoading = createEvent();
const loading = createStore(false).on(updateLoading, loading => !loading);

const updateEditLoading = createEvent();
const editLoading = createStore(false).on(updateLoading, loading => !loading);

const loadItems = createEffect({
    handler: async (values: YEAY.QueryVideoStatisticsRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateInitialLoading();
            const data = await API.adminVideos.getVideosStatistics(values, cancelToken.token);
            updateInitialLoading();

            return data;
        } catch {
            updateInitialLoading();
            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

const statistics = createStore<YEAY.QueryVideoStatisticsResponse>({}).on(loadItems.doneData, (_, newState) => newState);

const updateValues = createEvent<Partial<YEAY.QueryVideoStatisticsRequest>>();
const overrideValues = createEvent<Partial<YEAY.QueryVideoStatisticsRequest>>();
const invokeGetItems = createEvent();
const setDefaultValues = createEvent();
//
// const setSortPrefix = createEvent<string>();
// const setSortPostfix = createEvent<string>();
//
// const sortPrefix = createStore<string>(sortTagsValuesDefault).on(setSortPrefix, (_, newState) => newState);
// const sortPostfix = createStore<string>(sortModeTagsValuesDefault).on(setSortPostfix, (_, newState) => newState);

const values = createStore<YEAY.QueryVideoStatisticsRequest>(defaultStatisticsValues)
    .on(updateValues, (state, values: Partial<YEAY.QueryVideoStatisticsRequest>) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(overrideValues, (_, values: Partial<YEAY.QueryVideoStatisticsRequest>) => ({
        ...defaultStatisticsValues,
        ...values
    }))
    //set default values before get statistics info
    .on(setDefaultValues, () => ({ ...defaultStatisticsValues }))
    .on(invokeGetItems, state => state);

forward({
    from: [values],
    to: [loadItems]
});

values.watch(invokeGetItems, state => loadItems(state));

const setId = createEvent<string>();
const getRequestId = createStore<string>('').on(setId, (_, id) => id);

const updateIsFirst = createEvent();
const setIsFirstToTrue = createEvent();
const isFirst = createStore<boolean>(true)
    .on(updateIsFirst, state => !state)
    .on(setIsFirstToTrue, () => true);

export const statisticsStores = { statistics, values, initialLoading, loading, editLoading, isFirst, getRequestId };
export const statisticsEvents = {
    updateEditLoading,
    updateValues,
    overrideValues,
    setDefaultValues,
    invokeGetItems,
    updateIsFirst,
    setIsFirstToTrue,
    setId
};
export const statisticsEffects = { loadItems };
