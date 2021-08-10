import { defaultLanguage } from 'constants/defaults/others';
import { registerSuccessMessage } from 'constants/notifications';
import { storageName } from 'constants/storage';
import { createEffect, createEvent, createStore, restore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeErrorStore } from 'stores/initialize/initialize.error.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { Auth } from 'types/global';
import { AuthValuesType, RegisterValuesType } from 'types/types';
import { getAuthData } from 'utils/usefulFunctions';
import { authLink } from 'constants/routes';
import history from 'browserHistory';

const [loading, updateLoading] = initializeToggleStore();

const [registerError, setRegisterError] = initializeErrorStore();

const logout = createEvent();
const setAuth = createEvent<Auth>();

const createUser = createEffect({
    handler: async (values: RegisterValuesType) => {
        try {
            updateLoading();
            await API.user.createUser({ ...values, language: defaultLanguage });
            updateLoading();

            setRegisterError('');
            message.success(registerSuccessMessage);
        } catch ({ data: { errors, message } }) {
            message && message !== 'unknown' && setRegisterError(message);
            errors?.password?.length && setRegisterError(errors.password[0]);
            errors?.email?.length && setRegisterError(errors.email[0]);
            errors?.username?.length && setRegisterError(errors.username[0]);
            updateLoading();
        }
    }
});

const loadToken = createEffect({
    handler: async (values: AuthValuesType) => {
        try {
            updateLoading();
            const data = await API.user.authenticateUser(values);
            updateLoading();

            localStorage.setItem(storageName, JSON.stringify(data));
            return data;
        } catch (ex) {
            updateLoading();
            return {
                message: ex
            };
        }
    }
});

const user = createStore<YEAY.UserAuthorizeResponse>(JSON.parse(localStorage.getItem(storageName) || '{}'))
    .on(loadToken.doneData, (_, newState) => newState)
    .on(logout, () => {
        history.push(authLink);
        localStorage.removeItem(storageName);
        return {};
    });

// user.watch(state =>
//     objectIsEmpty(state)
//         ? setAuth({
//               access: -1,
//               authDenyReason: errorDataMessage
//           })
//         : state.message
//         ? setAuth({
//               access: -1,
//               authDenyReason: errorDataMessage
//           })
//         : giveAccess(state) !== -1
//         ? setAuth({
//               access: giveAccess(state),
//               authDenyReason: ''
//           })
//         : setAuth({
//               access: -1,
//               authDenyReason: errorNotEntryAllowed
//           })
// );

user.watch(state => setAuth(getAuthData(state)));

const userStore = user.getState();
const auth = restore<Auth>(setAuth, getAuthData(userStore));

auth.watch(setAuth, ({ authDenyReason }) => authDenyReason && message.error(authDenyReason));

export const userEvents = { logout };
export const userEffects = { loadToken, createUser };
export const userStores = { user, loading, auth, registerError };
