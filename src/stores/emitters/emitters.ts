import axios, { CancelTokenSource } from 'axios';
import { defaultEmittersValues } from 'constants/defaults/emitters';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from '../initialize/initialize.toggle.store';

const [loading, updateLoading] = initializeToggleStore();

let cancelToken: CancelTokenSource | undefined;

const loadItems = createEffect({
    handler: async (count: number) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.adminUsers.getEmitters({ count });
            updateLoading();
            console.log(data);

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

const loadItemById = createEffect({
    handler: async (id: string) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data: BULLZ.AdminGetUserCommon = await API.adminUsers.getUserById(
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

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const updateValues = createEvent<BULLZ.QueryAllUsersRequestValues>();
const invokeGetEmitters = createEvent();
const setDefaultValues = createEvent();

const values = createStore<any>(defaultEmittersValues)
    .on(updateValues, (_, count) => count)
    .on(invokeGetEmitters, state => state)
    .on(setDefaultValues, () => defaultEmittersValues);

forward({
    from: [values],
    to: [loadItems]
});

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

const emitters = createStore<any>([]).on(loadItems.doneData, (_, state) => state);

export const emittersEvents = {
    invokeGetEmitters,
    setDefaultValues,
    setId,
    setIsFirstToFalse,
    setIsFirstToTrue,
    updateValues
};

export const emittersEffects = { loadItems, loadItemById };

export const emittersStores = { emitters, loading, values, getRequestId, isFirst };
