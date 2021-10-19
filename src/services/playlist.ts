import { CancelToken } from 'axios';
import axios from './axios';

export const query = (data: BULLZ.QueryPlaylistVideosRequest) =>
    axios<BULLZ.PlaylistVideoResponse>({
        url: '/playlist/query',
        data
    });

export const get = (data: BULLZ.GetPlaylistVideoRequest) =>
    axios<BULLZ.PlaylistSingleVideoResponse>({
        url: '/playlist/get',
        data
    });

export const queryByFilter = (data: BULLZ.QueryPlaylistVideosRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryPlaylistVideosResponse>({
        url: '/playlist/query-videos',
        cancelToken,
        data
    });
