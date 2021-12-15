export const searchAvailableMinLength = 4;

export const findNestedSelectorsList = (path: number[] | undefined, selectorsArray: SelectorsItemProps[]) => {
    let result: SelectorsItemProps | undefined = path && selectorsArray[path[0]];

    if (path) {
        path?.slice(1).forEach(item => (result = result?.nestedSelectors?.[item]));

        //console.log('NestedSelectorsList____', result);
    }
    return result;
};

export const findIndexOfSelector = (title: string, array: SelectorsItemProps[]): number | undefined => {
    let foundedIndex = undefined;
    for (let i = 0; i < array.length; i++) {
        //console.log(array[i].selectorName, title, i);

        if (array[i].selectorName === title) {
            //console.log('found title');
            //console.log(i);
            return i;
        }
        if (array[i].nestedSelectors) {
            //console.log('go nested');
            //console.log('array[i].nestedSelectors___', array[i].nestedSelectors);
            foundedIndex = findIndexOfSelector(title, array[i].nestedSelectors || []);
        }
    }
    return foundedIndex;
};

interface SelectorProps {
    countryName?: string;
    countryCode?: string;
}

export const countryCodeCountryNameConverter = (
    array: SelectorsItemProps[],
    { countryName, countryCode }: SelectorProps
): SelectorProps => {
    let countryData: SelectorProps = {};

    if (countryCode) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].selectorType === 'country' && array[i].selectorCode === countryCode) {
                return { countryName: array[i].selectorName, countryCode: array[i].selectorCode };
            }
            if (array[i].nestedSelectors) {
                countryData = countryCodeCountryNameConverter(array[i].nestedSelectors || [], { countryCode });
            }
        }
    }

    if (countryName) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].selectorName.toLowerCase() === countryName.toLowerCase()) {
                return { countryName: array[i].selectorName, countryCode: array[i].selectorCode };
            }
            if (array[i].nestedSelectors) {
                countryData = countryCodeCountryNameConverter(array[i].nestedSelectors || [], { countryName });
            }
        }
    }

    return countryData;
};

export interface SelectorType {
    selectorType: string;
}

export interface SelectorName {
    selectorName: string;
}
export interface SelectorCode {
    selectorCode?: string;
}

export interface FilterParameters extends SelectorType, SelectorName, SelectorCode {}

export interface SelectorsItemProps extends Partial<SelectorType>, SelectorName, SelectorCode {
    searchPlaceholder?: string;
    isFetched?: boolean;
    /* Any, because fetch triggered by any data */
    onFetch?: (value: any) => Promise<any>;
    nestedSelectors?: SelectorsItemProps[];
}

export const mockSelectorsArray: SelectorsItemProps[] = [
    {
        selectorName: 'Locale',
        searchPlaceholder: 'Input a locale',
        nestedSelectors: [
            { selectorName: 'en-GB', selectorType: 'locale' },
            { selectorName: 'en-US', selectorType: 'locale' },
            { selectorName: 'ru-RU', selectorType: 'locale' },
            { selectorName: 'es-MX', selectorType: 'locale' },
            { selectorName: 'tr-TR', selectorType: 'locale' },
            { selectorName: 'az-AZ', selectorType: 'locale' },
            { selectorName: 'en-DE', selectorType: 'locale' }
        ]
    },
    {
        selectorName: 'Country and Region',
        searchPlaceholder: 'Type country or region',
        nestedSelectors: [
            {
                selectorName: 'Brazil',
                selectorType: 'country',
                searchPlaceholder: 'Type region',
                nestedSelectors: [
                    {
                        selectorName: 'Rio de Janeiro',
                        selectorType: 'region'
                    },
                    {
                        selectorName: 'Parana',
                        selectorType: 'region'
                    }
                ]
            },
            {
                selectorName: 'United States of America',
                selectorType: 'country',
                searchPlaceholder: 'Type city',
                nestedSelectors: [
                    {
                        selectorName: 'New York',
                        selectorType: 'region'
                    }
                ]
            },
            {
                selectorName: 'India',
                selectorType: 'country',
                searchPlaceholder: 'Type city',
                nestedSelectors: [
                    {
                        selectorName: 'Haryana',
                        selectorType: 'region'
                    },
                    {
                        selectorName: 'Madhya Pradesh',
                        selectorType: 'region'
                    },
                    {
                        selectorName: 'Gujarat',
                        selectorType: 'region'
                    },
                    {
                        selectorName: 'Maharashtra',
                        selectorType: 'region'
                    }
                ]
            },
            {
                selectorName: 'Russian Federation',
                selectorType: 'country',
                searchPlaceholder: 'Type city',
                nestedSelectors: [
                    {
                        selectorName: 'Khabarovskiy kray',
                        selectorType: 'region'
                    },
                    {
                        selectorName: "Omskaya oblast'",
                        selectorType: 'region'
                    }
                ]
            }
        ]
    }
];

