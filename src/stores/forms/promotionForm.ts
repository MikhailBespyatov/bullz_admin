import addDays from 'date-fns/addDays';
import { createForm } from 'effector-forms';

export const promotionForm = createForm({
    fields: {
        id: {
            init: '',
            validateOn: ['change'],
            rules: [
                {
                    name: 'promotionId',
                    validator: (value: string) => !!value
                }
            ]
        },
        name: {
            init: '',
            validateOn: ['change'],
            rules: [
                {
                    name: 'promotionName',
                    validator: (value: string) => !!value
                }
            ]
        },
        startDate: {
            init: new Date().toISOString()
            // validateOn: ['change'],
            // rules: [
            //     {
            //         name: 'startDate',
            //         validator: (value: string) => !!value
            //     }
            // ]
        },
        endDate: {
            init: addDays(new Date(), 1).toISOString()
            // validateOn: ['change'],
            // rules: [
            //     {
            //         name: 'endDate',
            //         validator: (value: string) => !!value
            //     }
            // ]
        },
        ageRanges: {
            init: [] as BULLZ.AgeRange[]
            // validateOn: ['change'],
            // rules: [
            //     {
            //         name: 'ageRanges',
            //         validator: (value: BULLZ.AgeRange[]) => !!value
            //     }
            // ]
        },
        userGenders: {
            init: [] as BULLZ.UserGender[]
            // validateOn: ['change'],
            // rules: [
            //     {
            //         name: 'userGenders',
            //         validator: (value: BULLZ.UserGender[]) => !!value
            //     }
            // ]
        },
        targetRegions: {
            init: [] as BULLZ.CountryResponse[]
            // validateOn: ['change'],
            // rules: [
            //     {
            //         name: 'targetRegions',
            //         validator: (value: string[]) => !!value
            //     }
            // ]
        },
        isPromotionActive: {
            init: false
            // validateOn: ['change'],
            // rules: [
            //     {
            //         name: 'promotionStatus',
            //         validator: (value: boolean) => value
            //     }
            // ]
        },
        pageRoute: {
            init: '',
            validateOn: ['change'],
            rules: [
                {
                    name: 'pageRoute',
                    validator: (value: string) => !!value
                }
            ]
        },
        imageUrl: {
            init: '',
            validateOn: ['change'],
            rules: [
                {
                    name: 'thumbnailImage',
                    validator: (value: string) => !!value
                }
            ]
        }
    },
    validateOn: ['change', 'blur', 'submit']
});

// promotionForm.$values.watch(state => {
//     console.log('form changed', state);
// });
