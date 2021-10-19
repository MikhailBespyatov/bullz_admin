import axios, { CancelTokenSource } from 'axios';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultProductVideosValues } from 'constants/defaults/videos';
import { createEffect, createEvent, createStore } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { videosEvents } from 'stores/videos/videos';

let cancelToken: CancelTokenSource | undefined;
interface UpdateProps extends BULLZ.AdminGetProductVideoResponse {}
const [initialLoading, updateInitialLoading] = initializeToggleStore();
const updateItemById = createEvent<UpdateProps>();
const updateLoading = createEvent();
const loading = createStore<boolean>(false).on(updateLoading, loading => !loading);

const getItems = createEffect({
    handler: async (values: BULLZ.QueryVideosByProductIdRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateInitialLoading();
            const data = await API.adminVideos.getVideosByProductId(values, cancelToken.token);
            updateInitialLoading();

            return data || {};
        } catch {
            updateInitialLoading();
            return {};
        }
    }
});

const items = createStore<BULLZ.QueryVideosByProductIdResponse>({})
    .on(updateItemById, (state, { id, ...newValues }) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, ...newValues }))
    }))
    .on(videosEvents.updateCurationStateById, (state, { id, curationState }) => ({
        ...state,
        items: state?.items?.map(i =>
            i.id !== id
                ? i
                : {
                      ...i,
                      validation: {
                          ...i?.validation,
                          yeay: {
                              ...i?.validation?.yeay,
                              curationState: curationState
                          }
                      }
                  }
        )
    }))
    .on(getItems.doneData, (_, newState) => newState)
    .on(videosEvents.removeVideoFromItemsById, (state, id) => ({
        ...state,
        items: state?.items?.filter(i => i.id !== id)
    }));

const updateValues = createEvent<BULLZ.QueryVideosByProductIdRequestValues>();
const setDefaultValues = createEvent();

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

// values store keeps request values,
// after updating or removing some fields of the values,
// watcher initiate getItems request due the new values
// (old fields of values are not removed if they are not pointed as remove values in removeAndUpdateValues event)
const values = createStore<BULLZ.QueryVideosByProductIdRequest>(defaultProductVideosValues)
    .on(updateValues, (state, values: BULLZ.QueryVideosByProductIdRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(setDefaultValues, () => defaultProductVideosValues);
values.watch(updateValues, state => getItems(state));
values.watch(setDefaultValues, state => getItems(state));

export const productVideosEvents = {
    updateValues,
    setDefaultValues,
    setIsFirstToFalse,
    setIsFirstToTrue
};
export const productVideosEffects = {};
export const productVideosStores = { items, initialLoading, loading, isFirst, values };
