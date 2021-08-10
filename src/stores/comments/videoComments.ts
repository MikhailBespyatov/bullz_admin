import axios, { CancelTokenSource } from 'axios';
import { defaultVideoCommentRepliesValues, defaultVideoCommentsValues } from 'constants/defaults/comments';
import { combine, createEffect, createEvent, createStore, forward } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const { isFirst, setIsFirstToTrue, setIsFirstToFalse } = initializeIsFirstStore();

const updateCommentValues = createEvent<YEAY.QueryPostsRequest>();
const setDefaultCommentValues = createEvent();
const invokeGetComments = createEvent();

const updateCommentRepliesValues = createEvent<YEAY.QueryRepliesRequest>();
const setDefaultCommentRepliesValues = createEvent();
const invokeGetCommentReplies = createEvent();

const commentValues = createStore<YEAY.QueryPostsRequest>(defaultVideoCommentsValues)
    .on(invokeGetComments, state => state)
    .on(updateCommentValues, (state, values) => ({ ...state, ...values }))
    .on(setDefaultCommentValues, () => defaultVideoCommentsValues);

const commentRepliesValues = createStore<YEAY.QueryRepliesRequest>(defaultVideoCommentRepliesValues)
    .on(invokeGetCommentReplies, state => state)
    .on(updateCommentRepliesValues, (state, values) => ({ ...state, ...values }))
    .on(setDefaultCommentRepliesValues, () => defaultVideoCommentRepliesValues);

//export const [commentPagination, updateCommentPagination] = initializeToggleStore();
export const updateCommentPaginationState = createEvent();
export const commentPaginationState = createStore(false).on(updateCommentPaginationState, state => !state);

const [loadingVideoComments, updateLoadingVideoComments] = initializeToggleStore();

const loadVideoComments = createEffect({
    handler: async (commentValues: YEAY.QueryPostsRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoadingVideoComments();
            const videoCommentsResponse = await API.video.getVideoComments(commentValues, cancelToken.token);
            updateLoadingVideoComments();

            // console.log('videoCommentsResponse ', videoCommentsResponse);

            return videoCommentsResponse;
        } catch {
            updateLoadingVideoComments();

            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

export const blockVideoCommentsForUser = createEffect({
    handler: async (values: YEAY.BlockUserRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoadingVideoComments();
            const blockVideoCommentsForUserResponse = await API.video.blockVideoCommentsForUser(
                values,
                cancelToken.token
            );
            updateLoadingVideoComments();

            return blockVideoCommentsForUserResponse;
        } catch {
            updateLoadingVideoComments();

            return {
                isSuccess: false
            };
        }
    }
});

export const loadVideoCommentReplies = createEffect({
    handler: async (commentRepliesValues: YEAY.QueryRepliesRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            const videoCommentRepliesResponse = await API.video.getVideoCommentReplies(commentRepliesValues);

            //console.log('RepliesResponse', videoCommentRepliesResponse);

            return videoCommentRepliesResponse;
        } catch {
            return {
                totalRecords: 0
            };
        }
    }
});

export const clearVideoCommentReplies = createEffect((parenId: string) => parenId);

forward({
    from: [commentValues],
    to: [loadVideoComments]
});

interface Item extends YEAY.GetPostResponse {
    replies?: YEAY.GetPostResponse[] | null;
}

export interface QueryPostsResponseExtended
    extends Pick<YEAY.QueryPostsResponse, 'queryStatistics' | 'totalRecords' | 'returnedRecords'> {
    items?: Item[] | null;
}

forward({
    from: [commentRepliesValues],
    to: [loadVideoCommentReplies]
});

//const videoComments = restore<QueryPostsResponseExtended>(loadVideoComments.doneData, {});

const videoComments = createStore<QueryPostsResponseExtended>({})
    .on(loadVideoComments.doneData, (_, queryResponse) => queryResponse)
    .on(loadVideoCommentReplies.doneData, (commentsStore, { items }) => ({
        ...commentsStore,
        items: commentsStore?.items?.map(comment => {
            if (comment.id === items?.[0].parentId) {
                if (comment.replies && items) {
                    return { ...comment, replies: [...comment?.replies, ...items] };
                } else {
                    return { ...comment, replies: items };
                }
            }

            return comment;
        })
    }))
    .on(clearVideoCommentReplies, (commentsStore, parentId) => ({
        ...commentsStore,
        items: commentsStore.items?.map(comment => {
            if (comment.id === parentId) return { ...comment, replies: [] };
            return comment;
        })
    }));

// commentValues.watch(state => {
//     console.log('state__', state);

//     loadVideoComments(state);
// });

const videoCommentsStore = combine(loadingVideoComments, videoComments);

export const videoCommentsStores = {
    videoCommentsStore,
    videoComments,
    commentValues,
    isFirst
};

export const videoCommentsEvents = {
    setIsFirstToFalse,
    setIsFirstToTrue,
    invokeGetComments,
    updateCommentValues,
    setDefaultCommentValues,
    invokeGetCommentReplies,
    updateCommentRepliesValues,
    setDefaultCommentRepliesValues
};

export const videoCommentsEffects = {
    loadVideoComments,
    blockVideoCommentsForUser
};
