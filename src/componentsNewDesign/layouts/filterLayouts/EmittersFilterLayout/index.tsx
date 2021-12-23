import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { CheckboxFilter } from 'componentsNewDesign/common/inputs/CheckboxFilter';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Footer, TrendingsFooter } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import {
    searchEmitterByEmitterIdParameter,
    searchEmitterByUserIdParameter,
    searchEmitterByVideoIdParameter
} from 'componentsNewDesign/layouts/filterLayouts/EmittersFilterLayout/constants';
import {
    ComponentWrapper,
    SearchMobileWrapper
} from 'componentsNewDesign/layouts/filterLayouts/EmittersFilterLayout/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { paginationHeight } from 'componentsNewDesign/layouts/Pagination/constants';
import { FlexGrow, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { filterMargin, xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import {
    emittersSearchByEmitterIdPlaceholder,
    emittersSearchByUserIdPlaceholder,
    emittersSearchByVideoIdPlaceholder
} from 'pages/Emitters/constants';
import React, { FC, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { emittersEffects, emittersEvents, emittersStores } from 'stores/emitters/emitters';
import { mobileHeaderStores } from 'stores/mobileHeader';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';

const { setId, updateValues, invokeGetEmitters, setIsFirstToFalse, setDefaultValues } = emittersEvents;
const { loadItemById } = emittersEffects;

const updateQueryValues = ({ videoId, ...params }: any) => {
    if (videoId) {
        setId(videoId);
        loadItemById(videoId);
    } else {
        updateValues({
            ...params
        });
    }
};

interface Props extends TotalRecords, WithoutFooter {}

export const EmittersFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    const isFirst = useStore(emittersStores.isFirst);
    const { pageIndex, limit, userId, videoId, emitId, fromUtcCreated, toUtcCreated, isActive, isPast } = useStore(
        emittersStores.values
    );

    const [queryParams, setQueryParams] = useQueryParams(updateQueryValues);

    const isMobile = useMediaQuery({ query: `(max-width: ${xs})` });

    const filterVisible = useStore(mobileHeaderStores.filterVisible);
    const searchVisible = useStore(mobileHeaderStores.searchVisible);

    const isMd = useMediaQuery({ query: `(max-width: 781px)` });

    const onVideoIdSearch = (id: string) => {
        updateValues({
            emitId: undefined,
            userId: undefined,
            videoId: id || undefined
        });
        setId('');
    };
    const onEmitterIdSearch = (id: string) => {
        updateValues({
            userId: undefined,
            videoId: undefined,
            emitId: id || undefined
        });
        setId('');
    };

    const onUserIdSearch = (id: string) => {
        updateValues({
            emitId: undefined,
            videoId: undefined,
            userId: id || undefined
        });
        setId('');
    };

    const resetFilters = () => {
        setQueryParams({});
        document.location.reload();
    };

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    const onDateRangeClick = (dateRange: [string, string]) =>
        updateValues({
            fromUtcCreated: dateRange[0],
            toUtcCreated: dateRange[1],
            pageIndex: defaultPage
        });

    const onActiveChange = (isActive: boolean) => {
        isActive
            ? updateValues({
                  isActive,
                  pageIndex: defaultPage
              })
            : updateValues({
                  isActive: undefined,
                  pageIndex: defaultPage
              });
    };

    const onPastChange = (isPast: boolean) => {
        isPast
            ? updateValues({
                  isPast,
                  pageIndex: defaultPage
              })
            : updateValues({
                  isPast: undefined,
                  pageIndex: defaultPage
              });
    };

    useEffect(() => {
        if (isFirst && !queryParams.videoId) {
            setDefaultValues();
            setIsFirstToFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParameters: SearchParameters[] = [
        {
            searchBy: searchEmitterByVideoIdParameter,
            defaultValue: videoId,
            placeholder: emittersSearchByVideoIdPlaceholder,
            onSearch: onVideoIdSearch
        },
        {
            searchBy: searchEmitterByUserIdParameter,
            defaultValue: userId,
            placeholder: emittersSearchByUserIdPlaceholder,
            onSearch: onUserIdSearch
        },
        {
            searchBy: searchEmitterByEmitterIdParameter,
            defaultValue: emitId,
            placeholder: emittersSearchByEmitterIdPlaceholder,
            onSearch: onEmitterIdSearch
        }
    ];

    useEffect(() => {
        if (isFirst) {
            invokeGetEmitters();
            setIsFirstToFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setQueryParams({
            pageIndex,
            limit,
            userId,
            videoId,
            emitId,
            fromUtcCreated,
            toUtcCreated,
            isActive,
            isPast
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, userId, videoId, emitId, fromUtcCreated, toUtcCreated, isActive, isPast]);

    return (
        <>
            {!isMobile && (
                <SearchWrapperLayout alignCenter>
                    <FlexGrow flexGrow="1" marginRight={filterMargin}>
                        <SearchInput searchParameters={searchParameters} />
                    </FlexGrow>
                    <Row alignCenter marginRight="20px" marginTop={isMd ? '20px' : '0'}>
                        <CheckboxFilter defaultChecked={isActive || undefined} onChange={onActiveChange}>
                            Is active
                        </CheckboxFilter>
                    </Row>
                    <Row alignCenter marginRight="20px" marginTop={isMd ? '20px' : '0'}>
                        <CheckboxFilter defaultChecked={isPast || undefined} onChange={onPastChange}>
                            Is past
                        </CheckboxFilter>
                    </Row>
                    <ComponentWrapper>
                        <DateRangePicker
                            dateRange={[fromUtcCreated || '', toUtcCreated || '']}
                            onChange={onDateRangeClick}
                        />
                    </ComponentWrapper>
                    <ResetSearchButton onClick={resetFilters} />
                </SearchWrapperLayout>
            )}

            {isMobile && (
                <SearchMobileWrapper isClosed={!searchVisible || filterVisible} paddingTop="25px" width="100%">
                    <SearchInput searchParameters={searchParameters} />
                </SearchMobileWrapper>
            )}
            {children}
            {withoutFooter ? (
                <TrendingsFooter>
                    <Pagination
                        currentIndex={pageIndex + 1}
                        defaultSize={limit}
                        height={paginationHeight}
                        pagesLimit={100}
                        totalItems={totalRecords}
                        onSizeChange={onCurrentPageChange}
                    />
                </TrendingsFooter>
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
