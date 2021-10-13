import history from 'browserHistory';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { MakePrimaryButton } from 'componentsNewDesign/common/buttons/MakePrimaryButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { VideoCardHashtag } from 'componentsNewDesign/common/tags/Hashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    cardButtonWidth,
    deleteTitle,
    parseDeleteModalContent,
    parseDeleteProductSuccessMessage,
    productSectionHeight
} from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { Tooltip } from 'componentsNewDesign/modals/Tooltip';
import { CardWrapper } from 'componentsNewDesign/wrappers/CardWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { asyncError } from 'constants/notifications';
import { productsLink, topicsLink } from 'constants/routes';
import { darkError, grey27, grey29, grey7, hoverGrey2 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';
import { API } from 'services';
import { message } from 'stores/alerts';
import { copyEvents, copyStores } from 'stores/Copy';
import { modalEffects, modalEvents } from 'stores/modals/asyncModal';
import { productsEffects, productsEvents } from 'stores/products/products';
import { selectProductsEvents } from 'stores/products/selectProducts';
import { videosEffects, videosEvents, videosStores } from 'stores/videos/videos';
import { SubjectType } from 'types/types';
import {
    copyProductIDMessage,
    deleteButtonTextColor,
    infoTextColor,
    propertyBlockWidth,
    textFontSize
} from './constants';

const { updateAsyncModalLoading } = modalEvents;

export interface ProductCardProps extends YEAY.ProductResponse {
    canBeSetAsPrimary?: boolean;
}

export const ProductCard = ({
    id = '',
    name = '',
    tags,
    imageUrl,
    primaryReferenceCount = 0,
    canBeSetAsPrimary
}: ProductCardProps) => {
    const copiedDataId = useStore(copyStores.copiedDataId);
    const video = useStore(videosStores.video);
    //const id = useMemo(() => producId, [productId]);

    const moreInfoHandleClick = () => history.push(topicsLink + '/' + id);

    const onMakePrimaryClick = async () => {
        try {
            selectProductsEvents.setVisibleToFalse();
            await videosEffects.loadEditInfoItemById(video.id || '');
            await modalEffects.editVideoInfo({
                id: video.id || '',
                primaryProductId: id
            });
            await productsEffects.loadSingleItemById(id || '');
            videosEvents.setSingleItem({ ...video, primaryProductId: id });

            message.success('You successfully updated primary product of video');
        } catch {
            message.error(asyncError);
        }
    };

    const deleteOkHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await API.manageProducts.deleteProductById({
                id: subject.toString()
            });
            updateAsyncModalLoading();

            modalEvents.closeAsyncModal();
            message.success(parseDeleteProductSuccessMessage(name || ''));
            productsEvents.deleteItemById(subject.toString());
        } catch {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
            message.error(asyncError);
        }
    };
    // const changeEditableFieldsCallback = (fields: ProductCardEditableFields) =>
    //     productsEvents.updateItemById({ id, ...fields });

    const deleteHandleClick = () =>
        modalEvents.openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContent(name || ''),
            subject: id,
            onOk: deleteOkHandler
        });

    const onCardClick = (e: MouseEvent) => {
        e.stopPropagation();
        copyEvents.setCopiedId(id);
    };

    return (
        <CardWrapper backgroundColor={grey29} isSelected={copiedDataId === id} onClick={onCardClick}>
            <Section
                alignCenter
                justifyCenter
                height={productSectionHeight}
                //marginTop="45px"
                onClick={imageUrl ? undefined : moreInfoHandleClick}
            >
                <PosterLayout posterHeight={productSectionHeight} posterWidth="100%" src={imageUrl || ''} />
            </Section>
            <Column height="100%">
                <ContentText fontSize={textFontSize} padding="8px 18px 4px" width="150px">
                    {name}
                </ContentText>

                <ContentWrapper borderRadius="0px" height="42px" padding="4px 18px 4px" width="100%">
                    <ScrollableWrapper alignCenter noWrap paddingBottom="8px" width="100%">
                        {tags?.length ? (
                            tags.map((item: string) => (
                                <MarginWrapper key={item} marginRight="4px">
                                    <VideoCardHashtag text={item} />
                                </MarginWrapper>
                            ))
                        ) : (
                            <ContentText color={infoTextColor} fontSize={textFontSize} padding="9px 0px 13px">
                                No hashtags
                            </ContentText>
                        )}
                    </ScrollableWrapper>
                </ContentWrapper>
                <ContentWrapper padding="4px 18px 4px" width="100%">
                    <Section alignCenter justifyBetween height="100%">
                        <PropertyBlock
                            copiable
                            backgroundColor={grey27}
                            // titleUppercase
                            linkRoute={productsLink}
                            subtitle={id}
                            success={copyProductIDMessage}
                            title="Product ID"
                            width={propertyBlockWidth}
                        />
                        <PropertyBlock
                            // titleUppercase
                            backgroundColor={grey27}
                            subtitle={primaryReferenceCount.toString()}
                            title="Referenced count"
                            width={propertyBlockWidth}
                        />
                    </Section>
                </ContentWrapper>

                <>
                    <Column width="100%">
                        <ContentWrapper padding="4px 18px 0px" width="100%">
                            <Section justifyBetween={canBeSetAsPrimary} justifyCenter={!canBeSetAsPrimary}>
                                <Row alignCenter justifyAround height="100%" width={cardButtonWidth}>
                                    {/* <EditProductPopover id={id} name={name}>
                                        <CardButton>Edit Info</CardButton>
                                        </EditProductPopover>*/}
                                    {/* <UploadProductImgPopover id={id}>
                                        <CardButton marginLeft="8px" marginRight="8px" width={cardButtonWidth}>
                                            Upload Image
                                        </CardButton>
                                    </UploadProductImgPopover> */}
                                    <CardButton
                                        background={grey27}
                                        backgroundHover={hoverGrey2}
                                        color={grey7}
                                        width="100%"
                                        onClick={moreInfoHandleClick}
                                    >
                                        More Info
                                    </CardButton>
                                </Row>

                                {canBeSetAsPrimary && (
                                    <Row width={cardButtonWidth}>
                                        <Tooltip title="Select this product as a primary" type="top">
                                            <Section justifyCenter>
                                                <MakePrimaryButton width="100%" onClick={onMakePrimaryClick}>
                                                    + Make Primary
                                                </MakePrimaryButton>
                                            </Section>
                                        </Tooltip>
                                    </Row>
                                )}
                            </Section>
                        </ContentWrapper>
                        <AdministratorLayout>
                            <ContentWrapper borderRadius="0px 0px 8px 8px" height="40px" width="100%">
                                <Row alignCenter justifyCenter width="100%">
                                    <SimpleButton
                                        background="transparent"
                                        color={deleteButtonTextColor}
                                        fontSize="14px"
                                        padding="6px 10px 16px"
                                        textHover={darkError}
                                        width="80px"
                                        onClick={deleteHandleClick}
                                    >
                                        Delete
                                    </SimpleButton>
                                </Row>
                            </ContentWrapper>
                        </AdministratorLayout>
                    </Column>
                </>
            </Column>
        </CardWrapper>
    );
};
