import { CancelToken } from 'axios';
import axios from './axios';

export const removeItemById = (data: BULLZ.DeleteVideoRequest) =>
    axios<BULLZ.DeleteVideoResponse>({
        url: '/video/delete',
        data
    });

export const createNewVideo = (data: BULLZ.CreateVideoRequest) =>
    axios<BULLZ.CreateVideoResponse>({
        url: '/video/new',
        data
    });

export const getVideoComments = (data: BULLZ.QueryPostsRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryPostsResponse>({
        url: '/video/comment/query',
        cancelToken,
        data
    });

export const getVideoCommentReplies = (data: BULLZ.QueryRepliesRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryPostsResponse>({
        url: '/video/comment/query-replies',
        cancelToken,
        data
    });

export const blockVideoCommentsForUser = (data: BULLZ.BlockUserRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/video/comment/block',
        cancelToken,
        data
    });

export const getVideoDetails = (data: BULLZ.GetVideoDetailsRequest) =>
    axios<BULLZ.GetVideoDetailsResponse>({
        url: '/video/get',
        data
    });
