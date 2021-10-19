import axios, { CancelTokenSource } from 'axios';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultPlaylistVideosValues } from 'constants/defaults/videos';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { API } from 'services';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [initialLoading, updateInitialLoading] = initializeToggleStore();

const getItems = createEffect({
    handler: async (values: BULLZ.QueryAllVideosRequest) => {
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

const items = createStore<BULLZ.QueryPlaylistVideosResponse>({}).on(getItems.doneData, (_, newState) => newState);

const updateValues = createEvent<BULLZ.QueryPlaylistVideosRequestValues>();
const overrideValues = createEvent<BULLZ.QueryPlaylistVideosRequestValues>();
const invokeGetItems = createEvent();
const setDefaultValues = createEvent();

const values = createStore<BULLZ.QueryPlaylistVideosRequest>(defaultPlaylistVideosValues)
    .on(updateValues, (state, values: BULLZ.QueryPlaylistVideosRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(overrideValues, (_, values: BULLZ.QueryPlaylistVideosRequestValues) => ({
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
