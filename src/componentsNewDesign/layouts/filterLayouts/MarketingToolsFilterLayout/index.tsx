import { Footer } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { useStore } from 'effector-react';
import React, { FC, useEffect } from 'react';
import { promotionsEvents, promotionsStores } from 'stores/promotions/promotions';
import { TotalRecords, WithoutFooter } from 'types/data';

const { /*setId,*/ updateValues, /*setDefaultValues,*/ invokeGetItems, setIsFirstToFalse } = promotionsEvents;
//const { loadItems } = promotionsEffects;

interface MarketingToolsQueryParams extends YEAY.QueryAdminPromotionRequest {
    // promotionName?: string;
}

// const updateQueryValues = ({ /*promotionName, Id,*/ pageIndex, limit }: MarketingToolsQueryParams) =>
//     updateValues({
//         pageIndex,
//         limit
//     });

interface Props extends TotalRecords, WithoutFooter {}

export const MarketingToolsFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    const { pageIndex, limit } = useStore(promotionsStores.values);
    //const defaultId = useStore(promotionsStores.getRequestId);
    const isFirst = useStore(promotionsStores.isFirst);

    //const [queryParams, setQueryParams] = useQueryParams<MarketingToolsQueryParams>(updateQueryValues);

    //const onIdSearch = (/*id: string*/) => {
    // setId(id);
    // if (id) {
    //     updateValues({
    //         Id: undefined
    //     });
    //     loadItemById(id);
    // } else {
    //     updateValues({
    //         pageIndex: defaultPage
    //     });
    // }
    //};

    //const onNameSearch = (/*name: string*/) => {
    // updateValues({
    //     creatorId: id || undefined
    // });
    // setId('');
    //};

    // const resetFilters = () => {
    //setQueryParams({});
    //document.location.reload();
    //     setDefaultValues();
    // };

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        if (isFirst) {
            invokeGetItems();
            setIsFirstToFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const searchParameters: SearchParameters[] = [
    //     {
    //         searchBy: 'Promotion Name',
    //         defaultValue: defaultId,
    //         placeholder: promotionNameSearchPlaceholder,
    //         onSearch: onNameSearch
    //     },
    //     {
    //         searchBy: 'Promotion ID',
    //         defaultValue: defaultId,
    //         placeholder: promotionIdSearchPlaceholder,
    //         onSearch: onIdSearch
    //     }
    // ];

    // useEffect(() => {
    //     setQueryParams({
    //         pageIndex,
    //         limit
    //         //defaultId
    //         //promotionName,
    //         //Id: defaultId !== '' ? defaultId : undefined
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pageIndex, limit /*defaultId*/]);

    return (
        <>
            <SearchWrapperLayout alignCenter>
                {/* <FlexGrow marginRight={filterMargin}>
                    <SearchInput searchParameters={searchParameters} />
                </FlexGrow>
                <ResetSearchButton onClick={resetFilters} /> */}
            </SearchWrapperLayout>

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
