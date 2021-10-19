import axios, { CancelTokenSource } from 'axios';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { defaultPromotionsValues, defaultPromotionValues } from '../../constants/defaults/promotion';

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

// createPromotion({
//name: promotionName
// userAgeRanges: [
//     {
//         start: 15,
//         end: 20
//     }
// ],
// userGenders: [1, 2],
// location: ['Russia'],
// pageLocation: 'https://someurl.com/3456'
//icon: undefined,
//isActive: isPromotionActive,
// });

const updatePromotion = createEffect({
    handler: async (values: BULLZ.UpdateAdminPromotionRequest) => {
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

const setPromotionValues = createEvent<BULLZ.GetAdminPromotionResponse>();

const promotion = createStore<BULLZ.GetAdminPromotionResponse>(defaultPromotionValues).on(
    setPromotionValues,
    (state, values: BULLZ.GetAdminPromotionResponse) => ({
        ...state,
        ...values
    })
);

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

forward({
    from: [values],
    to: [loadItems]
});

values.watch(invokeGetItems, state => loadItems(state));

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

export const promotionsEvents = {
    updateValues,
    setDefaultValues,
    invokeGetItems,
    setIsFirstToFalse,
    setIsFirstToTrue,
    setId
};
export const promotionsEffects = {
    loadItems,
    createPromotion,
    updatePromotion
};
export const promotionsStores = {
    promotion,
    promotions,
    values,
    loading,
    //initialLoading,
    isFirst,
    getRequestId
};
