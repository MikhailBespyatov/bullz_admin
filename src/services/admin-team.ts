import { CancelToken } from 'axios';
import axios from './axios';

export const queryTeamsByParameter = (data: BULLZ.QueryAdminTeamsRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.QueryAdminTeamsResponse>({
        url: '/admin/team/query',
        cancelToken,
        data
    });
