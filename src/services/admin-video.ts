import { CancelToken } from 'axios';
import { baseWomURL } from 'constants/services';
import axios from './axios';

export const getCards = (data: BULLZ.QueryAllVideosRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryAllVideosResponse>({
        url: '/admin/video/query',
        cancelToken,
        data
    });

export const getCardById = (data: BULLZ.GetVideoRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.AdminGetVideoResponse>({
        url: '/admin/video/get',
        cancelToken,
        data
    });

export const getVideosByProductId = (data: BULLZ.QueryVideosByProductIdRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryVideosByProductIdResponse>({
        url: '/admin/video/query-by-product',
        cancelToken,
        data
    });

export const getVideosStatistics = (data: BULLZ.QueryVideoStatisticsRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryVideoStatisticsResponse>({
        url: '/admin/video/query-statistics',
        cancelToken,
        data
    });

export const editVideoInfo = (data: BULLZ.UpdateVideoRequest) =>
    axios<BULLZ.AdminGetVideoResponse>({
        url: '/admin/video/update',
        data
    });

export const updateVideoInfo = (data: BULLZ.UpdateVideoCuratorRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/curation/video/update',
        data
    });

export const queryComments = (data: BULLZ.AdminQueryPostsRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.AdminQueryPostsResponse>({
        url: '/admin/video/comment/query',
        cancelToken,
        data
    });

export const updateState = (data: BULLZ.UpdatePostRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/video/comment/update',
        data
    });

export const getVideoWOMDataById = (data: WOM.ContentQueryRequest) =>
    axios<WOM.ContentQueryResponse>({
        baseURL: baseWomURL,
        url: '/catalogue/query',
        data
    });

export const getVideoSourceFile = (data: BULLZ.GetVideoMetaRequest) =>
    axios<BULLZ.GetVideoPreviewResponse>({
        url: '/admin/video/get-source-file',
        data
    });