export const localeSelector: SelectorsItemProps = {
    selectorName: 'Locale',
    searchPlaceholder: 'Input a locale',
    nestedSelectors: [
        { selectorName: 'az-AZ', selectorType: 'locale' },
        { selectorName: 'en-AE', selectorType: 'locale' },
        { selectorName: 'en-AT', selectorType: 'locale' },
        { selectorName: 'en-AU', selectorType: 'locale' },
        { selectorName: 'en-BE', selectorType: 'locale' },
        { selectorName: 'en-CA', selectorType: 'locale' },
        { selectorName: 'en-CH', selectorType: 'locale' },
        { selectorName: 'en-CY', selectorType: 'locale' },
        { selectorName: 'en-DE', selectorType: 'locale' },
        { selectorName: 'en-DK', selectorType: 'locale' },
        { selectorName: 'en-FI', selectorType: 'locale' },
        { selectorName: 'en-GB', selectorType: 'locale' },
        { selectorName: 'en-HK', selectorType: 'locale' },
        { selectorName: 'en-IE', selectorType: 'locale' },
        { selectorName: 'en-IN', selectorType: 'locale' },
        { selectorName: 'en-JM', selectorType: 'locale' },
        { selectorName: 'en-KE', selectorType: 'locale' },
        { selectorName: 'en-MT', selectorType: 'locale' },
        { selectorName: 'en-MY', selectorType: 'locale' },
        { selectorName: 'en-NA', selectorType: 'locale' },
        { selectorName: 'en-NG', selectorType: 'locale' },
        { selectorName: 'en-NL', selectorType: 'locale' },
        { selectorName: 'en-NZ', selectorType: 'locale' },
        { selectorName: 'en-PH', selectorType: 'locale' },
        { selectorName: 'en-PK', selectorType: 'locale' },
        { selectorName: 'en-SE', selectorType: 'locale' },
        { selectorName: 'en-SG', selectorType: 'locale' },
        { selectorName: 'en-UG', selectorType: 'locale' },
        { selectorName: 'en-US', selectorType: 'locale' },
        { selectorName: 'en-ZA', selectorType: 'locale' },
        { selectorName: 'es-MX', selectorType: 'locale' },
        { selectorName: 'et-EE', selectorType: 'locale' },
        { selectorName: 'fi-FI', selectorType: 'locale' },
        { selectorName: 'fr-FR', selectorType: 'locale' },
        { selectorName: 'id-ID', selectorType: 'locale' },
        { selectorName: 'it-IT', selectorType: 'locale' },
        { selectorName: 'ja-JP', selectorType: 'locale' },
        { selectorName: 'ko-KR', selectorType: 'locale' },
        { selectorName: 'lv-LV', selectorType: 'locale' },
        { selectorName: 'nb-NO', selectorType: 'locale' },
        { selectorName: 'nl-NL', selectorType: 'locale' },
        { selectorName: 'pt-BR', selectorType: 'locale' },
        { selectorName: 'ru-RU', selectorType: 'locale' },
        { selectorName: 'tr-TR', selectorType: 'locale' },
        { selectorName: 'zh-HK', selectorType: 'locale' }
    ]
};

export const selectorsArray: (nestedSelectors: SelectorsItemProps[]) => SelectorsItemProps[] = (
    nestedSelectors: SelectorsItemProps[]
) => [
    localeSelector,
    {
        selectorName: 'Country and Region',
        searchPlaceholder: 'Type country or region',
        nestedSelectors
    }
];
