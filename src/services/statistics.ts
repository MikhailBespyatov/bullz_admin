import axios from 'services/axios';

export const getActivity = (data: BULLZ.CreateMarketingStatisticsRequest) =>
    axios<BULLZ.MarketingStatisticsResponse>({
        url: '/statistics/activity/get',
        data
    });
