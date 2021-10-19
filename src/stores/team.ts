//import { message } from 'antd';
import axios, { CancelTokenSource } from 'axios';
import history from 'browserHistory';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultTeamsValues } from 'constants/defaults/teams';
import { asyncError } from 'constants/notifications';
import { teamsLink } from 'constants/routes';
import { createEffect, createEvent, createStore, restore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeErrorStore } from 'stores/initialize/initialize.error.store';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { Id } from 'types/data';
import { TeamCardEditableFields } from 'types/form';

let cancelToken: CancelTokenSource | undefined;

const [initialLoading, updateInitialLoading] = initializeToggleStore();
const [loading, updateLoading] = initializeToggleStore();

const [creationError, setCreationError] = initializeErrorStore();

const getSingleItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data = await API.team.getItemById({ id });
            updateLoading();

            return data;
        } catch {
            updateLoading();
            return {};
        }
    }
});

const getItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data = await API.team.getItemById({ id });
            updateLoading();

            return data;
        } catch {
            message.error("such team doesn't exist");
            updateLoading();
            return {};
        }
    }
});

const getIdAndRedirectToSinglePage = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data = await API.team.getItemById({ id });
            updateLoading();

            data?.id ? history.push(teamsLink + '/' + data.id) : message.error("such team doesn't exist");
            return data;
        } catch {
            message.error("such team doesn't exist");
            updateLoading();
            return {};
        }
    }
});

const getItems = createEffect({
    handler: async (values: BULLZ.QueryAdminTeamsRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateInitialLoading();
            const data = await API.adminTeams.queryTeamsByParameter(values, cancelToken.token);
            updateInitialLoading();

            return data || {};
        } catch (error) {
            updateInitialLoading();
            const errorMessage = error.data.message;
            message.error(errorMessage || asyncError);
        }
    }
});

const deleteItemById = createEvent<string>();

const removeOrBanMember = createEffect({
    handler: async (values: BULLZ.RemoveTeamMemberRequest) => {
        try {
            // TODO: await
            /*const removeTeamResponse = */
            await API.team.removeTeam(values);
            //console.log('removeTeamResponse', removeTeamResponse);

            return values.userId;
        } catch (error) {
            //console.log('ERROR');
            const errorMessage = error?.data?.message;
            setCreationError(errorMessage || asyncError);
            message.error(errorMessage || asyncError);

            return {
                isSuccess: false
            };
        }
    }
});

interface UpdateProps extends Id, TeamCardEditableFields {}
const updateItemById = createEvent<UpdateProps>();

const singleItem = createStore<BULLZ.GetTeamInfoResponse>({}).on(getSingleItemById.doneData, (_, newState) => newState);
const item = createStore<BULLZ.GetTeamInfoResponse>({})
    .on(getItemById.doneData, (_, newState) => newState)
    .on(removeOrBanMember.doneData, (item, userId) => ({
        ...item,
        members: item.members?.filter(member => member.userId !== userId)
    }))
    .on(updateItemById, (item, newValues) => ({
        ...item,
        ...newValues
    }));

const items = createStore<BULLZ.QueryTeamsResponse>({})
    .on(getItems.doneData, (_, newState) => newState)
    .on(updateItemById, (state, { id, ...newValues }) => ({
        ...state,
        items: state.items?.map(team =>
            team.id === id
                ? {
                      ...team,
                      ...newValues
                  }
                : {
                      ...team
                  }
        )
    }))
    .on(deleteItemById, (state, id) => ({
        ...state,
        items: state.items?.filter(team => team.id !== id)
    }));

const updateValues = createEvent<BULLZ.QueryTeamsRequestValues>();
const updateAndRemoveValues = createEvent<BULLZ.UpdateAndRemoveTeamsValues>();
const setDefaultValues = createEvent();

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

// values store keeps request values,
// after updating or removing some fields of the values,
// watcher initiate getItems request due the new values
// (old fields of values are not removed if they are not pointed as remove values in removeAndUpdateValues event)
const values = createStore<BULLZ.QueryAdminTeamsRequest>(defaultTeamsValues)
    .on(updateValues, (state, values: BULLZ.QueryTeamsRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(setDefaultValues, () => defaultTeamsValues);

values.watch(updateValues, state => getItems(state));
values.watch(updateAndRemoveValues, state => getItems(state));
values.watch(setDefaultValues, state => getItems(state));

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

const createItem = createEffect({
    handler: async (values: BULLZ.CreateTeamRequest) => {
        try {
            updateLoading();
            // TODO: await
            await API.team.createTeam(values);
            updateLoading();

            setCreationError('');
            message.success('you successfully created team');
        } catch {
            setCreationError(asyncError);
            message.error(asyncError);
            updateLoading();
        }
    }
});

const editInfoItem = createStore<BULLZ.GetTeamInfoResponse>({}).on(
    getSingleItemById.doneData,
    (_, newState) => newState
);

export const teamsEvents = {
    updateValues,
    updateAndRemoveValues,
    setDefaultValues,
    setIsFirstToFalse,
    setIsFirstToTrue,
    setId,
    updateItemById,
    deleteItemById
};
export const teamsEffects = {
    getItemById,
    getSingleItemById,
    getIdAndRedirectToSinglePage,
    createItem,
    removeOrBanMember
};
export const teamsStores = {
    getRequestId,
    items,
    item,
    singleItem,
    isFirst,
    initialLoading,
    loading,
    values,
    creationError,
    editInfoItem
};
