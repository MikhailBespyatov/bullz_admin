import { CancelToken } from 'axios';
import axios from './axios';

export const getProducts = (data: YEAY.QueryProductsRequest, cancelToken?: CancelToken) =>
    axios<YEAY.ProductsResponse>({
        url: '/product/manage/query',
        cancelToken,
        data
    });

export const getProductById = (data: YEAY.GetProductRequest, cancelToken?: CancelToken) =>
    axios<YEAY.ProductResponse>({
        url: '/product/manage/get',
        cancelToken,
        data
    });

export const deleteProductById = (data: YEAY.DeleteProductRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/product/manage/delete',
        data
    });

export const createProduct = (data: YEAY.CreateProductRequest) =>
    axios<YEAY.ProductResponse>({
        url: '/product/manage/create',
        data
    });

export const editProductInfo = (data: YEAY.UpdateProductRequest) =>
    axios<YEAY.ProductResponse>({
        url: '/product/manage/update',
        data
    });

export const uploadProductImg = (formData: FormData, id: string) =>
    axios<YEAY.UploadProductImageResponse>({
        url: `/product/manage/${id}/upload-image/`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
