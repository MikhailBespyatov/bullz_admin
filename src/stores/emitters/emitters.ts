import axios, { CancelTokenSource } from 'axios';
import history from 'browserHistory';
import { defaultEmittersValues } from 'constants/defaults/emitters';
import { defaultPage } from 'constants/defaults/filterSettings';
import { deletedSuccess, successCreatedEmitterMessage, successUpdatedEmitterMessage } from 'constants/notifications';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeErrorStore } from 'stores/initialize/initialize.error.store';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { deleteEmitterModal } from 'stores/initialize/initialize.modal.store';
import { initializeToggleStore } from '../initialize/initialize.toggle.store';

const [loading, updateLoading] = initializeToggleStore();
const [deleteLoading, updateDeleteLoading] = initializeToggleStore();

const [registerError, setRegisterError] = initializeErrorStore();

let cancelToken: CancelTokenSource | undefined;

const loadItems = createEffect({
    handler: async (values: any) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.emitters.getEmitters({ ...values, returnQueryCount: true });
            updateLoading();

            return data;
        } catch {
            updateLoading();
            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
        }
    }
});

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const updateValues = createEvent<BULLZ.QueryAllUsersRequestValues>();
const invokeGetEmitters = createEvent();
const setDefaultValues = createEvent();

const values = createStore<any>(defaultEmittersValues)
    .on(updateValues, (state, values: any) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(invokeGetEmitters, state => state)
    .on(setDefaultValues, () => defaultEmittersValues);

forward({
    from: [values],
    to: [loadItems]
});

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

const emitters = createStore<any>({}).on(loadItems.doneData, (_, state) => state);

// ====== EMITTER DETAILS ======

const loadItemById = createEffect({
    handler: async (id: any) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.emitters.getEmitterById({ id });
            updateLoading();

            if (data) return data;

            return {};
        } catch {
            updateLoading();
            return {};
        }
    }
});

const createEmitter = createEffect({
    handler: async (values: any) => {
        try {
            updateLoading();
            await API.emitters.createEmitter(values);
            updateLoading();

            setRegisterError('');
            message.success(successCreatedEmitterMessage);
            return true;
        } catch ({ data: { message } }) {
            setRegisterError(message);

            updateLoading();
            return false;
        }
    }
});

const updateEmitter = createEffect({
    handler: async (values: any) => {
        try {
            updateLoading();
            await API.emitters.updateEmitter(values);
            updateLoading();

            setRegisterError('');
            message.success(successUpdatedEmitterMessage);
            return true;
        } catch ({ data: { message } }) {
            setRegisterError(message);

            updateLoading();
            return false;
        }
    }
});

const deleteEmitter = createEffect({
    handler: async (id: any) => {
        try {
            updateDeleteLoading();
            await API.emitters.deleteEmitter({ id });
            updateDeleteLoading();

            setRegisterError('');
            history.push('/emitters');
            deleteEmitterModal.closeModal();

            message.success(deletedSuccess);
            return true;
        } catch ({ data: { message } }) {
            setRegisterError(message);

            updateDeleteLoading();
            return false;
        }
    }
});

const emitterInfo = createStore({}).on(loadItemById.doneData, (_, state) => state);

export const emittersEvents = {
    invokeGetEmitters,
    setDefaultValues,
    setId,
    setIsFirstToFalse,
    setIsFirstToTrue,
    updateValues
};

export const emittersEffects = { loadItems, loadItemById, createEmitter, deleteEmitter, updateEmitter };

export const emittersStores = {
    emitters,
    loading,
    values,
    getRequestId,
    isFirst,
    emitterInfo,
    registerError,
    deleteLoading
};
