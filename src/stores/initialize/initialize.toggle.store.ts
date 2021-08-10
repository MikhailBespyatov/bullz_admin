import { createEvent, createStore, Event, Store } from 'effector';

export const initializeToggleStore = (initialState = false): [Store<boolean>, Event<void>] => {
    const updateState = createEvent();
    const state = createStore(initialState).on(updateState, state => !state);

    return [state, updateState];
};
