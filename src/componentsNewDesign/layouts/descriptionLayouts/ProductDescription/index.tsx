import { ManagerLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { HashtagsInput } from 'componentsNewDesign/common/inputs/HashtagsInput';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { copyTopicLinkMessage } from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import {
    propertyBlockHorizontalPadding,
    propertyBlockWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import { EditProductPopover } from 'componentsNewDesign/modals/popovers/products/EditProductPopover';
import { UploadProductImgPopover } from 'componentsNewDesign/modals/popovers/products/UploadProductImgPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { DescriptionWrapper } from 'componentsNewDesign/wrappers/DescriptionWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { grey27, grey29, grey7, hoverGrey2 } from 'constants/styles/colors';
import { descriptionPadding, filterMargin } from 'constants/styles/sizes';
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
    // const moreInfoHandleClick = () => history.push(topicsLink + '/' + id);

    return (
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
                    <MarginWrapper marginRight={descriptionPadding}>
                        {/*<ContentWrapper*/}
                        {/*    backgroundColor={grey3}*/}
                        {/*    height="104px"*/}
                        {/*    padding=" 8px 8px 16px 12px"*/}
                        {/*    width="290px"*/}
                        {/*>*/}
                        {/*    <Column noWrap height="100%" width="100%">*/}
                        {/*        <ContentText fontSize={textFontSize} padding="0px 0px 16px 0px" width="260px">*/}
                        {/*            {name}*/}
                        {/*        </ContentText>*/}
                        {/*        <ScrollableWrapper height="100%" overflowY="scroll" paddingRight="4px" width="100%">*/}
                        {/*            {tags?.length ? (*/}
                        {/*                tags.map(item => (*/}
                        {/*                    <RemovableHashtag*/}
                        {/*                        key={item}*/}
                        {/*                        // TODO background={white}*/}
                        {/*                        subject={item}*/}
                        {/*                        text={item}*/}
                        {/*                    />*/}
                        {/*                ))*/}
                        {/*            ) : (*/}
                        {/*                <ContentText color={assistiveTextColor} fontSize={textFontSize}>*/}
                        {/*                    No hashtags*/}
                        {/*                </ContentText>*/}
                        {/*            )}*/}
                        {/*        </ScrollableWrapper>*/}
                        {/*    </Column>*/}
                        {/*</ContentWrapper>*/}
                        <Column>
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
                    </MarginWrapper>

                    <Column>
                        <Section alignCenter justifyBetween height="100%" marginBottom="11px">
                            <MarginWrapper marginRight="8px">
                                <PropertyBlock
                                    copiable
                                    isLink
                                    backgroundColor={grey27}
                                    horizontalPadding={propertyBlockHorizontalPadding}
                                    // linkRoute={topicsLink}
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
                            <Section alignCenter height="100%" marginBottom="-8px">
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
                    {/*            Delete Topic*/}
                    {/*        </SimpleButton>*/}
                    {/*    </AdministratorLayout>*/}
                    {/*</FlexGrow>*/}
                </Section>
                {/* <OverflowAutoLayout>
                    <TableWrapper border={tableDataBorder} borderRadius={tableBorderRadius}>
                        <Table>
                            <TableRow backgroundColor={tableHeaderBackgroundColor}>
                                {/*<TableHeader>Locale</TableHeader>
                                <TableHeader>Default affiliate link</TableHeader>
                                <TableHeader>Priority</TableHeader>
                                <TableHeader>Action</TableHeader>
                            </TableRow>
                            <TableRow borderTop={tableDataBorder} color={assistiveTextColor}>
                                <TableData color={cultureInfo && black} padding={tableDataPadding} width="15%">
                                   <Row alignCenter justifyCenter width="100%">
                                       <EllipsisTableText>{cultureInfo || tableDataPlaceholder}</EllipsisTableText>
                                   </Row>
                                </TableData>
                                <TableData color={url && urlColor} padding={tableDataPadding} width="42%">
                                    <ContentWrapper
                                        backgroundColor={url && urlBackgroundColor}
                                        borderRadius="4px"
                                        padding="0px 4px"
                                    >
                                        <Row alignCenter justifyBetween width="100%">
                                            <EllipsisTableText
                                                alignTextCenter={!url}
                                                color={url && urlColor}
                                                width={(url && '90%') || '100%'}
                                            >
                                                {(url && <ExternalLink href={url} />) || tableDataPlaceholder}
                                            </EllipsisTableText>
                                            {url && (
                                                <MarginWrapper marginLeft="5px">
                                                    <CopyButton
                                                        customCopyIcon={blackCopyIcon}
                                                        subject={url}
                                                        success={'Link was copied'}
                                                    />
                                                </MarginWrapper>
                                            )}
                                        </Row>
                                    </ContentWrapper>
                                </TableData>
                                <TableData padding={tableDataPadding}>
                                    <Row alignCenter justifyCenter width="100%">
                                        <EllipsisTableText color={(priority >= 0 && black) || ''}>
                                            {priority || tableDataPlaceholder}
                                        </EllipsisTableText>
                                    </Row>
                                </TableData>
                                <TableData padding={tableDataPadding} width="30%">
                                    <Row alignCenter justifyCenter>
                                        <Row>
                                            <ManagerLayout>
                                                <CreateDefaultAffiliateLinkPopover id={id} urlData={url}>
                                                    <SimpleButton
                                                        background={black}
                                                        borderRadius={buttonsBorderRadius}
                                                        color={white}
                                                        fontSize={buttonsFontSize}
                                                        fontWeight={buttonsFontWeight}
                                                        height="42px"
                                                        padding={descriptionPadding}
                                                        width="137px"
                                                        onClick={noop}
                                                    >
                                                        {url ? 'Update' : 'Create'} Default Affiliate Link
                                                    </SimpleButton>
                                                </CreateDefaultAffiliateLinkPopover>
                                            </ManagerLayout>
                                        </Row>
                                    </Row>
                                </TableData>
                            </TableRow>
                        </Table>
                    </TableWrapper>
                </OverflowAutoLayout> */}
            </ContentWrapper>
        </DescriptionWrapper>
    );
};
