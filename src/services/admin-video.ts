import { CancelToken } from 'axios';
import axios from './axios';
import { baseWomURL } from 'constants/services';

export const getCards = (data: YEAY.QueryAllVideosRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryAllVideosResponse>({
        url: '/admin/video/query',
        cancelToken,
        data
    });

export const getCardById = (data: YEAY.GetVideoRequest, cancelToken?: CancelToken) =>
    axios<YEAY.AdminGetVideoResponse>({
        url: '/admin/video/get',
        cancelToken,
        data
    });

export const getVideosByProductId = (data: YEAY.QueryVideosByProductIdRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryVideosByProductIdResponse>({
        url: '/admin/video/query-by-product',
        cancelToken,
        data
    });

export const getVideosStatistics = (data: YEAY.QueryVideoStatisticsRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryVideoStatisticsResponse>({
        url: '/admin/video/query-statistics',
        cancelToken,
        data
    });

export const editVideoInfo = (data: YEAY.UpdateVideoRequest) =>
    axios<YEAY.AdminGetVideoResponse>({
        url: '/admin/video/update',
        data
    });

export const updateVideoInfo = (data: YEAY.UpdateVideoCuratorRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/curation/video/update',
        data
    });

export const queryComments = (data: YEAY.AdminQueryPostsRequest, cancelToken?: CancelToken) =>
    axios<YEAY.AdminQueryPostsResponse>({
        url: '/admin/video/comment/query',
        cancelToken,
        data
    });

export const updateState = (data: YEAY.UpdatePostRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/admin/video/comment/update',
        data
    });

export const getVideoWOMDataById = (data: WOM.ContentQueryRequest) =>
    axios<WOM.ContentQueryResponse>({
        baseURL: baseWomURL,
        url: '/catalogue/query',
        data
    });
