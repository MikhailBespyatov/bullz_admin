import axios, { CancelTokenSource } from 'axios';
import { VideoCurateEditableFields } from 'components/layouts/cards/videos/VideoCard/types';
import { defaultPage } from 'constants/defaults/filterSettings';
import {
    defaultVideosValuesWithoutDate,
    sortModeTagsValuesDefault,
    sortTagsValuesDefault
} from 'constants/defaults/videos';
import { asyncError } from 'constants/notifications';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { Id } from 'types/data';
import { SortType } from 'types/types';

let cancelToken: CancelTokenSource | undefined;

const [initialLoading, updateInitialLoading] = initializeToggleStore();
const [loading, updateLoading] = initializeToggleStore();
const [editLoading, updateEditLoading] = initializeToggleStore();
const [removeLoading, updateRemoveLoading] = initializeToggleStore();

interface UpdateProps extends YEAY.AdminGetVideoResponse {}
interface UpdateCurationStateProps extends VideoCurateEditableFields, Id {}
const updateItemById = createEvent<UpdateProps>();
const updateCurationStateById = createEvent<UpdateCurationStateProps>();

const loadItems = createEffect({
    handler: async (values: YEAY.QueryAllVideosRequest) => {
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

const loadItemsByProductId = createEffect({
    handler: async (values: YEAY.QueryVideosByProductIdRequest) => {
        try {
            updateInitialLoading();
            const data = await API.adminVideos.getVideosByProductId(values);
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

const loadItemById = createEffect({
    handler: async (id: string) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data: YEAY.AdminGetVideoResponse = await API.adminVideos.getCardById(
                {
                    id: id
                },
                cancelToken.token
            );
            updateLoading();

            if (data)
                return {
                    currentPageIndex: 0,
                    items: [data],
                    totalPages: 1,
                    totalRecords: 1
                };

            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        } catch {
            updateLoading();
            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

const removeVideoFromItemsById = createEvent<string>();

const loadSingleItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data: YEAY.AdminGetVideoResponse = await API.adminVideos.getCardById({
                id: id
            });
            updateLoading();

            if (data) return data;

            return {};
        } catch {
            updateLoading();
            return {};
        }
    }
});

const loadEditInfoItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateEditLoading();
            const data: YEAY.AdminGetVideoResponse = await API.adminVideos.getCardById({
                id: id
            });
            updateEditLoading();

            if (data) return data;

            return {};
        } catch {
            updateEditLoading();
            return {};
        }
    }
});

interface UpdateVideoTagsProps {
    id: string;
    tags: string[];
}

const updateVideoTags = createEffect({
    handler: async (data: UpdateVideoTagsProps) => {
        try {
            updateLoading();
            const { id, tags } = data;
            await API.adminVideos.updateVideoInfo({
                id,
                tags
            });
            updateLoading();
            return {
                id,
                tags
            };
        } catch {
            updateLoading();
            return {};
        }
    }
});

const videosByProductId = createStore<YEAY.QueryAllVideosResponse>({}).on(
    loadItemsByProductId.doneData,
    (_, state) => state
);

const setSingleItem = createEvent<YEAY.AdminGetVideoResponse>();
const removeVideoFromItemById = createEvent<string>();

const editInfoItem = createStore<YEAY.AdminGetVideoResponse>({}).on(
    loadEditInfoItemById.doneData,
    (_, newState) => newState
);

const video = createStore<YEAY.AdminGetVideoResponse>({})
    .on(updateItemById, (state, { id, ...newValues }) =>
        state.id !== id
            ? state
            : {
                  ...state,
                  ...newValues
              }
    )
    .on(loadSingleItemById.doneData, (_, newState) => newState)
    .on(setSingleItem, (_, newState) => newState)
    .on(removeVideoFromItemById, (state, id) => (state.id === id ? { ...state, isDeleted: true } : state))
    .on(updateVideoTags.doneData, (state, { id, tags }) => (state.id === id ? { ...state, hashTags: tags } : state));

const videos = createStore<YEAY.QueryAllVideosResponse>({})
    .on(updateItemById, (state, { id, ...newValues }) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, ...newValues }))
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
    .on(loadItems.doneData, (_, newState) => newState)
    .on(loadItemById.doneData, (_, newState) => newState)
    .on(removeVideoFromItemsById, (state, id) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, isDeleted: true }))
    }))
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
    }));

const removeItemById = createEffect({
    handler: async (id: string) => {
        try {
            const {
                ownerId,
                facilitatorId,
                title,
                subtitle,
                primaryProductId,
                secondaryProductIds,
                audioLanguages,
                hashTags,
                validation
            } = editInfoItem.getState();

            updateRemoveLoading();
            await API.adminVideos.editVideoInfo({
                id,
                ownerId,
                facilitatorId,
                title: title || '',
                subtitle: subtitle || '',
                primaryProductId,
                secondaryProductIds: secondaryProductIds || [],
                audioLanguages: audioLanguages || [],
                hashTags: hashTags || [],
                videoCurationState: validation?.yeay?.curationState,
                isDeleted: true
            });
            updateRemoveLoading();

            removeVideoFromItemsById(id);
            removeVideoFromItemById(id);
            // message.success('Video successfully removed');
        } catch {
            updateRemoveLoading();
            message.error(asyncError);
        }
    }
});

