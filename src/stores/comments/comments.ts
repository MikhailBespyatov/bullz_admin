import axios, { CancelTokenSource } from 'axios';
import { defaultCommentsValues } from 'constants/defaults/comments';
import { combine, createEffect, createEvent, createStore, forward } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const { isFirst, setIsFirstToTrue, setIsFirstToFalse } = initializeIsFirstStore();

const updateValues = createEvent<YEAY.AdminQueryPostsRequestWithoutPageLimit>();
const setDefaultValues = createEvent();
const invokeGetComments = createEvent();

const values = createStore<YEAY.AdminQueryPostsRequest>(defaultCommentsValues)
    .on(invokeGetComments, state => state)
    .on(updateValues, (state, values) => ({ ...state, ...values }))
    .on(setDefaultValues, () => defaultCommentsValues);

const [loadingComments, updateLoadingComments] = initializeToggleStore();

const loadComments = createEffect({
    handler: async (value: YEAY.AdminQueryPostsRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoadingComments();
            const commentsResponse = await API.adminVideos.queryComments(value, cancelToken.token);
            updateLoadingComments();

            return commentsResponse;
        } catch {
            updateLoadingComments();
            return {
                totalRecords: 0
            };
        }
    }
});

const comments = createStore<YEAY.AdminQueryPostsResponse>({}).on(
    loadComments.doneData,
    (_, queryResponse) => queryResponse
);

forward({
    from: [values],
    to: [loadComments]
});

values.watch(invokeGetComments, state => loadComments(state));

const commentsStore = combine(loadingComments, comments);

export const commentsStores = {
    commentsStore,
    comments,
    isFirst,
    values
};

export const commentsEvents = {
    setIsFirstToFalse,
    setIsFirstToTrue,
    invokeGetComments,
    updateValues,
    setDefaultValues
};

export const commentsEffects = {
    loadComments
};
