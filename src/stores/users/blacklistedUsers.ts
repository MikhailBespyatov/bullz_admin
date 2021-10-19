import axios, { CancelTokenSource } from 'axios';
import { defaultBlacklistedUsersValues } from 'constants/defaults/users';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
//import { message } from 'stores/alerts';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [loading, updateLoading] = initializeToggleStore();

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryBlacklistedUsersRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.adminUsers.getBlacklistedUsers(values, cancelToken.token);
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

const blacklistedUsers = createStore<BULLZ.QueryBlacklistedUsersResponse>({}).on(
    loadItems.doneData,
    (_, state) => state
);

const updateValues = createEvent<BULLZ.QueryBlacklistedUsersRequest>();
const setDefaultValues = createEvent();

const values = createStore<BULLZ.QueryBlacklistedUsersRequest>(defaultBlacklistedUsersValues)
    .on(updateValues, (state, values: BULLZ.QueryBlacklistedUsersRequest) => ({
        ...state,
        ...values
    }))
    .on(setDefaultValues, () => defaultBlacklistedUsersValues);

forward({
    from: [values],
    to: [loadItems]
});

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

export const blacklistedUsersStores = {
    blacklistedUsers,
    values,
    loading,
    getRequestId
};

export const blacklistedUsersEvents = {
    updateValues,
    setDefaultValues,
    setId
};
