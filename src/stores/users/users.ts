import axios, { CancelTokenSource } from 'axios';
import { defaultPage } from 'constants/defaults/filterSettings';
import { defaultUsersValues } from 'constants/defaults/users';
import { createEffect, createEvent, createStore, forward, restore } from 'effector';
import _ from 'lodash';
import { errorDeletionUsersMessage } from 'pages/DeleteUser/constants';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeIsFirstStore } from 'stores/initialize/initialize.isFirst.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { Id } from 'types/data';

let cancelToken: CancelTokenSource | undefined;

const [loading, updateLoading] = initializeToggleStore();
const [editLoading, updateEditLoading] = initializeToggleStore();

const loadItems = createEffect({
    handler: async (values: BULLZ.QueryAllUsersRequest) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data = await API.adminUsers.getUsers(values, cancelToken.token);
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

const loadItemById = createEffect({
    handler: async (id: string) => {
        try {
            cancelToken && cancelToken.cancel();
            cancelToken = axios.CancelToken.source();

            updateLoading();
            const data: BULLZ.AdminGetUserCommon = await API.adminUsers.getUserById(
                {
                    id: id
                },
                cancelToken.token
            );
            updateLoading();

            if (data)
                return {
                    currentPageIndex: 0,
                    items: [data],
                    totalPages: 1,
                    totalRecords: 1
                };

            return {
                currentPageIndex: 0,
                totalPages: 0,
                totalRecords: 0
            };
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

const loadEditInfoItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateEditLoading();
            const data = await API.adminUsers.getUserById({
                id: id
            });
            updateEditLoading();

            if (data) return data;

            return {};
        } catch {
            updateEditLoading();
            return {};
        }
    }
});

const deleteUsersById = createEffect({
    handler: async (data: BULLZ.AdminDeleteUsersRequest) => {
        try {
            updateEditLoading();
            const { isSuccess, message: messageResponse = '' } = await API.adminUsers.deleteUsersById(data);
            updateEditLoading();

            //* show success notification only for bulk user deleting, for single user deleting have StatusModal:
            isSuccess && !!data.userIds?.length && messageResponse && message.success(messageResponse);

            if (isSuccess && !!data.userIds?.length) {
                return data.userIds;
            }
            if (isSuccess && !!data.users?.length) {
                return data.users.map(item => item.userId);
            }
            return [];
        } catch {
            message.error(errorDeletionUsersMessage);
            updateEditLoading();
            return [];
        }
    }
});

const editInfoItem = createStore<BULLZ.AdminGetUserCommon>({}).on(
    loadEditInfoItemById.doneData,
    (_, newState) => newState
);

interface UpdateRolesProps extends Id {
    role: string;
}

interface UpdateAbilityProps extends Id {
    isDisabled?: boolean;
    isTrusted?: boolean;
    locale?: string;
}

const addRoleByUserId = createEvent<UpdateRolesProps>();
const removeRoleByUserId = createEvent<UpdateRolesProps>();
const changeAbilityByUserId = createEvent<UpdateAbilityProps>();

const users = createStore<BULLZ.QueryUsersResponse>({})
    .on(loadItems.doneData, (_, state) => state)
    .on(loadItemById.doneData, (_, state) => state)
    .on(addRoleByUserId, (state, { id, role }) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, roles: i?.roles ? [...i.roles, role] : [] }))
    }))
    .on(removeRoleByUserId, (state, { id, role }) => ({
        ...state,
        items: state?.items?.map(i =>
            i.id !== id ? i : { ...i, roles: i?.roles ? i.roles?.filter(i => i !== role) : [] }
        )
    }))
    .on(changeAbilityByUserId, (state, { id, ...abilityProps }) => ({
        ...state,
        items: state?.items?.map(i => (i.id !== id ? i : { ...i, ...abilityProps }))
    }))
    .on(deleteUsersById.doneData, (state, userIds) => {
        const usersForDeleting = state.items?.filter(({ id }) => userIds.some(userId => userId === id));
        const totalRecords =
            (state.totalRecords ? state.totalRecords : 0) - (usersForDeleting ? usersForDeleting.length : 0);
        return {
            ...state,
            items: state.items?.filter(({ id }) => !userIds.some(userId => userId === id)),
            totalRecords
        };
    });

