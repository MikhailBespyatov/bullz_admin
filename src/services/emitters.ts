import { CancelToken } from 'axios';
import axios from './axios';

export const getEmitters = (data: BULLZ.AdminQueryPostsRequest) =>
    axios({
        url: '/engagement/emitters/query',
        data
    });
export const getEmitterById = (data: BULLZ.GetEngagementEmittersRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.AdminGetUserCommon>({
        url: '/engagement/emitters/get',
        cancelToken,
        data
    });

export const createEmitter = (data: BULLZ.CreatePromotionRequest) =>
    axios({
        url: '/engagement/emitters/create',
        data
    });

export const deleteEmitter = (data: BULLZ.GetEngagementEmittersRequest) =>
    axios({
        url: '/engagement/emitters/delete',
        data
    });

export const updateEmitter = (data: BULLZ.CreatePromotionRequest) =>
    axios({
        url: '/engagement/emitters/update',
        data
    });
