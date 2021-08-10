import { CancelToken } from 'axios';
import axios from './axios';

export const getPromotions = (data: YEAY.QueryAdminPromotionRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryAdminPromotionResponse>({
        url: '/admin/promotion/query',
        cancelToken,
        data
    });

export const createPromotion = (data: YEAY.CreatePromotionRequest, cancelToken?: CancelToken) =>
    axios<YEAY.MessageResponseBase>({
        url: '/admin/promotion/create',
        cancelToken,
        data
    });

export const updatePromotion = (data: YEAY.UpdateAdminPromotionRequest, cancelToken?: CancelToken) =>
    axios<YEAY.MessageResponseBase>({
        url: '/admin/promotion/update',
        cancelToken,
        data
    });
