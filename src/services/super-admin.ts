import axios from 'services/axios';

export const getBigQueryCount = (data: BULLZ.CountQueryUsersRequest) =>
    axios<BULLZ.CountQueryResponse>({
        url: '/super-admin/user/big-query-count',
        data
    });

export const getBigQuery = (data: BULLZ.BigQueryUsersRequest) =>
    axios<BULLZ.BigQueryUsersResponse>({
        url: '/super-admin/user/big-query',
        data
    });
