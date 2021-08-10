import { Loader } from 'components/common/dynamic/Loader';
import { CatalogGrid } from 'componentsNewDesign/grid/CatalogGrid/styles';
import { ProductCard } from 'componentsNewDesign/layouts/cards/ProductCard';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { ProductsFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/ProductsFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Products/constants';
import React from 'react';
import { productsStores } from 'stores/products/products';

export const Products = () => {
    const { items, totalRecords } = useStore(productsStores.products);
    const loading = useStore(productsStores.initialLoading);

    return (
        <MainLayout>
            <ProductsFilterLayout totalRecords={totalRecords}>
                <CatalogContainer totalRecords={totalRecords}>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <CatalogGrid>
                            {items?.length ? (
                                items.map(item => <ProductCard key={item.id} {...item} />)
                            ) : (
                                <Empty title={notFoundMessage} />
                            )}
                        </CatalogGrid>
                    )}
                </CatalogContainer>
            </ProductsFilterLayout>
        </MainLayout>
    );
};
