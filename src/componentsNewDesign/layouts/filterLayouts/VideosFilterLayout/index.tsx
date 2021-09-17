import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { CheckboxFilter } from 'componentsNewDesign/common/inputs/CheckboxFilter';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { SortSelector } from 'componentsNewDesign/common/inputs/SortSelector';
import { Footer } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import {
    searchVideoByUserIdParameter,
    searchVideoByVideoIdParameter,
    selectorWidth
} from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/constants';
import { ComponentWrapper } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import {
    sortModeTagsValues,
    sortPrefixArray,
    sortTagsCurationStateData,
    sortTagsCurationStateValues,
    sortTagsName,
    sortTagsValues
} from 'constants/filters/sorts';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import { sortName1, sortName3, userIdSearchPlaceholder, videoIdSearchPlaceholder } from 'pages/Home/constants';
import React, { FC, useEffect } from 'react';
import { videosEffects, videosEvents, videosStores } from 'stores/videos/videos';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';
import { SortType } from 'types/types';

const {
    setId,
    updateValues,
    setSortPostfix,
    setSortPrefix,
    setDefaultValues,
    // invokeGetItems,
    setIsFirstToFalse
    // setIsFirstToTrue
} = videosEvents;
const { loadItemById } = videosEffects;

interface VideosQueryParams extends Partial<YEAY.QueryAllVideosRequest> {
    sortPrefix?: string;
    sortPostfix?: SortType;
    videoId?: string;
}

const updateQueryValues = ({ sortPrefix, sortPostfix, videoId, ...params }: VideosQueryParams) => {
    if (videoId) {
        setId(videoId);
        loadItemById(videoId);
    } else {
        updateValues({
            ...params
        });
        sortPostfix && setSortPostfix(sortPostfix);
        sortPrefix && setSortPrefix(sortPrefix);
    }
};

interface Props extends TotalRecords, WithoutFooter {}

