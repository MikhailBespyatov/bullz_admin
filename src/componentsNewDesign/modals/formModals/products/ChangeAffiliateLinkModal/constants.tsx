//import locale from 'locale-codes';
export const createAffiliateLinkSuccessMessage = 'You successfully changed affiliate link!';

//export const localeValues = locale.all.map(i => i.tag);
export const localeValues = ['en-US', 'en-DE', 'en-RU', 'en-GB', 'ru-GB', 'en-IT', 'tr-TR', 'de-DE', 'ru-RU'];
export const localeDefaultValue = localeValues[0];

export const initialValues = {
    locale: localeDefaultValue,
    url: ''
};
