import { CancelToken } from 'axios';
import axios from './axios';

export const getPromotions = (data: BULLZ.QueryAdminPromotionRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryAdminPromotionResponse>({
        url: '/admin/promotion/query',
        cancelToken,
        data
    });

export const createPromotion = (data: BULLZ.CreatePromotionRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.CreatePromotionResponse>({
        url: '/admin/promotion/create',
        cancelToken,
        data
    });

export const updatePromotion = (data: BULLZ.UpdateAdminPromotionRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/promotion/update',
        cancelToken,
        data
    });

export const uploadPromotionImg = (formData: FormData, id: string) =>
    axios<BULLZ.MessageResponseBase>({
        url: `/admin/promotion/upload-icon/${id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
