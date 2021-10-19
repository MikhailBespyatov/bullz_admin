import axios from './axios';

export const getTrendings = (data: BULLZ.QueryTrendingOverridesRequest) =>
    axios<BULLZ.QueryTrendingOverridesResponse>({
        url: '/admin/trending/query',
        data
    });

export const createTrending = (data: BULLZ.CreateTrendingOverridesRequest) =>
    axios<BULLZ.QueryTrendingOverridesResponse>({
        url: '/admin/trending/create',
        data
    });

export const updateItemById = (data: BULLZ.UpdateTrendingOverridesRequest) =>
    axios<BULLZ.UpdateTrendingOverridesResponse>({
        url: '/admin/trending/update',
        data
    });

export const removeItemById = (data: BULLZ.RemoveTrendingOverridesRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/trending/remove',
        data
    });
