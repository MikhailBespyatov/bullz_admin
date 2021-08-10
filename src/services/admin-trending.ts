import axios from './axios';

export const getTrendings = (data: YEAY.QueryTrendingOverridesRequest) =>
    axios<YEAY.QueryTrendingOverridesResponse>({
        url: '/admin/trending/query',
        data
    });

export const createTrending = (data: YEAY.CreateTrendingOverridesRequest) =>
    axios<YEAY.QueryTrendingOverridesResponse>({
        url: '/admin/trending/create',
        data
    });

export const updateItemById = (data: YEAY.UpdateTrendingOverridesRequest) =>
    axios<YEAY.UpdateTrendingOverridesResponse>({
        url: '/admin/trending/update',
        data
    });

export const removeItemById = (data: YEAY.RemoveTrendingOverridesRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/admin/trending/remove',
        data
    });
