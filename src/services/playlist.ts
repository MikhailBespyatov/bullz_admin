import { CancelToken } from 'axios';
import axios from './axios';

export const query = (data: YEAY.QueryPlaylistVideosRequest) =>
    axios<YEAY.PlaylistVideoResponse>({
        url: '/playlist/query',
        data
    });

export const get = (data: YEAY.GetPlaylistVideoRequest) =>
    axios<YEAY.PlaylistSingleVideoResponse>({
        url: '/playlist/get',
        data
    });

export const queryByFilter = (data: YEAY.QueryPlaylistVideosRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryPlaylistVideosResponse>({
        url: '/playlist/query-videos',
        cancelToken,
        data
    });