export const VideosFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    const {
        pageIndex,
        limit,
        // searchText,
        creatorId,
        //womValidationStage,
        videoCurationState,
        fromCreatedDateTime,
        toCreatedDateTime,
        sort,
        isTrusted
        // ,isReported,
        // hasHlsStream
    } = useStore(videosStores.values);
    const defaultId = useStore(videosStores.getRequestId);
    const isFirst = useStore(videosStores.isFirst);
    const sortPrefix = useStore(videosStores.sortPrefix);
    const sortPostfix = useStore(videosStores.sortPostfix);

    const [queryParams, setQueryParams] = useQueryParams<VideosQueryParams>(updateQueryValues);

    const onIdSearch = (id: string) => {
        setId(id);
        if (id) {
            updateValues({
                creatorId: undefined
            });
            loadItemById(id);
        } else {
            updateValues({
                pageIndex: defaultPage
            });
        }
    };

    const onUserIdSearch = (id: string) => {
        updateValues({
            creatorId: id || undefined
        });
        setId('');
    };

    const onSortModeChange = (isAscending: boolean) => {
        if ((isAscending ? sortPostfix === '+asc' : sortPostfix === '+desc') && sort) {
            updateValues({
                sort: undefined,
                pageIndex: defaultPage
            });
        } else {
            const mode = isAscending ? sortModeTagsValues[0] : sortModeTagsValues[1];
            setSortPostfix(mode);
            updateValues({
                sort: sortPrefix + mode,
                pageIndex: defaultPage
            });
        }
    };

    const onSortChange = (index: number) => {
        const sortPrefix = sortPrefixArray[index];
        setSortPrefix(sortPrefix);

        sortPrefix !== 'none'
            ? updateValues({
                  sort: sortPrefix + sortPostfix,
                  pageIndex: defaultPage
              })
            : updateValues({
                  sort: undefined,
                  pageIndex: defaultPage
              });
    };

    const onTrustedChange = (isTrusted: boolean) => {
        isTrusted
            ? updateValues({
                  isTrusted,
                  pageIndex: defaultPage
              })
            : updateValues({
                  isTrusted: undefined,
                  pageIndex: defaultPage
              });
    };

    const onSortCurationStateChange = (index: number) =>
        updateValues({ videoCurationState: sortTagsCurationStateValues[index], pageIndex: defaultPage });

    const onDateRangeClick = (dateRange: [string, string]) =>
        updateValues({
            fromCreatedDateTime: dateRange[0],
            toCreatedDateTime: dateRange[1],
            pageIndex: defaultPage
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
        if (isFirst && !queryParams.videoId) {
            setDefaultValues();
            setIsFirstToFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParameters: SearchParameters[] = [
        // {
        //     searchBy: 'Name or Description',
        //     defaultValue: searchText,
        //     placeholder: descriptionSearchPlaceholder,
        //     onSearch: onDescriptionSearch
        // },
        {
            searchBy: searchVideoByVideoIdParameter,
            defaultValue: defaultId,
            placeholder: videoIdSearchPlaceholder,
            onSearch: onIdSearch
        },
        {
            searchBy: searchVideoByUserIdParameter,
            defaultValue: creatorId,
            placeholder: userIdSearchPlaceholder,
            onSearch: onUserIdSearch
        }
    ];

    useEffect(() => {
        setQueryParams({
            sortPostfix,
            sortPrefix,
            pageIndex,
            limit,
            creatorId,
            videoCurationState,
            fromCreatedDateTime,
            toCreatedDateTime,
            isTrusted,
            sort,
            videoId: defaultId !== '' ? defaultId : undefined
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pageIndex,
        limit,
        creatorId,
        videoCurationState,
        fromCreatedDateTime,
        toCreatedDateTime,
        isTrusted,
        sortPostfix,
        sortPrefix,
        sort,
        defaultId
    ]);

    return (
        <>
            <SearchWrapperLayout alignCenter>
                <FlexGrow marginRight={filterMargin}>
                    <SearchInput searchParameters={searchParameters} />
                </FlexGrow>
                <Row alignCenter marginRight="20px">
                    <CheckboxFilter defaultChecked={isTrusted || undefined} onChange={onTrustedChange}>
                        Is trusted
                    </CheckboxFilter>
                </Row>
            </SearchWrapperLayout>
            <Section alignCenter justifyBetween /*noWrap*/>
                <ComponentWrapper>
                    <Select
                        defaultIndex={sortTagsCurationStateValues.findIndex(item => videoCurationState === item)}
                        selector={sortTagsCurationStateData}
                        title={sortTagsName + sortName3}
                        width={selectorWidth}
                        onChange={onSortCurationStateChange}
                    />

                    <Select
                        defaultIndex={sortPrefixArray.findIndex(item => item === sortPrefix)}
                        selector={sortTagsValues}
                        title={sortTagsName + sortName1}
                        width={selectorWidth}
                        onChange={onSortChange}
                    />

                    <DateRangePicker
                        dateRange={[fromCreatedDateTime || '', toCreatedDateTime || '']}
                        onChange={onDateRangeClick}
                    />
                </ComponentWrapper>
                <ComponentWrapper>
                    <SortSelector type={sort ? sortPostfix : undefined} onChange={onSortModeChange} />
                    <ResetSearchButton onClick={resetFilters} />
                </ComponentWrapper>
            </Section>
            {children}
            {withoutFooter ? (
                <Pagination
                    currentIndex={pageIndex + 1}
                    defaultSize={limit}
                    totalItems={totalRecords}
                    onSizeChange={onCurrentPageChange}
                />
            ) : (
                <Footer>
                    <Pagination
                        currentIndex={pageIndex + 1}
                        defaultSize={limit}
                        totalItems={totalRecords}
                        onSizeChange={onCurrentPageChange}
                    />
                </Footer>
            )}
        </>
    );
};
