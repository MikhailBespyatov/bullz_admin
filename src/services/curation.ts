import axios from './axios';

export const curate = (data: YEAY.SubmitVideoCurationRequest) =>
    axios<YEAY.SubmitVideoCurationResponse>({
        url: '/curation/submit',
        data
    });

export const createAffiliateLink = (data: YEAY.CreateManagedProductAffiliateLinkRequest) =>
    axios<YEAY.CreateManagedProductAffiliateLinkResponse>({
        url: '/curation/affiliate-link/create',
        data
    });

export const getAffiliateLinks = (data: YEAY.GetAffiliateLinkRequest) =>
    axios<YEAY.GetAffiliateLinkResponse>({
        url: '/curation/affiliate-link/get',
        data
    });
