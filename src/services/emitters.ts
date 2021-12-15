import axios from './axios';

export const getEmitters = (data: BULLZ.AdminGetEmittersRequest) =>
    axios({
        url: '/engagement/emitters/query',

        data
    });
export const getEmitterById = (data: BULLZ.AdminGetEmitterInfoRequest) =>
    axios<BULLZ.AdminGetUserCommon>({
        url: '/engagement/emitters/get',
        data
    });

export const createEmitter = (data: BULLZ.CreatePromotionRequest) =>
    axios({
        url: '/engagement/emitters/create',
        data
    });
