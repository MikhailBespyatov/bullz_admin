import { CancelToken } from 'axios';
import axios from './axios';

export const getProducts = (data: BULLZ.QueryTopicsRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.TopicsResponse>({
        url: '/product/manage/query',
        cancelToken,
        data
    });

export const getProductById = (data: BULLZ.GetTopicRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.TopicResponse>({
        url: '/product/manage/get',
        cancelToken,
        data
    });

export const deleteProductById = (data: BULLZ.DeleteTopicRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/product/manage/delete',
        data
    });

export const createProduct = (data: BULLZ.CreateTopicRequest) =>
    axios<BULLZ.TopicResponse>({
        url: '/product/manage/create',
        data
    });

export const editProductInfo = (data: BULLZ.UpdateTopicRequest) =>
    axios<BULLZ.TopicResponse>({
        url: '/product/manage/update',
        data
    });

export const uploadProductImg = (formData: FormData, id: string) =>
    axios<BULLZ.UploadTopicImageResponse>({
        url: `/product/manage/${id}/upload-image/`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
