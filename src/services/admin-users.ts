import { CancelToken } from 'axios';
import axios from './axios';

export const getUsers = (data: BULLZ.QueryAllUsersRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryUsersResponse>({
        url: '/admin/user/query',
        cancelToken,
        data
    });

export const getUserById = (data: BULLZ.AdminGetUserRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.AdminGetUserCommon>({
        url: '/admin/user/get',
        cancelToken,
        data
    });

export const updateUserById = (data: BULLZ.AdminUpdateUserRequest) =>
    axios<BULLZ.AdminGetUserCommon>({
        url: '/admin/user/update',
        data
    });

export const deleteUsersById = (data: BULLZ.AdminDeleteUsersRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/user/delete',
        data
    });

export const getBlacklistedUsers = (data: BULLZ.QueryBlacklistedUsersRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryBlacklistedUsersResponse>({
        url: '/admin/user/query-blacklisted-users',
        cancelToken,
        data
    });
export const getDeletedUsers = (data: BULLZ.QueryDeletedUsersRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryDeletedUsersResponse>({
        url: '/admin/user/query-deleted',
        cancelToken,
        data
    });
export const getBlockedUsers = (data: BULLZ.QueryDisabledUsersRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryDisabledUsersResponse>({
        url: '/admin/user/query-disabled',
        cancelToken,
        data
    });

export const blockUsersById = (data: BULLZ.AdminDisableUsersRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/user/disable',
        data
    });
export const enableUsersById = (data: BULLZ.AdminEnableUsersRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/user/enable',
        data
    });
