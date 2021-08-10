import { createStore, Effect } from 'effector';

// * any because type of these arguments doesn't matter
export const initializeLoadingStore = (effects: Array<Effect<any, any, Error>>) =>
    createStore(false)
        .on(effects, () => true)
        .on(
            effects.map(i => i.doneData),
            () => false
        )
        .on(
            effects.map(i => i.failData),
            () => false
        );
