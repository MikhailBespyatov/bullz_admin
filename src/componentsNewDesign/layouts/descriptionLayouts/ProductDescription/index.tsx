import { useMediaQuery } from '@material-ui/core';
import { ManagerLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { HashtagsInput } from 'componentsNewDesign/common/inputs/HashtagsInput';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { copyTopicLinkMessage } from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import {
    productCardWidth,
    propertyBlockHorizontalPadding,
    propertyBlockWidth,
    propertyBlockWidthMobile
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import { EditProductPopover } from 'componentsNewDesign/modals/popovers/products/EditProductPopover';
import { UploadProductImgPopover } from 'componentsNewDesign/modals/popovers/products/UploadProductImgPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { DescriptionWrapper } from 'componentsNewDesign/wrappers/DescriptionWrapper';
import { Column, FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { productsLink } from 'constants/routes';
import { grey27, grey29, grey7, hoverGrey2 } from 'constants/styles/colors';
import { descriptionPadding, filterMargin, filterMarginMobile, xxs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { loadingStores } from 'stores/loading';
import { modalEffects } from 'stores/modals/asyncModal';
import { productsEffects, productsEvents } from 'stores/products/products';

// const { updateAsyncModalLoading } = modalEvents;

export interface ProductDescriptionProps extends BULLZ.TopicResponse, BULLZ.AffiliateLinkEntryResponse {
    primaryReferenceCount?: number;
}

export const ProductDescription = ({
    id = '',
    name = '',
    link = '',
    // primaryReferencesCount,
    // imageUrl,
    // TODO: NaN -> undefined
    // priority = NaN,
    // url = '',
    tags = [],
    primaryReferenceCount = 0
}: ProductDescriptionProps) => {
    // const [isApplied, toggleIsApplied] = useToggle(false);
    // const { access } = useStore(userStores.auth);
    const loading = useStore(loadingStores.loading);
    const productLoading = useStore(modalEffects.editProductInfo.pending);

    const changeInfoCallBack = (fields: BULLZ.UpdateTopicRequest) => productsEvents.updateItemById({ id, ...fields });

    const onConfirm = async (hashtags: string[]) => {
        try {
            await productsEffects.loadEditInfoItemById(id);
            await modalEffects.editProductInfo({ onChange: changeInfoCallBack, tags: hashtags, id: id });
            await productsEffects.loadEditInfoItemById(id);
        } catch {}
    };

    const isMobile = useMediaQuery(`(max-width: ${xxs})`);

    // const deleteOkHandler = async (subject: SubjectType) => {
    //     try {
    //         updateAsyncModalLoading();
    //         await videosEffects.removeItemById(subject.toString());
    //         updateAsyncModalLoading();
    //
    //         modalEvents.closeAsyncModal();
    //         message.success(parseDeleteSuccessMessage(id));
    //     } catch {
    //         updateAsyncModalLoading();
    //         modalEvents.closeAsyncModal();
    //     }
    // };

    // const usernameClickHandler = () => history.push(usersLink + '/' + ownerId);

    // const deleteHandler = async () => {
    //     modalEvents.openAsyncModal({
    //         visible: true,
    //         title: deleteTitle,
    //         content: parseDeleteModalContent(id),
    //         subject: id,
    //         onOk: deleteOkHandler
    //     });
    //     try {
    //         updateAsyncModalLoading();
    //         await videosEffects.loadEditInfoItemById(id);
    //         updateAsyncModalLoading();
    //     } catch (error) {
    //         updateAsyncModalLoading();
    //         modalEvents.closeAsyncModal();
    //     }
    // };
    // const moreInfoHandleClick = () => history.push(productsLink + '/' + id);

    return !isMobile ? (
        <DescriptionWrapper
            backgroundColor={grey29}
            marginBottom={filterMargin}
            marginRight={filterMargin}
            padding="28px 24px 23px"
        >
            <ContentWrapper borderRadius="8px" width="100%">
                <Section alignEnd>
                    {/* <ContentWrapper
                        backgroundColor={grey23}
                        height={brandImageHeight}
                        marginRight={descriptionPadding}
                        marginTop="50px"
                        width="103px"
                    >
                        <AlignCenter>
                            <PosterLayout
                                posterWidth={brandImageHeight}
                                src={imageUrl || ''}
                                width={noProductImageIconHeight}
                            />
                        </AlignCenter>
                    </ContentWrapper> */}
                    <Column marginRight={descriptionPadding}>
                        <Row marginBottom="8px" marginTop="8px">
                            <Span fontSize="10px" fontWeight="500" lineHeight="12px">
                                {name}
                            </Span>
                        </Row>
                        <HashtagsInput
                            hashTags={tags || undefined}
                            loading={productLoading || loading}
                            type="product"
                            onConfirm={onConfirm}
                        />
                    </Column>

                    <Column>
                        <Section alignCenter justifyBetween height="100%" marginBottom="7px">
                            <MarginWrapper marginRight="8px">
                                <PropertyBlock
                                    copiable
                                    isLink
                                    backgroundColor={grey27}
                                    horizontalPadding={propertyBlockHorizontalPadding}
                                    linkRoute={productsLink}
                                    subtitle={link || ''}
                                    success={copyTopicLinkMessage}
                                    title="Topic link"
                                    width={propertyBlockWidth}
                                />
                            </MarginWrapper>
                            <PropertyBlock
                                backgroundColor={grey27}
                                horizontalPadding={propertyBlockHorizontalPadding}
                                subtitle={primaryReferenceCount.toString()}
                                title="Referenced count"
                                width={propertyBlockWidth}
                            />
                        </Section>
                        <ManagerLayout>
                            <Section alignCenter height="100%">
                                <Row>
                                    <EditProductPopover id={id} name={name || ''} type="down">
                                        <CardButton
                                            background={grey27}
                                            backgroundHover={hoverGrey2}
                                            color={grey7}
                                            marginRight={descriptionPadding}
                                        >
                                            Edit Link
                                        </CardButton>
                                    </EditProductPopover>
                                </Row>

                                <Row>
                                    <UploadProductImgPopover id={id} type="down">
                                        <CardButton
                                            background={grey27}
                                            backgroundHover={hoverGrey2}
                                            color={grey7}
                                            marginRight={descriptionPadding}
                                        >
                                            Upload Image
                                        </CardButton>
                                    </UploadProductImgPopover>
                                </Row>
                                {/* <Row>
                                    <CreateAffiliateLinkPopover id={id} type="down">
                                        <CardButton>Create affiliate link</CardButton>
                                    </CreateAffiliateLinkPopover>
                                </Row> */}
                            </Section>
                        </ManagerLayout>
                    </Column>
                    {/*<FlexGrow alignEnd>*/}
                    {/*    <AdministratorLayout>*/}
                    {/*        <SimpleButton*/}
                    {/*            background={errorColor}*/}
                    {/*            borderRadius={buttonsBorderRadius}*/}
                    {/*            color={white}*/}
                    {/*            fontSize={buttonsFontSize}*/}
                    {/*            fontWeight={buttonsFontWeight}*/}
                    {/*            padding={descriptionPadding}*/}
                    {/*            onClick={deleteHandler}*/}
                    {/*        >*/}
                    {/*            Delete Product*/}
                    {/*        </SimpleButton>*/}
                    {/*    </AdministratorLayout>*/}
                    {/*</FlexGrow>*/}
                </Section>
            </ContentWrapper>
        </DescriptionWrapper>
    ) : (
        <DescriptionWrapper
            backgroundColor={grey29}
            marginBottom={filterMarginMobile}
            marginRight="0"
            padding="24px 8px 18px"
            width="100%"
        >
            <ContentWrapper borderRadius="8px" width="100%">
                <FlexGrow noWrap>
                    <Section marginBottom="8px" marginTop="8px">
                        <Span fontSize="12px" fontWeight="500" lineHeight="12px">
                            {name}
                        </Span>
                    </Section>
                    <Section marginBottom={descriptionPadding}>
                        <HashtagsInput
                            hashTags={tags || undefined}
                            loading={productLoading || loading}
                            type="product"
                            onConfirm={onConfirm}
                        />
                    </Section>

                    <Section noWrap height="100%" marginBottom="4px">
                        <MarginWrapper marginRight="8px">
                            <PropertyBlock
                                copiable
                                isLink
                                backgroundColor={grey27}
                                horizontalPadding={propertyBlockHorizontalPadding}
                                subtitle={link || ''}
                                success={copyTopicLinkMessage}
                                title="Topic link"
                                width={propertyBlockWidthMobile}
                            />
                        </MarginWrapper>
                        <PropertyBlock
                            backgroundColor={grey27}
                            horizontalPadding={propertyBlockHorizontalPadding}
                            marginBottom="0"
                            subtitle={primaryReferenceCount.toString()}
                            title="Referenced count"
                            width={propertyBlockWidthMobile}
                        />
                    </Section>
                    <ManagerLayout>
                        <Section alignCenter justifyCenter height="100%">
                            <Row marginRight="8px" width={productCardWidth}>
                                <EditProductPopover id={id} name={name || ''} type="down">
                                    <CardButton
                                        background={grey27}
                                        backgroundHover={hoverGrey2}
                                        color={grey7}
                                        marginRight={descriptionPadding}
                                    >
                                        Edit Link
                                    </CardButton>
                                </EditProductPopover>
                            </Row>

                            <Row width={productCardWidth}>
                                <UploadProductImgPopover id={id} type="down">
                                    <CardButton
                                        background={grey27}
                                        backgroundHover={hoverGrey2}
                                        color={grey7}
                                        marginRight={descriptionPadding}
                                    >
                                        Upload Image
                                    </CardButton>
                                </UploadProductImgPopover>
                            </Row>
                        </Section>
                    </ManagerLayout>
                </FlexGrow>
            </ContentWrapper>
        </DescriptionWrapper>
    );
};
