import { CancelToken } from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
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

interface GetBigQueryProps {
    value: BULLZ.BigQueryUsersRequest;
    cancelToken?: CancelToken;
}

const getBigQuery = createEffect({
    handler: async ({ value, cancelToken }: GetBigQueryProps) => {
        try {
            const data = await API.superAdmin.getBigQuery(value, cancelToken);

            if (data.items) {
                return data.items;
            } else {
                return [];
            }
        } catch {
            return [];
        }
    }
});

const resetBigQuery = createEvent();

const bigQueryCount = createStore<BULLZ.CountQueryResponse>({}).on(
    getBigQueryCount.doneData,
    (_, newState) => newState
);

const bigQuery = createStore<BULLZ.BigQueryUserResponse[]>([])
    .on(getBigQuery.doneData, (state, newState) => [...state, ...newState])
    .on(resetBigQuery, () => []);

export const superAdminEvents = { resetBigQuery, updateLoading };

export const superAdminStores = {
    bigQueryCount,
    loading,
    bigQuery
};

export const superAdminEffects = {
    getBigQueryCount,
    getBigQuery
};
