import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { Footer } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import { searchProductByIdParameter } from 'componentsNewDesign/layouts/filterLayouts/ProductsFilterLayout/constants';
import { selectorWidth } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/constants';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { FlexGrow } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { sortTagsName, sortTagsProductsData, sortTagsProductsValues } from 'constants/filters/sorts';
import { mongoDbObjectIdRegExp } from 'constants/regularExpressions';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import { productIdSearchPlaceholder, productNameSearchPlaceholder, sortName1 } from 'pages/Products/constants';
import React, { FC, useEffect } from 'react';
import { productsEffects, productsEvents, productsStores } from 'stores/products/products';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';

const { updateValues, setDefaultValues, setIsFirstToFalse, setId } = productsEvents;
const { loadItemById } = productsEffects;

interface ProductsQueryParams extends Partial<BULLZ.QueryTopicsRequest> {
    productId?: string;
    isReferenced?: boolean;
}

const updateQueryValues = ({ productId, ...params }: ProductsQueryParams) => {
    if (productId) {
        setId(productId);
        loadItemById(productId);
    } else {
        updateValues(params);
    }
};

interface Props extends TotalRecords, WithoutFooter {}

export const ProductsFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    //TODO: Fix it when "product/" will be done
    // @ts-ignore Back is broken
    const { pageIndex, limit, name, isReferenced } = useStore(productsStores.values);
    const isFirst = useStore(productsStores.isFirst);
    const defaultId = useStore(productsStores.getRequestId);

    const [
        { productId, limit: queryParamLimit, pageIndex: queryParamPageIndex },
        setQueryParams
    ] = useQueryParams<ProductsQueryParams>(updateQueryValues);

    // const { id } = useStore(videosStores.video);

    const onProductNameSearch = (name: string) => {
        updateValues({
            //TODO: Fix it when "product/" will be done
            // @ts-ignore Back is broken
            name: name || undefined
        });
        setId('');
    };

    const onIdSearch = (id: string) => {
        setId(id);
        if (id) {
            updateValues({
                name: undefined
            });
            loadItemById(id);
        } else {
            updateValues({
                pageIndex: defaultPage
            });
        }
    };
    //TODO: Fix it when "product/" will be done
    // @ts-ignore Back is broken
    const onSortChange = (index: number) => updateValues({ isReferenced: sortTagsProductsValues[index] });

    const resetFilters = () => {
        setQueryParams({});
        document.location.reload();
    };

    const onCurrentPageChange: (page: number, pageSize: number | undefined) => void = (page, pageSize) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        if (isFirst && !productId && queryParamLimit !== defaultLimit && queryParamPageIndex !== defaultPage) {
            setDefaultValues();
            setIsFirstToFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParameters: SearchParameters[] = [
        {
            searchBy: 'Name',
            defaultValue: name || '',
            placeholder: productNameSearchPlaceholder,
            onSearch: onProductNameSearch
        },
        {
            searchBy: searchProductByIdParameter,
            defaultValue: defaultId,
            placeholder: productIdSearchPlaceholder,
            onSearch: onIdSearch,
            regExp: mongoDbObjectIdRegExp
        }
    ];

    useEffect(() => {
        setQueryParams({
            pageIndex,
            limit,
            name,
            isReferenced,
            productId: defaultId !== '' ? defaultId : undefined
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, name, isReferenced, defaultId]);

    return (
        <>
            <SearchWrapperLayout alignCenter justifyBetween>
                <FlexGrow flexGrow="1" marginRight={filterMargin}>
                    <SearchInput searchParameters={searchParameters} />
                </FlexGrow>
                <MarginWrapper marginBottom={filterMargin} marginRight={filterMargin}>
                    <Select
                        defaultIndex={sortTagsProductsValues.findIndex(item => item === isReferenced)}
                        selector={sortTagsProductsData}
                        title={sortTagsName + sortName1}
                        width={selectorWidth}
                        onChange={onSortChange}
                    />
                </MarginWrapper>
                <ResetSearchButton onClick={resetFilters} />

                {/*<SearchCell lg={6}>*/}
                {/*    <Search*/}
                {/*        defaultValue={name || ''}*/}
                {/*        placeholder={productNameSearchPlaceholder}*/}
                {/*        onSearch={onProductNameSearch}*/}
                {/*    />*/}
                {/*</SearchCell>*/}
                {/*<SearchCell removePaddingRight lg={6}>*/}
                {/*    <Search defaultValue={defaultId} placeholder={productIdSearchPlaceholder} onSearch={onIdSearch} />*/}
                {/*</SearchCell>*/}
            </SearchWrapperLayout>
            {/* <Section alignCenter> */}
            {/* <NumberValuesRadio
                    defaultValue={isReferenced}
                    name={sortTagsName + sortName1}
                    tagsData={sortTagsProductsData}
                    tagsValues={sortTagsProductsValues}
                    onChange={onSortChange}
                /> */}
            {/* </Section> */}

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
