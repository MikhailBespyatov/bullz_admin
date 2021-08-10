export const filterMarginRight = '24px';

export const searchUserByIdParameter = 'User ID';
export const searchUserByEmailParameter = 'Email';
export const searchUserByMobileNumberParameter = 'Mobile Number';

export const defaultSearchParameters: YEAY.QueryAllUsersRequestValues = {
    username: undefined,
    mobileNumber: undefined,
    email: undefined
};

export interface LocaleSelectorProps {
    country: string;
    region: string;
    locale: string;
}
//export type SelectorType = 'country' | 'region' | 'locale';

export type SelectorKeyType = keyof LocaleSelectorProps;
