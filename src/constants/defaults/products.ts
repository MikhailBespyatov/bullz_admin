import { sortTagsProductsValues } from 'constants/filters/sorts';
import { defaultLimit, defaultPage } from './filterSettings';

export const sortTagsValuesProductsDefault = sortTagsProductsValues[0];

export const defaultProductsValues: YEAY.QueryProductsRequest = {
    //isReferenced: true,
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};
