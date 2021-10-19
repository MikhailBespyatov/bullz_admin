import axios, { CancelTokenSource } from 'axios';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultProductsValues } from 'constants/defaults/products';
import { createEffect, createEvent, createStore, restore } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [loading, updateLoading] = initializeToggleStore();

const updateVisible = createEvent();
const setVisibleToFalse = createEvent();
const visible = createStore(false)
    .on(updateVisible, state => !state)
    .on(setVisibleToFalse, () => false);

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryTopicsRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.manageProducts.getProducts(values, cancelToken.token);
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

const loadItemById = createEffect({
    handler: async (id: string) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.manageProducts.getProductById(
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

const products = createStore<BULLZ.TopicsResponse>({})
    .on(loadItems.doneData, (_, state) => state)
    .on(loadItemById.doneData, (_, state) => state);

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const updateValues = createEvent<Partial<BULLZ.QueryTopicsRequest>>();
const setDefaultValues = createEvent();

const values = createStore<BULLZ.QueryTopicsRequest>(defaultProductsValues)
    .on(updateValues, (state, values) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(setDefaultValues, () => defaultProductsValues);
values.watch(updateValues, state => loadItems(state));
values.watch(setDefaultValues, state => loadItems(state));

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

export const selectProductsEvents = {
    updateValues,
    setDefaultValues,
    setId,
    setIsFirstToTrue,
    setIsFirstToFalse,
    updateVisible,
    setVisibleToFalse
};
export const selectProductsEffects = { loadItemById };
export const selectProductsStores = { products, loading, getRequestId, isFirst, values, visible };
