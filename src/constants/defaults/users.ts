import { sortModeTagsValues, sortTagsValues, sortTagsWomStageValues } from 'constants/filters/sorts';
import { getDateBeforeAndReturnISO } from 'utils/parsers';
import { defaultLimit, defaultPage } from './filterSettings';

export enum Roles {
    Unknown = -1,
    SuperAdministrator,
    Administrator,
    ContentManager,
    Curator,
    Facilitator
}

export const superAdminRoles = ['SuperAdministrator'];
export const assignedUserRoles = ['Administrator', 'ContentManager', 'Curator', 'Facilitator'];
export const assignedUserRolesForSuperAdmin = [...superAdminRoles, ...assignedUserRoles];
export const defaultUserRoles = ['Registered', 'Tracked'];
export const sortTagsUsersValues = [undefined, ...defaultUserRoles, ...assignedUserRoles];
export const sortTagsUsersData = ['All', ...defaultUserRoles, ...assignedUserRoles];
export const sortModeTagsValuesDefault = sortModeTagsValues[1];
export const sortTagsValuesDefault = sortTagsValues[0];

export const accessRoles = Object.keys(Roles).filter(role => isNaN(Number(role)));

export const sortTagsValuesUsersDefault = sortTagsUsersValues[1];

export const defaultUsersValues: BULLZ.QueryAllUsersRequest = {
    sortByActivityAsc: true,
    pageIndex: defaultPage,
    role: sortTagsValuesUsersDefault,
    limit: defaultLimit,
    returnQueryCount: true
};

export const sortTagsWomStageValuesDefault = sortTagsWomStageValues[0];

export const sortByDate = ['None', 'UtcCreated', 'UtcLastAuthentication', 'UtcUpdated'];

export const defaultUserVideosValuesWithoutDate: BULLZ.QueryAllVideosRequest = {
    creatorId: undefined,
    isDeleted: false,
    isReported: false,
    hasHlsStream: true,
    fromCreatedDateTime: undefined,
    toCreatedDateTime: undefined,
    videoCurationState: undefined,
    womValidationStage: sortTagsWomStageValuesDefault,
    sort: undefined,
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const defaultUserVideosValues: BULLZ.QueryAllVideosRequest = {
    ...defaultUserVideosValuesWithoutDate,
    fromCreatedDateTime: getDateBeforeAndReturnISO(7),
    toCreatedDateTime: getDateBeforeAndReturnISO(-1)
};

export const defaultBlacklistedUsersValues: BULLZ.QueryBlacklistedUsersRequest = {
    type: 1,
    searchText: '',
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const defaultDeletedUsersValues: BULLZ.QueryDeletedUsersRequest = {
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true,
    fromUtcDeleted: undefined,
    toUtcDeleted: undefined,
    deletedUserId: undefined,
    deleterUserId: undefined,
    deletionReasons: undefined
};

export const defaultDisabledUsersValues: BULLZ.QueryDisabledUsersRequest = {
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true,
    fromUtcDisabled: undefined,
    toUtcDisabled: undefined,
    disablerUserId: undefined,
    disabledUserId: undefined,
    disablingReasons: undefined
};

export const ReasonDeletion = {
    0: 'None',
    1: 'Spamming',
    2: 'Copyright',
    3: 'Inappropriate',
    4: 'Collusion',
    5: 'FakeAccount',
    6: 'Requested',
    7: 'SelfDeletion'
};
