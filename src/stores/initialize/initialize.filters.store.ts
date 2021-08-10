import axios, { CancelToken, CancelTokenSource } from 'axios';
import { combine, createEffect, createStore, Store } from 'effector';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { Id } from 'types/data';

// TODO: make usable
export const initializeFiltersStore = <TReq, TItem>(
    getItemsRequest: (
        data: TReq,
        token?: CancelToken
    ) => Promise<{
        totalRecords: number | undefined;
        items: TItem[] | undefined;
    }>,
    getItemRequest: (data: Id, token?: CancelToken) => Promise<TItem>
): {
    itemsStore: Store<
        [
            boolean,
            {
                totalRecords: number | undefined;
                items: TItem[] | undefined;
            }
        ]
    >;
    itemStore: Store<[boolean, TItem]>;
} => {
    type Response = {
        totalRecords: number | undefined;
        items: TItem[] | undefined;
    };

    let cancelToken: CancelTokenSource | undefined;

    const [itemsLoading, updateItemsLoading] = initializeToggleStore();
    const [itemLoading, updateItemLoading] = initializeToggleStore();

    const getItems = createEffect({
        handler: async (values: TReq): Promise<Response> => {
            try {
                cancelToken && cancelToken.cancel();
                cancelToken = axios.CancelToken.source();

                updateItemsLoading();
                const data = await getItemsRequest(values, cancelToken.token);
                updateItemsLoading();

                return data;
            } catch {
                updateItemsLoading();
                return {
                    items: undefined,
                    totalRecords: 0
                };
            }
        }
    });

    const getItemById = createEffect({
        handler: async (id: string): Promise<Response> => {
            try {
                cancelToken && cancelToken.cancel();
                cancelToken = axios.CancelToken.source();

                updateItemsLoading();
                const data = await getItemRequest(
                    {
                        id: id
                    },
                    cancelToken.token
                );
                updateItemsLoading();

                if (data)
                    return {
                        items: [data],
                        totalRecords: 1
                    };

                return {
                    items: undefined,
                    totalRecords: 0
                };
            } catch {
                updateItemsLoading();
                return {
                    items: undefined,
                    totalRecords: 0
                };
            }
        }
    });

    const getSingleItemById = createEffect({
        handler: async (id: string): Promise<TItem> => {
            try {
                cancelToken && cancelToken.cancel();
                cancelToken = axios.CancelToken.source();

                updateItemLoading();
                const data = await getItemRequest(
                    {
                        id: id
                    },
                    cancelToken.token
                );
                updateItemLoading();

                return data;
            } catch {
                updateItemLoading();
                return {} as TItem;
            }
        }
    });

    const items = createStore({} as Response)
        .on(getItems.doneData, (_, newState) => newState)
        .on(getItemById.doneData, (_, newState) => newState);

    const item = createStore({} as TItem).on(getSingleItemById.doneData, (_, newState) => newState);

    const itemsStore = combine(itemsLoading, items);
    const itemStore = combine(itemLoading, item);

    return { itemsStore, itemStore };
};
