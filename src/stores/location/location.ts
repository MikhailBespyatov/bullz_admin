import axios, { CancelTokenSource } from 'axios';
import { createEffect, createStore } from 'effector';
import { API } from 'services';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

let cancelToken: CancelTokenSource | undefined;
const [loading, updateLoading] = initializeToggleStore();

const loadListOfCountries = createEffect({
    handler: async () => {
        updateLoading();
        const countriesList = await API.location.getCountriesList();
        updateLoading();

        return countriesList || {};
    }
});

const countriesList = createStore<BULLZ.AdminAllCountriesResponse>({}).on(
    loadListOfCountries.doneData,
    (_, newState) => newState
);

const loadListOfRegionsByCountry = createEffect({
    handler: async (value: BULLZ.AdminGetRegionsByCountryRequest) => {
        cancelToken && cancelToken.cancel();
        cancelToken = axios.CancelToken.source();

        updateLoading();
        const regionsList = await API.location.getRegionsListByCountry(value, cancelToken.token);
        updateLoading();

        // console.log('store_regionsList.regions', regionsList.regions);

        return { regionsList, countryCode: value.country };
    }
});

const regionsList = createStore<BULLZ.AdminAllRegionsByCountryResponse>({}).on(
    loadListOfRegionsByCountry.doneData,
    (_, newState) => newState.regionsList
);

// regionsList.watch(regionsList => {
//     console.log('regionsList', regionsList);
// });

interface LocationInterface extends BULLZ.CountryResponse {
    region?: string[];
}

const locationList = createStore<LocationInterface[] | null | undefined>([])
    .on(loadListOfCountries.doneData, (_, { countries }) =>
        countries?.sort((a, b) => (a.countryName && b.countryName && a.countryName < b.countryName ? -1 : 1))
    )
    .on(loadListOfRegionsByCountry.doneData, (state, newState) =>
        state?.map(({ countryCode, countryName }) =>
            countryCode === newState.countryCode
                ? { countryCode, countryName, region: newState.regionsList.regions?.sort() }
                : { countryCode, countryName }
        )
    );

// locationList.watch(locationList => {
//     console.log('locationList', locationList);
// });

export const locationEffects = { loadListOfCountries, loadListOfRegionsByCountry, loading };
export const locationStores = {
    countriesList,
    regionsList,
    locationList
};
