import { Footer } from 'components/grid/Footer';
import {
    defaultSearchParameters,
    searchByUserIdParameter,
    searchByVideoIdParameter
} from 'components/layouts/filterLayouts/StatisticsFilterLayout/constants';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { CheckboxFilter } from 'componentsNewDesign/common/inputs/CheckboxFilter';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import { ComponentWrapper } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import { userIdSearchPlaceholder, videoIdSearchPlaceholder } from 'pages/Statistics/constants';
import { usernameSearchPlaceholder } from 'pages/Users/constants';
import React, { FC, useEffect } from 'react';
import { statisticsEvents, statisticsStores } from 'stores/statistics/statistics';
import { SearchParameters, TotalRecords } from 'types/data';

const { setDefaultValues, updateIsFirst, updateValues } = statisticsEvents;

interface StatisticsQueryParams extends Partial<BULLZ.QueryVideoStatisticsRequest> {
    //userId?: string;
}

const updateQueryValues = (params: StatisticsQueryParams) => {
    updateValues(params);
};

interface Props extends TotalRecords {}

export const StatisticsFilterLayout: FC<Props> = ({ totalRecords, children }) => {
    const {
        videoId,
        userId,
        utcStart,
        utcEnd,
        username,
        isUserDisabled,
        isUserTrusted,
        isVideoDeleted,
        pageIndex,
        limit
    } = useStore(statisticsStores.values);
    const isFirst = useStore(statisticsStores.isFirst);

    const [
        {
            limit: queryParamLimit,
            pageIndex: queryParamPageIndex,
            utcEnd: queryParamUtcEnd,
            utcStart: queryParamUtcStart
        },
        setQueryParams
    ] = useQueryParams<StatisticsQueryParams>(updateQueryValues);

    const onVideoIdSearch = (id: string) =>
        updateValues({
            ...defaultSearchParameters,
            videoId: id || undefined
        });

    const onUserIdSearch = (id: string) =>
        updateValues({
            ...defaultSearchParameters,
            userId: id || undefined
        });

    const onUsernameSearch = (name: string) =>
        updateValues({
            ...defaultSearchParameters,
            username: name || undefined
        });

    const onDateRangeClick = (dateRange: [string, string]) =>
        updateValues({
            utcStart: dateRange[0],
            utcEnd: dateRange[1],
            pageIndex: defaultPage
        });

    const onIsTrustedChange = (checked: boolean) =>
        updateValues({
            isUserTrusted: checked || undefined
        });

    const onIsDisabledChange = (checked: boolean) =>
        updateValues({
            isUserDisabled: checked || undefined
        });

    const onIsDeletedChange = (checked: boolean) =>
        updateValues({
            isVideoDeleted: checked || undefined
        });

    const resetFilters = () => {
        setQueryParams({});
        document.location.reload();
    };

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        if (
            isFirst &&
            queryParamLimit !== defaultLimit &&
            queryParamPageIndex !== defaultPage &&
            !queryParamUtcEnd &&
            !queryParamUtcStart
        ) {
            setDefaultValues();
            updateIsFirst();
        }
        if (videoId || userId) {
            setDefaultValues();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParameters: SearchParameters[] = [
        {
            searchBy: searchByVideoIdParameter,
            defaultValue: videoId,
            placeholder: videoIdSearchPlaceholder,
            onSearch: onVideoIdSearch
        },
        {
            searchBy: searchByUserIdParameter,
            defaultValue: userId,
            placeholder: userIdSearchPlaceholder,
            onSearch: onUserIdSearch
        },
        {
            searchBy: 'Username',
            defaultValue: username,
            placeholder: usernameSearchPlaceholder,
            onSearch: onUsernameSearch
        }
    ];

    useEffect(() => {
        setQueryParams({
            videoId,
            userId,
            utcStart,
            utcEnd,
            username,
            isUserDisabled: isUserDisabled || undefined,
            isUserTrusted: isUserTrusted || undefined,
            isVideoDeleted: isVideoDeleted || undefined,
            pageIndex,
            limit
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, userId, utcStart, utcEnd, username, isUserDisabled, isUserTrusted, isVideoDeleted, pageIndex, limit]);

    return (
        <>
            <SearchWrapperLayout alignCenter>
                <FlexGrow marginRight={filterMargin}>
                    <SearchInput searchParameters={searchParameters} />
                </FlexGrow>
            </SearchWrapperLayout>
            <Section alignCenter justifyBetween>
                <Row alignCenter>
                    <ComponentWrapper>
                        <DateRangePicker dateRange={[utcStart || '', utcEnd || '']} onChange={onDateRangeClick} />
                    </ComponentWrapper>
                    <Row alignCenter marginRight="40px">
                        <CheckboxFilter defaultChecked={isUserTrusted || undefined} onChange={onIsTrustedChange}>
                            User is trusted
                        </CheckboxFilter>
                    </Row>
                    <Row alignCenter marginRight="40px">
                        <CheckboxFilter defaultChecked={isUserDisabled || undefined} onChange={onIsDisabledChange}>
                            User is deleted
                        </CheckboxFilter>
                    </Row>
                    <Row alignCenter marginRight="40px">
                        <CheckboxFilter defaultChecked={isVideoDeleted || undefined} onChange={onIsDeletedChange}>
                            Video is deleted
                        </CheckboxFilter>
                    </Row>
                </Row>
                <ComponentWrapper>
                    <ResetSearchButton onClick={resetFilters} />
                </ComponentWrapper>
            </Section>
            <Section marginBottom="20px">
                {totalRecords !== undefined && <TotalBadge quantity={totalRecords} />}
            </Section>
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
