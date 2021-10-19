import { createEffect, createEvent, createStore, restore } from 'effector';
import { API } from 'services';

const updateLoading = createEvent();
const setLoading = createEvent<boolean>();

const loading = createStore<boolean>(false)
    .on(updateLoading, state => !state)
    .on(setLoading, (_, state) => state);

const getPrimaryProductById = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data: BULLZ.AdminGetVideoResponse = await API.manageProducts.getProductById({
                id: id
            });
            updateLoading();

            if (data) return data;

            return {};
        } catch {
            updateLoading();
            return {};
        }
    }
});

const setPrimaryProductHashtags = createEvent<string[]>();
const clearPrimaryProductHashtags = createEvent();
const primaryProductHashtags = createStore<string[]>([])
    .on(getPrimaryProductById.doneData, (_, product) => product?.hashTags || [])
    .on(setPrimaryProductHashtags, (_, newState) => newState)
    .on(clearPrimaryProductHashtags, () => []);

const setProductHashtags = createEvent<string[]>();
const clearProductHashtags = createEvent();
const productHashtags = createStore<string[]>([])
    .on(setProductHashtags, (_, newState) => newState)
    .on(clearProductHashtags, () => []);

const setCopiedId = createEvent<string>();
const copiedDataId = restore(setCopiedId, '');

const copiedProductsHashtagsEvents = {
    setProductHashtags,
    clearProductHashtags,
    setPrimaryProductHashtags,
    clearPrimaryProductHashtags
};
const copiedProductsHashtagsEffects = { getPrimaryProductById };
const copiedProductsHashtagsStores = { productHashtags, primaryProductHashtags, loading };

const copyStores = { copiedDataId };
const copyEvents = { setCopiedId };

export {
    copiedProductsHashtagsEvents,
    copiedProductsHashtagsEffects,
    copiedProductsHashtagsStores,
    copyStores,
    copyEvents
};
