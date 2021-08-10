import axios from 'services/axios';

export const getActivity = (data: YEAY.CreateMarketingStatisticsRequest) =>
    axios<YEAY.MarketingStatisticsResponse>({
        url: '/statistics/activity/get',
        data
    });
