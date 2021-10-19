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
