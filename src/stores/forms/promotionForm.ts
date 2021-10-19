//import history from 'browserHistory';
//import { routes } from 'constants/routes';
import { createEffect, createEvent, createStore /*forward*/ } from 'effector';
//import { createForm } from 'effector-forms';
import { loadingEffects } from 'stores/loading';
import { promotionsEffects } from 'stores/promotions/promotions';

const { createPromotion, updatePromotion } = promotionsEffects;

// export const promotionForm = createForm({
//     fields: {
//         id: {
//             init: ''
//             // rules: [
//             //     createRule<string>({
//             //         name: 'promotionId',
//             //         schema:
//             //     })
//             // ]
//         },
//         name: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'promotionName'
//                     // schema: ,
//                 })
//             ]
//         },
//         startDate: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'startDate'
//                     //schema:
//                 })
//             ]
//         },
//         endDate: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'endDate'
//                     // schema:
//                 })
//             ]
//         },
//         ageRanges: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'ageRanges'
//                     //schema:
//                 })
//             ]
//         },
//         userGender: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'userGender'
//                     //schema:
//                 })
//             ]
//         },
//         pageRoute: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'pageRoute'
//                     //schema:
//                 })
//             ]
//         },
//         targetRegion: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'targetRegion'
//                     //schema:
//                 })
//             ]
//         },
//         isPromotionActive: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'promotionStatus'
//                     //schema:
//                 })
//             ]
//         },
//         imageUrl: {
//             init: '',
//             rules: [
//                 createRule<string>({
//                     name: 'thumbnailImage'
//                     //schema:
//                 })
//             ]
//         }
//     },
//     validateOn: ['change', 'blur', 'submit']
// });

//using form for different events
const editSubmit = createEvent();
const addSubmit = createEvent();

const isPromotionCreate = createStore<boolean>(false)
    .on(addSubmit, _ => true)
    .on(editSubmit, _ => false);

export const handlePromotion = createEffect({
    handler: async (values: BULLZ.CreatePromotionRequest) => {
        try {
            loadingEffects.updateInitialLoading();
            const isCreate = isPromotionCreate.getState();
            const data = isCreate ? await createPromotion(values) : await updatePromotion(values);

            loadingEffects.updateInitialLoading();
            //history.push(themeStores.globalPrefixUrl.getState() + routes.campaignManager.products.index);

            return data || {};
        } catch {
            loadingEffects.updateInitialLoading();
            return {};
        }
    }
});

//form will submit by triggered events
//forward({ from: [addSubmit, editSubmit], to: promotionForm.submit });

//forward({ from: promotionForm.formValidated, to: handlePromotion });

//reset form
// forward({
//     from: [handlePromotion.doneData],
//     to: promotionForm.resetValues
// });

export const promotionFormEvents = { editSubmit, addSubmit };
