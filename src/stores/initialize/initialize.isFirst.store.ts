import { createEvent, createStore } from 'effector';

export const initializeIsFirstStore = () => {
    const setIsFirstToFalse = createEvent();
    const setIsFirstToTrue = createEvent();
    const isFirst = createStore<boolean>(true)
        .on(setIsFirstToFalse, () => false)
        .on(setIsFirstToTrue, () => true);

    return { isFirst, setIsFirstToFalse, setIsFirstToTrue };
};
