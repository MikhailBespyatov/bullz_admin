import axios from './axios';

export const curate = (data: BULLZ.SubmitVideoCurationRequest) =>
    axios<BULLZ.SubmitVideoCurationResponse>({
        url: '/curation/submit',
        data
    });

export const createAffiliateLink = (data: BULLZ.CreateManagedProductAffiliateLinkRequest) =>
    axios<BULLZ.CreateManagedProductAffiliateLinkResponse>({
        url: '/curation/affiliate-link/create',
        data
    });

export const getAffiliateLinks = (data: BULLZ.GetAffiliateLinkRequest) =>
    axios<BULLZ.GetAffiliateLinkResponse>({
        url: '/curation/affiliate-link/get',
        data
    });
