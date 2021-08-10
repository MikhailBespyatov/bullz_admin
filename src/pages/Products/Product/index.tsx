import { Loader } from 'components/common/dynamic/Loader';
import { ProductVideosFilterLayout } from 'components/layouts/filterLayouts/ProductVideosFilterLayout';
import { DropdownColumn, DropdownSection } from 'componentsNewDesign/common/dropdowns/SectionDropdown';
import { AffiliateLinksTable } from 'componentsNewDesign/common/tables/AffiliateLinksTable';
import { VideoCard } from 'componentsNewDesign/layouts/cards/VideoCard';
import { ProductDescription } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { asyncError, videosNotFoundMessage } from 'constants/notifications';
import { descriptionPadding, filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { notFoundMessage, parseDeleteModalContent } from 'pages/Products/Product/constants';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { affiliateLinksEffects, affiliateLinksStores } from 'stores/products/affiliateLinks';
import { productsEffects, productsEvents, productsStores } from 'stores/products/products';
import { productVideosEvents, productVideosStores } from 'stores/videos/productVideos';
import { Id } from 'types/data';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { modalEvents } from 'stores/modals/asyncModal';
import { SubjectType } from 'types/types';
import { API } from 'services';
import { deleteTitle, parseDeleteProductSuccessMessage } from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import { message } from 'stores/alerts';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { errorColor, white } from 'constants/styles/colors';
import {
    buttonsBorderRadius,
    buttonsFontSize,
    buttonsFontWeight
} from 'componentsNewDesign/common/tables/AffiliateLinksTable/constants';
import { buttonsPadding } from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';

interface ParamsProps {
    productId: string;
}

interface Props extends Id {}

// const AffiliateLinks = ({ id }: Props) => {
//     const affiliateLinks = useStore(affiliateLinksStores.items);
//     const loading = useStore(affiliateLinksStores.loading);

//     useEffect(() => {
//         id && affiliateLinksEffects.getItemsByProductId(id);
//     }, [id]);

//     return (
//         <>
//             {loading ? (
//                 <Loader size="large" />
//             ) : affiliateLinks?.productId !== id ? (
//                 <AffiliateLinksTable {...affiliateLinks} empty productId={id} />
//             ) : (
//                 <AffiliateLinksTable {...affiliateLinks} />
//             )}
//         </>
//     );
// };

const { openAsyncModal, updateAsyncModalLoading } = modalEvents;

export const Product = () => {
    const { productId } = useParams<ParamsProps>();
    const product = useStore(productsStores.product);
    const affiliateLinks = useStore(affiliateLinksStores.items);
    const { items, totalRecords } = useStore(productVideosStores.items);
    const loading = useStore(productsStores.loading);
    const linksLoading = useStore(affiliateLinksStores.loading);
    const videosLoading = useStore(productVideosStores.initialLoading);

    useEffect(() => {
        productsEffects.loadSingleItemById(productId);
    }, [productId]);

    useEffect(() => {
        if (productId === product.id) {
            productVideosEvents.updateValues({
                productId: product.id
            });
            productId && affiliateLinksEffects.getItemsByProductId(productId);
        }
    }, [product, productId]);

    const deleteOkProductHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await API.manageProducts.deleteProductById({
                id: subject.toString()
            });
            updateAsyncModalLoading();

            modalEvents.closeAsyncModal();
            message.success(parseDeleteProductSuccessMessage(product.name || ''));
            productsEvents.deleteItemById(subject.toString());
        } catch {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
            message.error(asyncError);
        }
    };

    const deleteProductHandler = () =>
        openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContent(product.name || ''),
            subject: product.id || '',
            onOk: deleteOkProductHandler
        });

    return (
        <SingleMainLayout>
            {loading ? (
                <Section justifyCenter>
                    <Loader size="large" />
                </Section>
            ) : productId === product.id ? (
                <Column marginRight={filterMargin} width="100%">
                    <Section justifyEnd>
                        <Row marginBottom="20px" marginRight={filterMargin}>
                            <AdministratorLayout>
                                <SimpleButton
                                    background={errorColor}
                                    borderRadius={buttonsBorderRadius}
                                    color={white}
                                    fontSize={buttonsFontSize}
                                    fontWeight={buttonsFontWeight}
                                    marginRight={descriptionPadding}
                                    padding={buttonsPadding}
                                    onClick={deleteProductHandler}
                                >
                                    Delete Product
                                </SimpleButton>
                            </AdministratorLayout>
                        </Row>
                    </Section>
                    <ProductDescription {...product} {...affiliateLinks.defaultEntry} />
                    {/* * wrapper for dropdown sections (first-child) */}
                    <DropdownColumn>
                        <DropdownSection title="Affiliate links">
                            {linksLoading ? (
                                <Section justifyCenter>
                                    <Loader size="large" />
                                </Section>
                            ) : (
                                <AffiliateLinksTable
                                    {...affiliateLinks}
                                    empty={productId !== affiliateLinks.productId}
                                />
                            )}
                        </DropdownSection>
                        <DropdownSection title="Product videos">
                            <ProductVideosFilterLayout totalRecords={totalRecords}>
                                {videosLoading ? (
                                    <Section justifyCenter>
                                        <Loader size="large" />
                                    </Section>
                                ) : (
                                    <>
                                        <Section>
                                            {items?.length ? (
                                                items.map(item => <VideoCard key={item.id} {...item} />)
                                            ) : (
                                                <Empty title={videosNotFoundMessage} />
                                            )}
                                        </Section>
                                    </>
                                )}
                            </ProductVideosFilterLayout>
                        </DropdownSection>
                    </DropdownColumn>
                </Column>
            ) : (
                <Empty title={notFoundMessage} />
            )}
        </SingleMainLayout>
    );
};