const loadSingleItemById = createEffect({
    handler: async (id: string) => {
        try {
            updateLoading();
            const data: BULLZ.AdminGetUserCommon = await API.adminUsers.getUserById({
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

const user = createStore<BULLZ.AdminGetUserCommon>({})
    .on(loadSingleItemById.doneData, (_, state) => state)
    .on(addRoleByUserId, (state, { id, role }) =>
        state.id !== id
            ? state
            : {
                  ...state,
                  roles: state?.roles ? [...state.roles, role] : []
              }
    )
    .on(removeRoleByUserId, (state, { id, role }) =>
        state.id !== id
            ? state
            : {
                  ...state,
                  roles: state?.roles ? state.roles?.filter(i => i !== role) : []
              }
    )
    .on(changeAbilityByUserId, (state, { id, ...abilityProps }) =>
        state.id !== id
            ? state
            : {
                  ...state,
                  ...abilityProps
              }
    )
    .on(deleteUsersById.doneData, (state, userIds) =>
        userIds.some(userId => userId === state.id) ? { ...state, isDisabled: true } : state
    );

const { isFirst, setIsFirstToFalse, setIsFirstToTrue } = initializeIsFirstStore();

const updateValues = createEvent<BULLZ.QueryAllUsersRequestValues>();
const invokeGetItems = createEvent();
const setDefaultValues = createEvent();

const values = createStore<BULLZ.QueryAllUsersRequest>(defaultUsersValues)
    .on(updateValues, (state, values: BULLZ.QueryAllUsersRequestValues) => ({
        ...state,
        pageIndex: defaultPage,
        ...values
    }))
    .on(invokeGetItems, state => state)
    .on(setDefaultValues, () => defaultUsersValues);

forward({
    from: [values],
    to: [loadItems]
});

// values.watch(values => {
//     console.log('values', values);
// });

// values.watch(updateValues, state => loadItems(state));
// values.watch(updateAndRemoveValues, state => loadItems(state));
// values.watch(setDefaultValues, state => loadItems(state));
values.watch(invokeGetItems, state => loadItems(state));

const setId = createEvent<string>();
const getRequestId = restore(setId, '');

const getEngagementStatistics = (
    items: BULLZ.AdminGetVideoResponse[],
    key: keyof BULLZ.VideoDetailsEngagementDeltas
) => {
    const engagementValues = items.map(({ engagementStatistics }) =>
        engagementStatistics ? engagementStatistics[key] : 0
    );
    const maxValue = _.max(engagementValues) || 0;
    const minValue = _.min(engagementValues) || 0;
    const spreadValue = maxValue - minValue;
    const indexMaxValue = engagementValues.findIndex(value => value === maxValue);

    return [maxValue, minValue, spreadValue, indexMaxValue];
};

const generateUserReport = createEffect({
    handler: async (userId: string): Promise<BULLZ.UserReport> => {
        const {
            /*@ts-ignore - Removing from API Model*/
            email,
            /*@ts-ignore - Removing from API Model*/
            mobileNumber,
            locale,
            isTrusted,
            isDisabled,
            utcCreated,
            utcUpdated,
            utcLastAuthentication,
            location
        } = await API.adminUsers.getUserById({ id: userId });

        const queryParams = { creatorId: userId, limit: 100, returnQueryCount: true };

        const {
            totalRecords: totalVideos,
            totalPages: totalVideosPages,
            items: itemsVideos
        } = await API.adminVideos.getCards({
            ...queryParams,
            pageIndex: 0
        });

        let unionVideos = itemsVideos ? [...itemsVideos] : [];

        if (totalVideosPages) {
            for (let i = 1; i < totalVideosPages; i++) {
                const { items } = await API.adminVideos.getCards({
                    ...queryParams,
                    pageIndex: i
                });
                unionVideos = items ? [...unionVideos, ...items] : [...unionVideos];
            }
        }

        const deletedVideos = unionVideos.filter(({ isDeleted }) => isDeleted);
        const liveVideos = unionVideos.filter(({ isDeleted }) => !isDeleted);

        const [allVideosMaxViews, allVideosMinViews, allSpreadViews, allVideosMaxViewsIndex] = getEngagementStatistics(
            unionVideos,
            'views'
        );
        const [publicVideosMaxViews, publicVideosMinViews, publicSpreadViews] = getEngagementStatistics(
            liveVideos,
            'views'
        );
        const [privateVideosMaxViews, privateVideosMinViews, privateSpreadViews] = getEngagementStatistics(
            deletedVideos,
            'views'
        );

        const [
            allVideosMaxComments,
            allVideosMinComments,
            allSpreadComments,
            allVideosMaxCommentsIndex
        ] = getEngagementStatistics(unionVideos, 'commentCount');
        const [publicVideosMaxComments, publicVideosMinComments, publicSpreadComments] = getEngagementStatistics(
            liveVideos,
            'commentCount'
        );
        const [privateVideosMaxComments, privateVideosMinComments, privateSpreadComments] = getEngagementStatistics(
            deletedVideos,
            'commentCount'
        );

        const [
            allVideosMaxShares,
            allVideosMinShares,
            allSpreadShares,
            allVideosMaxSharesIndex
        ] = getEngagementStatistics(unionVideos, 'shares');
        const [publicVideosMaxShares, publicVideosMinShares, publicSpreadShares] = getEngagementStatistics(
            liveVideos,
            'shares'
        );
        const [privateVideosMaxShares, privateVideosMinShares, privateSpreadShares] = getEngagementStatistics(
            deletedVideos,
            'shares'
        );

        const defaultEngagementsValues = {
            engagementStatistics: {
                views: 0,
                commentCount: 0,
                shares: 0
            }
        };

        const maxVideo = allVideosMaxViewsIndex !== -1 ? unionVideos[allVideosMaxViewsIndex] : defaultEngagementsValues;

        const maxComment =
            allVideosMaxCommentsIndex !== -1 ? unionVideos[allVideosMaxCommentsIndex] : defaultEngagementsValues;

        const maxShares =
            allVideosMaxSharesIndex !== -1 ? unionVideos[allVideosMaxSharesIndex] : defaultEngagementsValues;

        return {
            userId,
            email: email,
            phone: mobileNumber,
            locale,
            location: `${location?.countryName && location?.countryName + ', '}${
                location?.area?.region && location?.area?.region
            }`,
            isTrusted,
            isBlocked: isDisabled,
            createdAt: utcCreated,
            updatedAt: utcUpdated,
            /*TODO: it is utcLastAuthentication?*/
            lastSeenAt: utcLastAuthentication,
            totalVideos: totalVideos || 0,
            deletedVideos: deletedVideos.length,
            liveVideos: liveVideos.length,
            engagements: {
                all: {
                    maxViews: allVideosMaxViews,
                    minViews: allVideosMinViews,
                    spreadViews: allSpreadViews,
                    maxComments: allVideosMaxComments,
                    minComments: allVideosMinComments,
                    spreadComments: allSpreadComments,
                    maxShares: allVideosMaxShares,
                    minShares: allVideosMinShares,
                    spreadShares: allSpreadShares
                },
                public: {
                    maxViews: publicVideosMaxViews,
                    minViews: publicVideosMinViews,
                    spreadViews: publicSpreadViews,
                    maxComments: publicVideosMaxComments,
                    minComments: publicVideosMinComments,
                    spreadComments: publicSpreadComments,
                    maxShares: publicVideosMaxShares,
                    minShares: publicVideosMinShares,
                    spreadShares: publicSpreadShares
                },
                private: {
                    maxViews: privateVideosMaxViews,
                    minViews: privateVideosMinViews,
                    spreadViews: privateSpreadViews,
                    maxComments: privateVideosMaxComments,
                    minComments: privateVideosMinComments,
                    spreadComments: privateSpreadComments,
                    maxShares: privateVideosMaxShares,
                    minShares: privateVideosMinShares,
                    spreadShares: privateSpreadShares
                }
            },
            spread: {
                views: {
                    views: maxVideo.engagementStatistics?.views || 0,
                    comments: maxVideo.engagementStatistics?.commentCount || 0,
                    shares: maxVideo.engagementStatistics?.shares || 0
                },
                comments: {
                    views: maxComment.engagementStatistics?.views || 0,
                    comments: maxComment.engagementStatistics?.commentCount || 0,
                    shares: maxComment.engagementStatistics?.shares || 0
                },
                shares: {
                    views: maxShares.engagementStatistics?.views || 0,
                    comments: maxShares.engagementStatistics?.commentCount || 0,
                    shares: maxShares.engagementStatistics?.shares || 0
                }
            },
            userLevel: 'low' as BULLZ.LevelType
        };
    }
});

const userReport = createStore<Partial<BULLZ.UserReport>>({}).on(generateUserReport.doneData, (_, newState) => ({
    ...newState
}));

export const usersEvents = {
    addRoleByUserId,
    removeRoleByUserId,
    changeAbilityByUserId,
    updateValues,
    setDefaultValues,
    setId,
    setIsFirstToFalse,
    setIsFirstToTrue,
    invokeGetItems
};
export const usersEffects = { loadItemById, loadSingleItemById, deleteUsersById, generateUserReport };
export const usersStores = {
    users,
    user,
    loading,
    getRequestId,
    isFirst,
    values,
    editLoading,
    editInfoItem,
    userReport
};
