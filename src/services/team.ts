import { CancelToken } from 'axios';
import axios from './axios';

export const getItems = (data: BULLZ.QueryTeamsRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryTeamsResponse>({
        url: '/team/query',
        cancelToken,
        data
    });

export const getItemById = (data: BULLZ.GetTeamInfoRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.GetTeamInfoResponse>({
        url: '/team/get',
        cancelToken,
        data
    });

export const deleteTeam = (data: BULLZ.AdminDeleteTeamRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/admin/team/delete-team',
        data
    });

export const createTeam = (data: BULLZ.CreateTeamRequest) =>
    axios<BULLZ.CreateTeamResponse>({
        url: '/team/create',
        data
    });

export const updateTeam = (data: BULLZ.UpdateTeamRequest) =>
    axios<BULLZ.UpdateTeamResponse>({
        url: '/team/update',
        data
    });

export const joinTeam = (data: BULLZ.JoinTeamRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/team/join',
        data
    });

export const leaveTeam = (data: BULLZ.LeaveTeamRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/team/leave',
        data
    });

export const removeTeam = (data: BULLZ.RemoveTeamMemberRequest) =>
    axios<BULLZ.MessageResponseBase>({
        url: '/team/remove',
        data
    });
