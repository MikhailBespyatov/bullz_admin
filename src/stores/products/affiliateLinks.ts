import { createEffect, createEvent, createStore } from 'effector';
import { API } from 'services';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';

const [loading, updateLoading] = initializeToggleStore();

const updateAffiliateLinkUrlByIndex = createEvent<{ i: number; url: string }>();

const getItemsByProductId = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data = await API.curation.getAffiliateLinks({ productId: id });
            updateLoading();

            return data;
        } catch {
            updateLoading();
            return {};
        }
    }
});

const items = createStore<BULLZ.GetAffiliateLinkResponse>({})
    .on(updateAffiliateLinkUrlByIndex, (state, { i, url }) => ({
        ...state,
        entries: state?.entries?.map((item, j) => (i !== j ? item : { ...item, url }))
    }))
    .on(getItemsByProductId.doneData, (_, newState) => newState);

export const affiliateLinksEvents = { updateAffiliateLinkUrlByIndex };
export const affiliateLinksEffects = { getItemsByProductId };
export const affiliateLinksStores = { items, loading };
