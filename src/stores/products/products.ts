import axios, { CancelTokenSource } from 'axios';
import history from 'browserHistory';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultProductsValues } from 'constants/defaults/products';
import { asyncError } from 'constants/notifications';
import { topicsLink } from 'constants/routes';
import { createEffect, createEvent, createStore, restore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeErrorStore } from 'stores/initialize/initialize.error.store';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;

const [initialLoading, updateInitialLoading] = initializeToggleStore();
const [loading, updateLoading] = initializeToggleStore();
const [editLoading, updateEditLoading] = initializeToggleStore();

const [creationError, setCreationError] = initializeErrorStore();

const createItem = createEffect({
    handler: async (values: BULLZ.CreateTopicRequest) => {
        try {
            updateLoading();
            const { id } = await API.manageProducts.createProduct(values);
            updateLoading();

            setCreationError('');
            message.success('you successfully created topic');
            history.push(topicsLink + '/' + id);
        } catch {
            setCreationError(asyncError);
            message.error(asyncError);
            updateLoading();
        }
    }
});
//TODO: Change Type for update to WM api
// interface UpdateProps extends Id, ProductCardEditableFields {}
const updateItemById = createEvent<BULLZ.UpdateTopicRequest>();

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryTopicsRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateInitialLoading();
            const data = await API.manageProducts.getProducts(values, cancelToken.token);
            updateInitialLoading();

            return data;
        } catch {
            updateInitialLoading();
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

const deleteItemById = createEvent<string>();

const products = createStore<BULLZ.TopicsResponse>({})
    .on(updateItemById, (state, { id, ...newValues }) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, ...newValues }))
    }))
    .on(loadItems.doneData, (_, state) => state)
    .on(loadItemById.doneData, (_, state) => state)
    .on(deleteItemById, (state, id) =>
        id
            ? {
                  ...state,
                  items: state.items?.filter(item => item.id !== id),
                  totalRecords: state.items?.some(item => item.id === id)
                      ? state.totalRecords
                          ? state.totalRecords - 1
                          : 0
                      : state.totalRecords
              }
            : state
    );

const loadSingleItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data = await API.manageProducts.getProductById({
                id
            });
            updateLoading();

            return data;
        } catch {
            updateLoading();
            return {};
        }
    }
});

const loadEditInfoItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateEditLoading();
            const data = await API.manageProducts.getProductById({
                id
            });
            updateEditLoading();

            return data;
        } catch {
            updateEditLoading();
            return {};
        }
    }
});

const editInfoItem = createStore<BULLZ.TopicResponse>({}).on(
    [loadSingleItemById.doneData, loadEditInfoItemById.doneData],
    (_, newState) => newState
);

// const setSingleItem = createEvent<BULLZ.GetManagedProductResponse>();
const product = createStore<BULLZ.TopicResponse>({})
    .on(updateItemById, (state, { id, ...newValues }) =>
        state.id !== id
            ? state
            : {
                  ...state,
                  ...newValues
              }
    )
    .on(loadSingleItemById.doneData, (_, newState) => newState);
// .on(setSingleItem, (_, newState) => newState);

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

export const productsEvents = {
    updateValues,
    setDefaultValues,
    deleteItemById,
    setId,
    setIsFirstToTrue,
    setIsFirstToFalse,
    // setSingleItem,
    updateItemById
};
export const productsEffects = { loadItemById, loadSingleItemById, createItem, loadEditInfoItemById };
export const productsStores = {
    products,
    product,
    loading,
    getRequestId,
    isFirst,
    values,
    creationError,
    initialLoading,
    editInfoItem,
    editLoading
};
