import { CancelToken } from 'axios';
import axios from './axios';

export const getUsers = (data: YEAY.QueryAllUsersRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryUsersResponse>({
        url: '/admin/user/query',
        cancelToken,
        data
    });

export const getUserById = (data: YEAY.AdminGetUserRequest, cancelToken?: CancelToken) =>
    axios<YEAY.AdminGetUserCommon>({
        url: '/admin/user/get',
        cancelToken,
        data
    });

export const updateUserById = (data: YEAY.AdminUpdateUserRequest) =>
    axios<YEAY.AdminGetUserCommon>({
        url: '/admin/user/update',
        data
    });

export const deleteUsersById = (data: YEAY.AdminDeleteUsersRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/admin/user/delete',
        data
    });

export const getBlacklistedUsers = (data: YEAY.QueryBlacklistedUsersRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryBlacklistedUsersResponse>({
        url: '/admin/user/query-blacklisted-users',
        cancelToken,
        data
    });
