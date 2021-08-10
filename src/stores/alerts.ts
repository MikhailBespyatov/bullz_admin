import { createEvent, createStore, restore } from 'effector';
import { Active } from 'types/global';

const alertLiveTime = 3000;

const increment = createEvent();
const idStore = createStore(0).on(increment, state => state + 1);

type messageType = JSX.Element | string;
const noop: (message: messageType) => void = () => {};
const message = {
    error: noop,
    info: noop,
    success: noop
};
type alertType = keyof typeof message;
const messageArray = Object.keys(message) as alertType[];

interface Props extends Active {
    id: number;
    type?: alertType;
    message?: messageType;
}

const setAlert = createEvent<Props>();
const clearAlert = createEvent<number>();
const setAlertByType = (message: messageType, type: alertType) => {
    increment();
    const id = idStore.getState();
    setTimeout(() => clearAlert(id), alertLiveTime);
    setAlert({
        id,
        type,
        active: true,
        message
    });
};
for (let key of messageArray) message[key] = (message: messageType) => setAlertByType(message, key);
// const error = (message: string) => setAlertByTpe(message, 'error');
// const info = (message: string) => setAlertByTpe(message, 'info');
// const success = (message: string) => setAlertByTpe(message, 'success');

const alertStore = restore<Props>(setAlert, {
    id: idStore.getState()
}).on(clearAlert, (state, id) => (id !== state.id ? state : { ...state, active: false }));

const alertsStores = { alertStore };

export { alertsStores, message };
