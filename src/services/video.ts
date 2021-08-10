import { CancelToken } from 'axios';
import axios from './axios';

export const removeItemById = (data: YEAY.DeleteVideoRequest) =>
    axios<YEAY.DeleteVideoResponse>({
        url: '/video/delete',
        data
    });

export const createNewVideo = (data: YEAY.CreateVideoRequest) =>
    axios<YEAY.CreateVideoResponse>({
        url: '/video/new',
        data
    });

export const getVideoComments = (data: YEAY.QueryPostsRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryPostsResponse>({
        url: '/video/comment/query',
        cancelToken,
        data
    });

export const getVideoCommentReplies = (data: YEAY.QueryRepliesRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryPostsResponse>({
        url: '/video/comment/query-replies',
        cancelToken,
        data
    });

export const blockVideoCommentsForUser = (data: YEAY.BlockUserRequest, cancelToken?: CancelToken) =>
    axios<YEAY.MessageResponseBase>({
        url: '/video/comment/block',
        cancelToken,
        data
    });

export const getVideoDetails = (data: YEAY.GetVideoDetailsRequest) =>
    axios<YEAY.GetVideoDetailsResponse>({
        url: '/video/get',
        data
    });
