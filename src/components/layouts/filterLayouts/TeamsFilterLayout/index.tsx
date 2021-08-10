import { Footer } from 'components/grid/Footer';
import {
    commonMargin,
    defaultTeamSearchParameters
} from 'components/layouts/filterLayouts/TeamsFilterLayout/constants';
import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { SortSelectorButton } from 'componentsNewDesign/common/buttons/SortSelectorButton';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { Column, FlexGrow, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import {
    teamIdSearchPlaceholder,
    teamLeaderUserIdSearchPlaceholder,
    teamLeaderUserNameSearchPlaceholder,
    teamNameSearchPlaceholder
} from 'pages/Teams/constants';
import React, { FC, useEffect, useState } from 'react';
import { teamsEvents, teamsStores } from 'stores/team';
import { SearchParameters, TotalRecords } from 'types/data';

const { updateValues, setDefaultValues, setIsFirstToFalse } = teamsEvents;

interface TeamsQueryParams extends Partial<YEAY.QueryAdminTeamsRequest> {}

const updateQueryValues = (params: TeamsQueryParams) => {
    updateValues(params);
};

interface Props extends TotalRecords {}

export const TeamsFilterLayout: FC<Props> = ({ totalRecords, children }) => {
    const { pageIndex, limit, teamLeaderId, teamLeaderUsername, teamName, teamId, sortByMemberCountAsc } = useStore(
        teamsStores.values
    );
    // const defaultId = useStore(teamsStores.getRequestId);
    const isFirst = useStore(teamsStores.isFirst);
    const [isSortAscending, setIsSortAscending] = useState(sortByMemberCountAsc);
    const [queryParams, setQueryParams] = useQueryParams<TeamsQueryParams>(updateQueryValues);

    const onIdSearch = (teamId: string) => {
        teamsEvents.updateValues({
            ...defaultTeamSearchParameters,
            teamId: teamId || undefined
        });
    };

    const onSearchByTeamName = (teamName: string) => {
        teamsEvents.updateValues({
            ...defaultTeamSearchParameters,
            teamName: teamName || undefined
        });
    };

    const onSearchByLeaderUserName = (teamLeaderUsername: string) => {
        teamsEvents.updateValues({
            ...defaultTeamSearchParameters,
            teamLeaderUsername: teamLeaderUsername || undefined
        });
    };

    const onSearchByLeaderUserId = (teamLeaderUserId: string) => {
        teamsEvents.updateValues({
            ...defaultTeamSearchParameters,
            teamLeaderId: teamLeaderUserId || undefined
        });
    };

    const onSortStateChange = () => {
        setIsSortAscending(!isSortAscending);
    };

    const onCurrentPageChange: (page: number, pageSize: number | undefined) => void = (page, pageSize) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    const searchParameters: SearchParameters[] = [
        {
            searchBy: 'Team ID',
            defaultValue: teamId,
            placeholder: teamIdSearchPlaceholder,
            onSearch: onIdSearch
        },
        {
            searchBy: 'Team name',
            defaultValue: teamName,
            placeholder: teamNameSearchPlaceholder,
            onSearch: onSearchByTeamName
        },
        {
            searchBy: 'Team leader username',
            defaultValue: teamLeaderUsername,
            placeholder: teamLeaderUserNameSearchPlaceholder,
            onSearch: onSearchByLeaderUserName
        },
        {
            searchBy: 'Team leader user id',
            defaultValue: teamLeaderId,
            placeholder: teamLeaderUserIdSearchPlaceholder,
            onSearch: onSearchByLeaderUserId
        }
    ];

    // TODO: make reset without reload

    const resetFilters = () => {
        setQueryParams({});
        document.location.reload();
    };

    useEffect(() => {
        if (isFirst && !queryParams.pageIndex && !queryParams.limit) {
            setDefaultValues();
            setIsFirstToFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        teamsEvents.updateValues({
            ...queryParams,
            sortByMemberCountAsc: isSortAscending
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSortAscending]);

    useEffect(() => {
        setQueryParams({
            pageIndex,
            limit,
            teamLeaderId,
            teamLeaderUsername,
            teamName,
            teamId,
            sortByMemberCountAsc
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, teamLeaderId, teamLeaderUsername, teamName, teamId, sortByMemberCountAsc]);

    return (
        <>
            <Row alignCenter marginBottom="20px" width="90%">
                <FlexGrow marginBottom={commonMargin} marginRight={commonMargin}>
                    <SearchInput searchParameters={searchParameters} />
                </FlexGrow>
                <Column marginBottom={commonMargin}>
                    <SortSelectorButton
                        state={isSortAscending ? 'ascending' : 'descending'}
                        onChange={onSortStateChange}
                    >
                        Sort by Members
                    </SortSelectorButton>
                </Column>
                <Column marginBottom={commonMargin} marginLeft={commonMargin}>
                    <ResetSearchButton onClick={resetFilters} />
                </Column>
            </Row>

            {children}
            <Footer>
                <Pagination
                    currentIndex={pageIndex + 1}
                    defaultSize={limit}
                    totalItems={totalRecords}
                    onSizeChange={onCurrentPageChange}
                />
            </Footer>
        </>
    );
};
