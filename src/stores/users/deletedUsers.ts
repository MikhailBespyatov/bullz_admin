import axios, { CancelTokenSource } from 'axios';
import { defaultDeletedUsersValues } from 'constants/defaults/users';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
//import { message } from 'stores/alerts';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [loading, updateLoading] = initializeToggleStore();

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryDeletedUsersRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.adminUsers.getDeletedUsers(values, cancelToken.token);
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

const deletedUsers = createStore<BULLZ.QueryDeletedUsersResponse>({}).on(loadItems.doneData, (_, state) => state);

const updateValues = createEvent<BULLZ.QueryDeletedUsersRequest>();
const setDefaultValues = createEvent();

const values = createStore<BULLZ.QueryDeletedUsersRequest>(defaultDeletedUsersValues)
    .on(updateValues, (state, values: BULLZ.QueryDeletedUsersRequest) => ({
        ...state,
        ...values
    }))
    .on(setDefaultValues, () => defaultDeletedUsersValues);

forward({
    from: [values],
    to: [loadItems]
});

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

export const deletedUsersStores = {
    deletedUsers,
    values,
    loading,
    getRequestId
};

export const deletedUsersEvents = {
    updateValues,
    setDefaultValues,
    setId
};

export const deletedUsersEffects = {
    loadItems
};
