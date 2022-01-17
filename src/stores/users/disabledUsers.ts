import axios, { CancelTokenSource } from 'axios';
import { defaultDisabledUsersValues } from 'constants/defaults/users';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
//import { message } from 'stores/alerts';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [loading, updateLoading] = initializeToggleStore();

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryDisabledUsersRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.adminUsers.getBlockedUsers(values, cancelToken.token);
            updateLoading();

            return data;
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

const blockedUsers = createStore<BULLZ.QueryDisabledUsersResponse>({}).on(loadItems.doneData, (_, state) => state);

const updateValues = createEvent<BULLZ.QueryDisabledUsersRequest>();
const setDefaultValues = createEvent();

const values = createStore<BULLZ.QueryDisabledUsersRequest>(defaultDisabledUsersValues)
    .on(updateValues, (state, values: BULLZ.QueryDisabledUsersRequest) => ({
        ...state,
        ...values
    }))
    .on(setDefaultValues, () => defaultDisabledUsersValues);

forward({
    from: [values],
    to: [loadItems]
});

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

export const blockedUsersStores = {
    blockedUsers,
    values,
    loading,
    getRequestId
};

export const blockedUsersEvents = {
    updateValues,
    setDefaultValues,
    setId
};

export const blockedUsersEffects = {
    loadItems
};
