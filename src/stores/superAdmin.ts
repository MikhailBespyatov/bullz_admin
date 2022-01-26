import { createEffect, createStore } from 'effector';
import { API } from 'services';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

const [loading, updateLoading] = initializeToggleStore();

const getBigQueryCount = createEffect({
    handler: async (value: BULLZ.CountQueryUsersRequest) => {
        try {
            updateLoading();
            const data = await API.superAdmin.getBigQueryCount(value);
            updateLoading();

            return data;
        } catch {
            updateLoading();

            return {};
        }
    }
});

const getBigQuery = createEffect({
    handler: async (value: BULLZ.BigQueryUsersRequest) => {
        try {
            updateLoading();
            const data = await API.superAdmin.getBigQuery(value);
            updateLoading();

            return data;
        } catch {
            updateLoading();

            return {};
        }
    }
});

const bigQueryCount = createStore<BULLZ.CountQueryResponse>({}).on(
    getBigQueryCount.doneData,
    (_, newState) => newState
);

const bigQuery = createStore<BULLZ.BigQueryUsersResponse>({}).on(getBigQuery.doneData, (_, newState) => newState);

export const superAdminStores = {
    bigQueryCount,
    loading,
    bigQuery
};

export const superAdminEffects = {
    getBigQueryCount,
    getBigQuery
};
