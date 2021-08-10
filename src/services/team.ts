import { CancelToken } from 'axios';
import axios from './axios';

export const getItems = (data: YEAY.QueryTeamsRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryTeamsResponse>({
        url: '/team/query',
        cancelToken,
        data
    });

export const getItemById = (data: YEAY.GetTeamInfoRequest, cancelToken?: CancelToken) =>
    axios<YEAY.GetTeamInfoResponse>({
        url: '/team/get',
        cancelToken,
        data
    });

export const deleteTeam = (data: YEAY.AdminDeleteTeamRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/admin/team/delete-team',
        data
    });

export const createTeam = (data: YEAY.CreateTeamRequest) =>
    axios<YEAY.CreateTeamResponse>({
        url: '/team/create',
        data
    });

export const updateTeam = (data: YEAY.UpdateTeamRequest) =>
    axios<YEAY.UpdateTeamResponse>({
        url: '/team/update',
        data
    });

export const joinTeam = (data: YEAY.JoinTeamRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/team/join',
        data
    });

export const leaveTeam = (data: YEAY.LeaveTeamRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/team/leave',
        data
    });

export const removeTeam = (data: YEAY.RemoveTeamMemberRequest) =>
    axios<YEAY.MessageResponseBase>({
        url: '/team/remove',
        data
    });
