import axios, { CancelTokenSource } from 'axios';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultPlaylistVideosValues } from 'constants/defaults/videos';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { API } from 'services';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [initialLoading, updateInitialLoading] = initializeToggleStore();

const getItems = createEffect({
    handler: async (values: YEAY.QueryAllVideosRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateInitialLoading();
            const data = await API.playlist.queryByFilter(values, cancelToken.token);
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

const items = createStore<YEAY.QueryPlaylistVideosResponse>({}).on(getItems.doneData, (_, newState) => newState);

const updateValues = createEvent<YEAY.QueryPlaylistVideosRequestValues>();
const overrideValues = createEvent<YEAY.QueryPlaylistVideosRequestValues>();
const invokeGetItems = createEvent();
const setDefaultValues = createEvent();

const values = createStore<YEAY.QueryPlaylistVideosRequest>(defaultPlaylistVideosValues)
    .on(updateValues, (state, values: YEAY.QueryPlaylistVideosRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(overrideValues, (_, values: YEAY.QueryPlaylistVideosRequestValues) => ({
        ...defaultPlaylistVideosValues,
        ...values
    }))
    .on(setDefaultValues, () => defaultPlaylistVideosValues)
    .on(invokeGetItems, state => state);

forward({
    from: [values],
    to: [getItems]
});

values.watch(invokeGetItems, state => getItems(state));

export const playlistEvents = {
    updateValues,
    setDefaultValues,
    overrideValues,
    invokeGetItems
};
export const playlistEffects = {
    getItems
};
export const playlistStores = {
    items,
    values,
    initialLoading
};
