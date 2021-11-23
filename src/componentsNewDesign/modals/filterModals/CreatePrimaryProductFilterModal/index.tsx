import addIcon from 'assets/add_icon_grey.svg';
import { Loader } from 'components/common/dynamic/Loader';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { ProductCard } from 'componentsNewDesign/layouts/cards/ProductCard';
import { SelectProductsFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/SelectProductsFilterLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { StyledCardWrapper } from 'componentsNewDesign/modals/filterModals/CreatePrimaryProductFilterModal/styles';
import { Title } from 'componentsNewDesign/modals/filterModals/CreateTrendingUserFilterModal/styles';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { asyncError } from 'constants/notifications';
import { grey6 } from 'constants/styles/colors';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Products/constants';
import React, { FC, useEffect, useMemo } from 'react';
import { message } from 'stores/alerts';
import { createDescriptionVideoCardModal } from 'stores/initialize/initialize.modal.store';
import { modalEffects } from 'stores/modals/asyncModal';
import { productsEffects, productsEvents, productsStores } from 'stores/products/products';
import { selectProductsEvents, selectProductsStores } from 'stores/products/selectProducts';
import { videosEffects, videosEvents, videosStores } from 'stores/videos/videos';
import { Title as ITitle } from 'types/data';

interface ProductCardWrapperProps extends BULLZ.TopicResponse {}

export const ProductCardWrapper: FC<ProductCardWrapperProps> = ({ children, id: productId }) => {
    const video = useStore(videosStores.video);

    const id = useMemo(() => productId, [productId]);

    const handleSelectClick = async () => {
        try {
            selectProductsEvents.setVisibleToFalse();
            await videosEffects.loadEditInfoItemById(video.id || '');
            await modalEffects.editVideoInfo({
                id: video.id || '',
                primaryProductId: id
            });
            await productsEffects.loadSingleItemById(id || '');
            videosEvents.setSingleItem({ ...video, primaryProductId: id });

            message.success('You successfully updated primary topic of video');
        } catch {
            message.error(asyncError);
        }
    };

    return (
        <StyledCardWrapper>
            {children}
            <SimpleButton
                background="transparent"
                border={`1px solid ${grey6}`}
                margin="5px auto"
                width="250px"
                onClick={handleSelectClick}
            >
                <CustomImage src={addIcon} width="15px" />
            </SimpleButton>
        </StyledCardWrapper>
    );
};

interface Props extends ITitle {}

export const CreatePrimaryProductFilterModal = ({ title = 'Select new primary topic' }: Props) => {
    const { items, totalRecords } = useStore(selectProductsStores.products);
    const isFirst = useStore(productsStores.isFirst);
    const { visible } = useStore(createDescriptionVideoCardModal.modal);
    //const loading = useStore(productsStores.loading);
    const loading = useStore(selectProductsStores.loading);

    const { closeModal } = createDescriptionVideoCardModal;

    useEffect(() => {
        !isFirst && productsEvents.setIsFirstToTrue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ModalWrapper
                expanded
                visible={visible}
                width="100%"
                //onOk={() => closeModal()}
                onClose={() => closeModal()}
            >
                <Section marginBottom={filterMargin}>
                    <Title>{title}</Title>
                </Section>
                {/* <ProductsFilterLayout totalRecords={totalRecords}> */}
                <SelectProductsFilterLayout withoutFooter totalRecords={totalRecords}>
                    {/* <Section marginBottom={filterMargin}>
                        <Title>{title}</Title>
                    </Section> */}
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <Section marginBottom={filterMargin}>
                            {items?.length ? (
                                items.map(item => <ProductCard key={item.id + 'select'} {...item} canBeSetAsPrimary />)
                            ) : (
                                <Empty title={notFoundMessage} />
                            )}
                        </Section>
                    )}
                </SelectProductsFilterLayout>
                {/* </ProductsFilterLayout> */}
            </ModalWrapper>
        </>
    );
};
