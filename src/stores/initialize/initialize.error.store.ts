import { createEvent, Event, restore, Store } from 'effector';
import { message } from 'stores/alerts';

export const initializeErrorStore = (initialState = ''): [Store<string>, Event<string>] => {
    const setError = createEvent<string>();
    const error = restore(setError, initialState);
    error.watch(setError, state => state && message.error(state));

    return [error, setError];
};
