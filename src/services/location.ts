import { CancelToken } from 'axios';
import axios from './axios';

export const getCountriesList = () =>
    axios<BULLZ.AdminAllCountriesResponse>({
        url: '/admin/location/query-countries',
        data: {}
    });

export const getRegionsListByCountry = (data: BULLZ.AdminGetRegionsByCountryRequest, cancelToken?: CancelToken) =>
    axios<BULLZ.AdminAllRegionsByCountryResponse>({
        url: '/admin/location/query-regions',
        cancelToken,
        data
    });
