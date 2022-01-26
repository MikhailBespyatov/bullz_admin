import axios, { CancelTokenSource } from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { defaultPromotionsValues } from '../../constants/defaults/promotion';

let cancelToken: CancelTokenSource | undefined;

//const [initialLoading, updateInitialLoading] = initializeToggleStore();
const [loading, updateLoading] = initializeToggleStore();

const createPromotion = createEffect({
    handler: async (values: BULLZ.CreatePromotionRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const response = await API.promotions.createPromotion(values, cancelToken.token);
            updateLoading();

            return response;
        } catch {
            updateLoading();
            return {};
        }
    }
});

const updatePromotion = createEffect({
    handler: async (values: BULLZ.UpdateAdminPromotionRequest) => {
        try {
            updateLoading();
            const response = await API.promotions.updatePromotion(values);
            updateLoading();

            response.isSuccess && message.success('Promotion was updated');

            return response;
        } catch {
            updateLoading();
            return {};
        }
    }
});

// const setPromotionValues = createEvent<BULLZ.GetAdminPromotionResponse>();

// const promotion = createStore<BULLZ.GetAdminPromotionResponse>(defaultPromotionValues).on(
//     setPromotionValues,
//     (state, values: BULLZ.GetAdminPromotionResponse) => ({
//         ...state,
//         ...values
//     })
// );

// const setId = createEvent<string>();
// const getRequestId = restore(setId, '');

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryAdminPromotionRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.promotions.getPromotions(values, cancelToken.token);
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

const promotions = createStore<BULLZ.QueryAdminPromotionResponse>({}).on(loadItems.doneData, (_, newState) => newState);

const updateValues = createEvent<BULLZ.QueryAdminPromotionRequest>();
const invokeGetItems = createEvent();
const setDefaultValues = createEvent();
const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const values = createStore<BULLZ.QueryAdminPromotionRequest>(defaultPromotionsValues)
    .on(updateValues, (state, values: BULLZ.QueryAdminPromotionRequest) => ({
        ...state,
        ...values
    }))
    .on(setDefaultValues, () => defaultPromotionsValues)
    .on(invokeGetItems, state => state);

// forward({
//     from: [values],
//     to: [loadItems]
// });

values.watch(invokeGetItems, state => loadItems(state));

updatePromotion.done.watch(() => {
    loadItems(defaultPromotionsValues);
});

export const promotionsEvents = {
    updateValues,
    setDefaultValues,
    invokeGetItems,
    setIsFirstToFalse,
    setIsFirstToTrue
    // setId
};
export const promotionsEffects = {
    loadItems,
    createPromotion,
    updatePromotion
};
export const promotionsStores = {
    //promotion,
    promotions,
    values,
    loading,
    //initialLoading,
    isFirst
    //getRequestId
};
