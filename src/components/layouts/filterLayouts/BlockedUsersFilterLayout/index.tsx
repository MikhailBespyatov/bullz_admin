import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { Footer } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import {
    searchUserByEmailParameter,
    searchUserByIdParameter,
    searchUserByMobileNumberParameter
} from 'componentsNewDesign/layouts/filterLayouts/DeletedUsersFilterLayout/constants';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { defaultDisabledUsersValues, ReasonDeletion, Roles } from 'constants/defaults/users';
import { mongoDbObjectIdRegExp } from 'constants/regularExpressions';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import {
    emailRegExp,
    emailSearchPlaceholder,
    mobileNumberRegExp,
    mobileNumberSearchPlaceholder,
    userIdSearchPlaceholder
} from 'pages/Users/constants';
import React, { FC, useEffect } from 'react';
import { blockedUsersEvents, blockedUsersStores } from 'stores/users/disabledUsers';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';

const { setId, updateValues } = blockedUsersEvents;

interface BlockedUsersQueryParams extends BULLZ.QueryDisabledUsersRequest {}

const updateQueryValues = ({ disabledUserId, ...params }: BlockedUsersQueryParams) => {
    if (disabledUserId) {
        setId(disabledUserId);
        updateValues({ ...defaultDisabledUsersValues, disabledUserId });
    } else {
        setId('');
        updateValues(params);
    }
};

interface Props extends TotalRecords, WithoutFooter {
    trendingUserFilter?: boolean;
}

export const BlockedUsersFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    const { pageIndex, limit, fromUtcDisabled, toUtcDisabled, disablingReasons, email, mobileNumber } = useStore(
        blockedUsersStores.values
    );

    const defaultId = useStore(blockedUsersStores.getRequestId);
    const [queryParams, setQueryParams] = useQueryParams<BlockedUsersQueryParams>(updateQueryValues);
    const deletionReasonsSelectors = Object.values(ReasonDeletion);

    const onIdSearch = (id: string) => {
        setId(id);
        if (id) {
            updateValues({ ...queryParams, disabledUserId: id });
        } else {
            updateValues({ ...queryParams, disabledUserId: undefined });
        }
    };

    const onEmailSearch = (email: string) => {
        setId('');

        if (email) {
            updateValues({ ...queryParams, email });
        } else {
            updateValues({ ...queryParams, email: undefined });
        }
    };

    const onMobileNumberSearch = (mobileNumber: string) => {
        setId('');
        if (mobileNumber) {
            updateValues({ ...queryParams, mobileNumber });
        } else {
            updateValues({ ...queryParams, mobileNumber: undefined });
        }
    };

    const onDateRangeClick = (dateRange: [string, string]) =>
        updateValues({
            ...queryParams,
            fromUtcDisabled: dateRange[0],
            toUtcDisabled: dateRange[1]
        });

    const onFilterByReasonsDeletion = (index: number) => {
        updateValues({
            ...queryParams,
            disablingReasons: index === 0 ? undefined : [index as BULLZ.UserDisablingReason]
        });
    };

    const resetFilters = () => {
        setId('');
        updateValues(defaultDisabledUsersValues);
    };

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    const searchParameters: SearchParameters[] = [
        {
            searchBy: searchUserByIdParameter,
            defaultValue: defaultId,
            placeholder: userIdSearchPlaceholder,
            onSearch: onIdSearch,
            regExp: mongoDbObjectIdRegExp
        },
        {
            searchBy: searchUserByEmailParameter,
            defaultValue: email,
            placeholder: emailSearchPlaceholder,
            onSearch: onEmailSearch,
            accessFilter: [Roles.SuperAdministrator],
            regExp: emailRegExp
        },
        {
            searchBy: searchUserByMobileNumberParameter,
            defaultValue: mobileNumber,
            placeholder: mobileNumberSearchPlaceholder,
            onSearch: onMobileNumberSearch,
            accessFilter: [Roles.SuperAdministrator],
            regExp: mobileNumberRegExp
        }
    ];

    useEffect(() => {
        setQueryParams({
            pageIndex,
            limit,
            disabledUserId: defaultId !== '' ? defaultId : undefined
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, defaultId]);

    return (
        <>
            <SearchWrapperLayout alignCenter>
                <FlexGrow flexGrow="1" marginRight={filterMargin}>
                    <SearchInput searchParameters={searchParameters} />
                </FlexGrow>
            </SearchWrapperLayout>
            <Section alignCenter justifyBetween marginBottom="12px">
                <Row>
                    <MarginWrapper marginRight="51px">
                        <Select
                            defaultIndex={disablingReasons ? disablingReasons[0] : 0}
                            selector={deletionReasonsSelectors}
                            title="Filter by reason for deletion"
                            width="182px"
                            onChange={onFilterByReasonsDeletion}
                        />
                    </MarginWrapper>
                    <Row>
                        <DateRangePicker
                            dateRange={[fromUtcDisabled || '', toUtcDisabled || '']}
                            onChange={onDateRangeClick}
                        />
                    </Row>
                </Row>
                <ResetSearchButton onClick={resetFilters} />
            </Section>

            {children}
            {withoutFooter ? (
                <Pagination
                    currentIndex={pageIndex + 1}
                    defaultSize={limit}
                    pagesLimit={100}
                    totalItems={totalRecords}
                    onSizeChange={onCurrentPageChange}
                />
            ) : (
                <Footer>
                    <Pagination
                        currentIndex={pageIndex + 1}
                        defaultSize={limit}
                        pagesLimit={100}
                        totalItems={totalRecords}
                        onSizeChange={onCurrentPageChange}
                    />
                </Footer>
            )}
        </>
    );
};
