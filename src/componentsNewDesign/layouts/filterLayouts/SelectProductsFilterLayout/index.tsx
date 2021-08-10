import { CreatePrimaryProductModal } from 'components/modals/formModals/CreatePrimaryProductModal';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { Footer } from 'componentsNewDesign/grid/Footer';
import { selectorWidth } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/constants';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { sortTagsName, sortTagsProductsData, sortTagsProductsValues } from 'constants/filters/sorts';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { productIdSearchPlaceholder, productNameSearchPlaceholder, sortName1 } from 'pages/Products/constants';
import React, { FC, useEffect } from 'react';
import { selectProductsEffects, selectProductsEvents, selectProductsStores } from 'stores/products/selectProducts';
import { videosStores } from 'stores/videos/videos';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';
import { mongoDbObjectIdRegExp } from 'constants/regularExpressions';

interface Props extends TotalRecords, WithoutFooter {}

const { updateValues, setDefaultValues, setIsFirstToFalse, setId } = selectProductsEvents;
const { loadItemById } = selectProductsEffects;

export const SelectProductsFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    //TODO: Fix it when "product/" will be done
    // @ts-ignore Back is broken
    const { pageIndex, limit, name, isReferenced } = useStore(selectProductsStores.values);
    const isFirst = useStore(selectProductsStores.isFirst);
    const defaultId = useStore(selectProductsStores.getRequestId);
    const { id } = useStore(videosStores.video);

    const onProductNameSearch = (name: string) =>
        updateValues({
            //TODO: Fix it when "product/" will be done
            // @ts-ignore Back is broken
            name: name || undefined
        });

    const onIdSearch = (id: string) => {
        setId(id);
        id
            ? loadItemById(id)
            : updateValues({
                  pageIndex: defaultPage
              });
    };
    //TODO: Fix it when "product/" will be done
    // @ts-ignore Back is broken
    const onSortChange = (index: number) => updateValues({ isReferenced: sortTagsProductsValues[index] });

    // const onSortChange = (e: RadioChangeEvent) => {
    //     const sort = e.target.value;
    //     updateValues({
    //         isReferenced: sort === sortTagsProductsValues[0] ? undefined : sort === sortTagsProductsValues[1],
    //         pageIndex: defaultPage
    //     });
    // };

    const resetFilters = () => document.location.reload();

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        if (isFirst) {
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
            searchBy: 'Product ID',
            defaultValue: defaultId,
            placeholder: productIdSearchPlaceholder,
            onSearch: onIdSearch,
            regExp: mongoDbObjectIdRegExp
        }
    ];

    return (
        <>
            {/* <SearchWrapperLayout alignCenter justifyBetween> */}
            <Section alignCenter justifyBetween>
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
                <MarginWrapper marginRight="21px">
                    <ResetSearchButton onClick={resetFilters} />
                </MarginWrapper>
                <CreatePrimaryProductModal id={id || ''} />
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
            </Section>
            {/* </SearchWrapperLayout> */}
            {/* <Section alignCenter> */}
            {/* <NumberValuesRadio
                    defaultValue={isReferenced}
                    name={sortTagsName + sortName1}
                    tagsData={sortTagsProductsData}
                    tagsValues={sortTagsProductsValues}
                    onChange={onSortChange}
                /> */}
            {/* </Section> */}
            <Section marginBottom="20px">
                <TotalBadge quantity={totalRecords} />
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
