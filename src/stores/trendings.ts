import { message } from 'antd';
import { defaultTrendingsValues } from 'constants/defaults/trendings';
import { asyncError, swapSuccessMessage } from 'constants/notifications';
import { combine, createEffect, createEvent, createStore } from 'effector';
import { API } from 'services';
import {
    createTagTrendingModal,
    createTrendingVideoModal,
    createUserTrendingModal,
    CreateVideoProps,
    RemoveTrendingModal,
    removeTrendingModal
} from 'stores/initialize/initialize.modal.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { Id } from 'types/data';
import { sortTrending } from 'utils/filters';
import { parseCreateTrendingVideoPosition } from 'utils/parsers';

const [loadingTags, updateLoadingTags] = initializeToggleStore();
const [loadingVideos, updateLoadingVideos] = initializeToggleStore();
const [loadingUsers, updateLoadingUsers] = initializeToggleStore();
const [removeLoading, updateRemoveLoading] = initializeToggleStore();
const [createLoading, updateCreateLoading] = initializeToggleStore();

const getTags = createEffect({
    handler: async () => {
        try {
            updateLoadingTags();
            const data = await API.trendings.getTrendings(defaultTrendingsValues);
            updateLoadingTags();

            return data;
        } catch {
            updateLoadingTags();
            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

const getVideos = createEffect({
    handler: async () => {
        try {
            updateLoadingVideos();
            const data = await API.trendings.getTrendings({ ...defaultTrendingsValues, type: 200 });
            updateLoadingVideos();

            return data;
        } catch {
            updateLoadingVideos();
            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

const getUsers = createEffect({
    handler: async () => {
        try {
            updateLoadingUsers();
            const data = await API.trendings.getTrendings({ ...defaultTrendingsValues, type: 300 });
            updateLoadingUsers();

            return data;
        } catch {
            updateLoadingUsers();
            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

const removeItem = createEffect({
    handler: async ({ id = '', subject = 'tag', subjectName = '' }: RemoveTrendingModal) => {
        try {
            updateRemoveLoading();
            await API.trendings.removeItemById({ id });
            updateRemoveLoading();

            subject === 'tag' ? getTags() : subject === 'video' ? getVideos() : getUsers();
            removeTrendingModal.closeModal();
            message.success(subject + ' ' + subjectName + ' successfully deleted');
        } catch {
            updateRemoveLoading();
            message.error(asyncError);
        }
    }
});

const removeDuplicatedItem = createEffect({
    handler: async ({ id = '' }: RemoveTrendingModal) => {
        try {
            updateRemoveLoading();
            await API.trendings.removeItemById({ id });
            updateRemoveLoading();
        } catch {
            updateRemoveLoading();
            //console.log('error with removing duplicated item', id);
        }
    }
});

const setTags = createEvent<YEAY.QueryTrendingOverridesResponse>();
const setVideos = createEvent<YEAY.QueryTrendingOverridesResponse>();
const setUsers = createEvent<YEAY.QueryTrendingOverridesResponse>();
const tags = createStore<YEAY.QueryTrendingOverridesResponse>({}).on([getTags.doneData, setTags], (_, newState) => ({
    ...newState,
    items: sortTrending(newState?.items || [])
}));
const videos = createStore<YEAY.QueryTrendingOverridesResponse>({}).on(
    [getVideos.doneData, setVideos],
    (_, newState) => ({
        ...newState,
        items: sortTrending(newState?.items || [])
    })
);
const users = createStore<YEAY.QueryTrendingOverridesResponse>({}).on([getUsers.doneData, setUsers], (_, newState) => ({
    ...newState,
    items: sortTrending(newState?.items || [])
}));
// !!! this console.log is necessary to check validity so far
videos.watch(state => {
    //console.log('STORE video items', state?.items);
    state?.items?.map(item => console.log('position:', (item?.position || 0) + 1, 'id:', item?.id));
});

const createItem = createEffect({
    handler: async ({ text = '', videoId = '', userId = '' }) => {
        try {
            let position = 0;
            text
                ? (position = tags.getState()?.items?.length || 0)
                : videoId
                ? (position = videos.getState()?.items?.length || 0)
                : (position = users.getState()?.items?.length || 0);

            updateCreateLoading();
            await API.trendings.createTrending({
                type: text ? 100 : videoId ? 200 : 300,
                tag: text || undefined,
                targetId: videoId || userId || undefined,
                position
            });
            updateCreateLoading();

            if (text) {
                getTags();
                createTagTrendingModal.closeModal();
            } else if (videoId) {
                getVideos();
                createTrendingVideoModal.closeModal();
            } else {
                getUsers();
                createUserTrendingModal.closeModal();
            }
            removeTrendingModal.closeModal();
            message.success('trending successfully created');
        } catch {
            updateCreateLoading();
            message.error(asyncError);
        }
    }
});

interface CreateTrendingVideoProps extends Id, CreateVideoProps {}

const createVideo = createEffect({
    handler: async ({ id, definedPosition }: CreateTrendingVideoProps) => {
        try {
            updateCreateLoading();
            const items = videos.getState().items;
            const existedVideo = items?.find(({ video }) => video?.videoId === id);

            if (existedVideo) {
                createTrendingVideoModal.closeModal();
                message.error(
                    'sorry this video is already in trendings, position ' + ((existedVideo?.position || 0) + 1)
                );
                updateCreateLoading();
                return;
            }

            // console.log(
            //     'Store create video position',
            //     parseCreateTrendingVideoPosition(videos.getState().items, definedPosition)
            // );

            await API.trendings.createTrending({
                type: 200,
                targetId: id,
                position: parseCreateTrendingVideoPosition(videos.getState().items, definedPosition)
            });
            updateCreateLoading();

            getVideos();
            createTrendingVideoModal.closeModal();
            message.success('trending successfully created');
        } catch {
            updateCreateLoading();
            message.error(asyncError);
        }
    }
});

interface SwapIndices {
    i: number;
    j: number;
}

const swapAndUpdateTags = createEffect({
    handler: async ({ i, j }: SwapIndices) => {
        try {
            updateLoadingTags();
            const items = tags.getState()?.items || [];
            const firstElement = items.find((_, index) => index === i);
            const secondElement = items.find((_, index) => index === j);
            await API.trendings.updateItemById({ id: firstElement?.id || '', position: j });
            await API.trendings.updateItemById({ id: secondElement?.id || '', position: i });
            const data = await API.trendings.getTrendings(defaultTrendingsValues);
            updateLoadingTags();

            message.success(swapSuccessMessage);
            setTags(data);
        } catch {
            updateLoadingTags();
            message.error(asyncError);
        }
    }
});

const swapAndUpdateUsers = createEffect({
    handler: async ({ i, j }: SwapIndices) => {
        try {
            updateLoadingUsers();
            const items = users.getState()?.items || [];
            const firstElement = items.find((_, index) => index === i);
            const secondElement = items.find((_, index) => index === j);
            await API.trendings.updateItemById({ id: firstElement?.id || '', position: j });
            await API.trendings.updateItemById({ id: secondElement?.id || '', position: i });
            const data = await API.trendings.getTrendings({ ...defaultTrendingsValues, type: 300 });
            updateLoadingUsers();

            message.success(swapSuccessMessage);
            setUsers(data);
        } catch {
            updateLoadingUsers();
            message.error(asyncError);
            return {
                totalPages: 0
            };
        }
    }
});

const swapAndUpdateVideos = createEffect({
    handler: async ({ i, j }: SwapIndices) => {
        try {
            updateLoadingVideos();
            const items = videos.getState()?.items || [];
            const firstElement = items.find(item => item.position === i);
            const secondElement = items.find(item => item.position === j);
            if (firstElement?.position === i) {
                if (secondElement?.position === j) {
                    await API.trendings.updateItemById({ id: firstElement?.id || '', position: j });
                    await API.trendings.updateItemById({ id: secondElement?.id || '', position: i });
                } else await API.trendings.updateItemById({ id: firstElement?.id || '', position: j });
            } else await API.trendings.updateItemById({ id: secondElement?.id || '', position: i });
            const data = await API.trendings.getTrendings({ ...defaultTrendingsValues, type: 200 });
            updateLoadingVideos();

            message.success(swapSuccessMessage);
            setVideos(data);
        } catch {
            updateLoadingVideos();
            message.error(asyncError);
        }
    }
});

const tagsStore = combine(loadingTags, tags);
const videosStore = combine(loadingVideos, videos);
const usersStore = combine(loadingUsers, users);

export const trendingsEvents = {};
export const trendingsEffects = {
    getTags,
    getVideos,
    getUsers,
    removeItem,
    removeDuplicatedItem,
    createItem,
    swapAndUpdateTags,
    swapAndUpdateUsers,
    swapAndUpdateVideos,
    createVideo
};
export const trendingsStores = { tagsStore, videosStore, usersStore, removeLoading, createLoading };
