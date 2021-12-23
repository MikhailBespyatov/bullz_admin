import axios, { CancelTokenSource } from 'axios';
import { defaultPage } from 'constants/defaults/filterSettings';
import {
    defaultUserVideosValuesWithoutDate,
    sortModeTagsValuesDefault,
    sortTagsValuesDefault
} from 'constants/defaults/users';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { videosEffects, videosEvents } from 'stores/videos/videos';
import { SortType } from 'types/types';

let cancelToken: CancelTokenSource | undefined;

const [initialLoading, updateInitialLoading] = initializeToggleStore();

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryAllVideosRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateInitialLoading();
            const data = await API.adminVideos.getCards(values, cancelToken.token);
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

const { updateVideoTags } = videosEffects;
const { updateCurationStateById, removeVideoFromItemsById } = videosEvents;

const userVideos = createStore<BULLZ.QueryAllVideosResponse>({})
    .on(loadItems.doneData, (_, newState) => newState)
    .on(updateVideoTags.doneData, (state, { id, tags }) => ({
        ...state,
        items: state.items?.map(video =>
            video.id === id
                ? {
                      ...video,
                      hashTags: tags
                  }
                : video
        )
    }))
    .on(updateCurationStateById, (state, { id, curationState, curationEndedReason }) => ({
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
                              curationState: curationState,
                              curationEndedReason: curationEndedReason || i?.validation?.yeay?.curationEndedReason
                          }
                      }
                  }
        )
    }))
    .on(removeVideoFromItemsById, (state, id) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, isDeleted: true }))
    }));

const updateValues = createEvent<BULLZ.QueryAllVideosRequestValues>();

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const setSortPrefix = createEvent<string>();
const setSortPostfix = createEvent<SortType>();

const sortPrefix = restore(setSortPrefix, sortTagsValuesDefault);
const sortPostfix = restore<SortType>(setSortPostfix, sortModeTagsValuesDefault);

const values = createStore<BULLZ.QueryAllVideosRequest>(defaultUserVideosValuesWithoutDate).on(
    updateValues,
    (state, values: BULLZ.QueryAllVideosRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    })
);
forward({
    from: [values],
    to: [loadItems]
});

export const userVideosEvents = {
    updateValues,
    setIsFirstToFalse,
    setIsFirstToTrue,
    setSortPrefix,
    setSortPostfix
};
export const userVideosEffects = {
    loadItems
};
export const userVideosStores = {
    userVideos,
    values,
    isFirst,
    sortPrefix,
    sortPostfix,
    initialLoading
};
