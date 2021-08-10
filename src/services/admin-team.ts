import { CancelToken } from 'axios';
import axios from './axios';

export const queryTeamsByParameter = (data: YEAY.QueryAdminTeamsRequest, cancelToken?: CancelToken) =>
    axios<YEAY.QueryAdminTeamsResponse>({
        url: '/admin/team/query',
        cancelToken,
        data
    });
