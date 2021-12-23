import { CancelToken } from 'axios';
import axios from './axios';

export const getEmitters = (data: BULLZ.AdminQueryPostsRequest) =>
    axios({
        url: '/engagement/emitters/query',
        data
    });
export const getEmitterById = (data: BULLZ.AdminGetEmitterInfoRequest, cancelToken?: CancelToken) =>
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

export const deleteEmitter = (data: BULLZ.AdminGetEmitterInfoRequest) =>
    axios({
        url: '/engagement/emitters/delete',
        data
    });

export const updateEmitter = (data: BULLZ.CreatePromotionRequest) =>
    axios({
        url: '/engagement/emitters/update',
        data
    });
