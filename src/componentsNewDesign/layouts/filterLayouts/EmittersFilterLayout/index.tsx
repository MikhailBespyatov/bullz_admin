import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Footer, TrendingsFooter } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import {
    defaultSearchParameters,
    searchEmitterByUserIdParameter,
    searchEmitterByVideoIdParameter
} from 'componentsNewDesign/layouts/filterLayouts/EmittersFilterLayout/constants';
import { SearchMobileWrapper } from 'componentsNewDesign/layouts/filterLayouts/EmittersFilterLayout/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { paginationHeight } from 'componentsNewDesign/layouts/Pagination/constants';
import { FlexGrow } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { mongoDbObjectIdRegExp } from 'constants/regularExpressions';
import { filterMargin, xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import { emittersSearchByUserIdPlaceholder, emittersSearchByVideoIdPlaceholder } from 'pages/Emitters/constants';
import React, { FC, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { emittersEffects, emittersEvents, emittersStores } from 'stores/emitters/emitters';
import { mobileHeaderStores } from 'stores/mobileHeader';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';

const { setId, updateValues, invokeGetEmitters, setIsFirstToFalse } = emittersEvents;
const { loadItemById } = emittersEffects;

const updateQueryValues = ({ ...params }) => {
    updateValues(params);
};

interface Props extends TotalRecords, WithoutFooter {}

export const EmittersFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    const isFirst = useStore(emittersStores.isFirst);
    const { pageIndex, limit } = useStore(emittersStores.values);

    const defaultId = useStore(emittersStores.getRequestId);
    const [queryParams, setQueryParams] = useQueryParams(updateQueryValues);
    console.log(queryParams);

    const isMobile = useMediaQuery({ query: `(max-width: ${xs})` });

    const filterVisible = useStore(mobileHeaderStores.filterVisible);
    const searchVisible = useStore(mobileHeaderStores.searchVisible);

    const onUsernameSearch = (name: string) => {
        setId('');
        emittersEvents.updateValues({
            ...defaultSearchParameters,
            username: name,
            pageIndex: defaultPage
        });
    };

    const onIdSearch = (id: string) => {
        setId(id);
        if (id) {
            updateValues({
                username: undefined,
                email: undefined,
                mobileNumber: undefined
            });
            loadItemById(id);
        } else {
            updateValues({
                pageIndex: defaultPage
            });
        }
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

    const searchParameters: SearchParameters[] = [
        {
            searchBy: searchEmitterByVideoIdParameter,
            defaultValue: '',
            placeholder: emittersSearchByVideoIdPlaceholder,
            onSearch: onUsernameSearch
        },
        {
            searchBy: searchEmitterByUserIdParameter,
            defaultValue: defaultId,
            placeholder: emittersSearchByUserIdPlaceholder,
            onSearch: onIdSearch,
            regExp: mongoDbObjectIdRegExp
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
            limit
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit]);

    return (
        <>
            {!isMobile && (
                <SearchWrapperLayout alignCenter>
                    <FlexGrow flexGrow="1" marginRight={filterMargin}>
                        <SearchInput searchParameters={searchParameters} />
                    </FlexGrow>
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
