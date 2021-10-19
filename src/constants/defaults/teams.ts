import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';

export const defaultTeamsValues: BULLZ.QueryAdminTeamsRequest = {
    teamName: undefined,
    teamLeaderUsername: undefined,
    teamId: undefined,
    teamLeaderId: undefined,
    sortByMemberCountAsc: true,
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};
