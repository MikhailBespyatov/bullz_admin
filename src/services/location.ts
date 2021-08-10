import { CancelToken } from 'axios';
import axios from './axios';

export const getCountriesList = () =>
    axios<YEAY.AdminAllCountriesResponse>({
        url: '/admin/location/query-countries',
        data: {}
    });

export const getRegionsListByCountry = (data: YEAY.AdminGetRegionsByCountryRequest, cancelToken?: CancelToken) =>
    axios<YEAY.AdminAllRegionsByCountryResponse>({
        url: '/admin/location/query-regions',
        cancelToken,
        data
    });
