export const wrapperPadding = '20px 25px';
export const arrowDiameter = '15px';
export const imageWrapperHeight = '170px';
export const imageWrapperWidth = '150px';
export const imageWrapperBorderRadius = '8px';

export const inputBorderBottom = '1px solid rgba(196, 196, 196, 0.1)';

export const promotionNamePlaceholder = 'Type promotion name here';
export const pageRoutePlaceholder = 'Type page route here';
export const targetRegionsPlaceholder = 'Add regions';
export const imageRequiredMessage = 'Please upload an image';
export const textFontSize = '12px';
export const textFontWeight = '500';
export const regionTagsPadding = '10px 13px 13px 0px';

export const getTargetRegionsArray = (countriesList: BULLZ.CountryResponse[], countryCodes: string[]) => {
    const targetRegionsArray = countryCodes
        .map(countryCode => countriesList.find(item => item?.countryCode?.toLowerCase() === countryCode.toLowerCase()))
        .filter((item): item is BULLZ.CountryResponse => !!item?.countryCode && !!item.countryName);

    return targetRegionsArray;
};