const updateValues = createEvent<YEAY.QueryAllVideosRequestValues>();
// const overrideValues = createEvent<YEAY.QueryAllVideosRequestValues>();
const invokeGetItems = createEvent();
// const updateAndRemoveValues = createEvent<YEAY.UpdateAndRemoveValues>();
const setDefaultValues = createEvent();

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const setSortPrefix = createEvent<string>();
const setSortPostfix = createEvent<SortType>();

const sortPrefix = restore(setSortPrefix, sortTagsValuesDefault);
const sortPostfix = restore<SortType>(setSortPostfix, sortModeTagsValuesDefault);

const values = createStore<YEAY.QueryAllVideosRequest>(defaultVideosValuesWithoutDate)
    .on(updateValues, (state, values: YEAY.QueryAllVideosRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    // .on(overrideValues, (_, values: YEAY.QueryAllVideosRequestValues) => ({
    //     ...defaultVideosValues,
    //     ...values
    // }))
    // .on(updateAndRemoveValues, (state, values: YEAY.UpdateAndRemoveValues) => {
    //     let formerState = state;
    //     values.removeValues.forEach(
    //         //@ts-ignore
    //         key => formerState.hasOwnProperty(key) && delete formerState[key]
    //     );

    //     return { ...formerState, ...values.updateValues };
    // })
    .on(setDefaultValues, () => defaultVideosValuesWithoutDate /*defaultVideosValues*/)
    .on(invokeGetItems, state => state);

forward({
    from: [values],
    to: [loadItems]
});

const getWOMVideoDataById = createEffect({
    handler: async (id: string) => {
        try {
            const { items } = await API.adminVideos.getVideoWOMDataById({
                byRemoteId: id,
                pageIndex: 0,
                limit: 20,
                returnQueryCount: true
            });
            return items?.length ? items[0] : {};
        } catch {
            return {};
        }
    }
});

const videoWOMData = createStore<WOM.ContentItemResponse>({}).on(getWOMVideoDataById.doneData, (_, data) => data);

interface RequestDataProps {
    //userId?: string;
    videoId: string;
}

const getVideoDetailsByIds = createEffect({
    handler: async ({ videoId }: RequestDataProps) => {
        try {
            const getVideoDetailsResponse = await API.video.getVideoDetails({
                videoId
            });

            //console.log('Response', getVideoDetailsResponse.validation?.wom);

            const wom = getVideoDetailsResponse.validation?.wom || undefined;
            const primaryProduct = getVideoDetailsResponse?.primaryProduct || undefined;

            //console.log('{ wom, primaryProduct }', { wom, primaryProduct });
            //return getVideoDetailsResponse.validation?.wom || {};

            return { wom, primaryProduct };
        } catch {
            return {};
        }
    }
});

interface VideoDetailsProps {
    wom?: YEAY.VideoDetailsValidationWOM;
    primaryProduct?: YEAY.AffiliateProductResponse;
}

const videoDetails = restore<VideoDetailsProps>(getVideoDetailsByIds.doneData, {});

//const videoDetails = restore<YEAY.VideoDetailsValidationWOM>(getVideoDetailsByIds.doneData, {});

interface ValidationStateRequestProps {
    contentId?: string;
}

const getValidationStateByContentIds = createEffect({
    handler: async ({ contentId }: ValidationStateRequestProps) => {
        try {
            const validationStateResponse = await API.wom.getValidationState({
                contentId
            });

            //console.log('Response', getVideoDetailsResponse.validation?.wom);

            return validationStateResponse;
        } catch {
            return {};
        }
    }
});

const validationState = restore<YEAY.ValidationStateResponse>(getValidationStateByContentIds.doneData, {});

// const videoDetails = createStore<YEAY.VideoDetailsValidationWOM>({}).on(
//     getVideoDetailsByIds.doneData,
//     (_, data) => data
// );

// values.watch(updateValues, state => loadItems(state));
// values.watch(overrideValues, state => loadItems(state));
// values.watch(updateAndRemoveValues, state => loadItems(state));
// values.watch(setDefaultValues, state => loadItems(state));
// values.watch(setDefaultValues, state => loadItems(state));

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

export const videosEvents = {
    updateValues,
    // updateAndRemoveValues,
    setDefaultValues,
    setId,
    setIsFirstToFalse,
    setIsFirstToTrue,
    setSortPrefix,
    setSortPostfix,
    setSingleItem,
    updateItemById,
    updateCurationStateById,
    // overrideValues,
    removeVideoFromItemsById,
    invokeGetItems
};
export const videosEffects = {
    loadItemById,
    loadSingleItemById,
    loadItemsByProductId,
    loadItems,
    removeItemById,
    loadEditInfoItemById,
    updateVideoTags,
    getWOMVideoDataById,
    getVideoDetailsByIds,
    getValidationStateByContentIds
};
export const videosStores = {
    videos,
    video,
    videoWOMData,
    videoDetails,
    validationState,
    loading,
    getRequestId,
    videosByProductId,
    values,
    isFirst,
    sortPrefix,
    sortPostfix,
    removeLoading,
    initialLoading,
    editInfoItem,
    editLoading
};
