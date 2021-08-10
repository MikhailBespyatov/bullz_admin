import blackCopyIcon from 'assets/copy_icon_black.svg';
import { OverflowAutoLayout } from 'components/layouts/OverflowAutoLayout';
import { ManagerLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { HashtagsInput } from 'componentsNewDesign/common/inputs/HashtagsInput';
import { ExternalLink } from 'componentsNewDesign/common/links/ExternalLink';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    copyProductIDMessage,
    noProductImageIconHeight
} from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import {
    assistiveTextColor,
    brandImageHeight,
    buttonsBorderRadius,
    buttonsFontSize,
    buttonsFontWeight,
    propertyBlockHorizontalPadding,
    propertyBlockWidth,
    tableBorderRadius,
    tableDataBorder,
    tableDataPadding,
    tableDataPlaceholder,
    tableHeaderBackgroundColor,
    urlBackgroundColor,
    urlColor
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import {
    EllipsisTableText,
    Table,
    TableData,
    TableHeader,
    TableRow,
    TableWrapper
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/styles';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { CreateAffiliateLinkPopover } from 'componentsNewDesign/modals/popovers/products/CreateAffiliateLinkPopover';
import { CreateDefaultAffiliateLinkPopover } from 'componentsNewDesign/modals/popovers/products/CreateDefaultAffiliateLinkPopover';
import { EditProductPopover } from 'componentsNewDesign/modals/popovers/products/EditProductPopover';
import { UploadProductImgPopover } from 'componentsNewDesign/modals/popovers/products/UploadProductImgPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { DescriptionWrapper } from 'componentsNewDesign/wrappers/DescriptionWrapper';
import { AlignCenter, Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import { productsLink } from 'constants/routes';
import { black, grey3, white } from 'constants/styles/colors';
import { descriptionPadding, filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { loadingStores } from 'stores/loading';
import { modalEffects } from 'stores/modals/asyncModal';
import { productsEffects, productsEvents } from 'stores/products/products';

// const { updateAsyncModalLoading } = modalEvents;

export interface ProductDescriptionProps extends YEAY.ProductResponse, YEAY.AffiliateLinkEntryResponse {}

export const ProductDescription = ({
    id = '',
    name = '',
    // primaryReferencesCount,
    // imageUrl,
    // TODO: NaN -> undefined
    priority = NaN,
    cultureInfo,
    url = '',
    tags = [],
    primaryReferenceCount = 0,
    imageUrl
}: ProductDescriptionProps) => {
    // const [isApplied, toggleIsApplied] = useToggle(false);

    // const { access } = useStore(userStores.auth);

    const loading = useStore(loadingStores.loading);
    const productLoading = useStore(modalEffects.editProductInfo.pending);

    const changeInfoCallBack = (fields: YEAY.UpdateProductRequest) => productsEvents.updateItemById({ id, ...fields });

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
    // const moreInfoHandleClick = () => history.push(productsLink + '/' + id);

    return (
        <DescriptionWrapper marginBottom={filterMargin} marginRight={filterMargin}>
            <ContentWrapper backgroundColor={white} borderRadius="8px" width="100%">
                <Section alignCenter>
                    <ContentWrapper
                        backgroundColor={grey3}
                        height={brandImageHeight}
                        marginRight={descriptionPadding}
                        minWidth="103px"
                        width="103px"
                    >
                        <AlignCenter>
                            <PosterLayout
                                posterWidth={brandImageHeight}
                                src={imageUrl || ''}
                                width={noProductImageIconHeight}
                            />
                        </AlignCenter>
                    </ContentWrapper>
                    <MarginWrapper marginBottom={descriptionPadding} marginRight={descriptionPadding}>
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
                                <Span fontSize="12px" fontWeight="500" lineHeight="12px">
                                    {name}
                                </Span>
                            </Row>
                            <HashtagsInput
                                hashTags={tags || undefined}
                                loading={productLoading || loading}
                                type="product"
                                width="370px"
                                onConfirm={onConfirm}
                            />
                        </Column>
                    </MarginWrapper>

                    <Column>
                        <Section alignCenter justifyBetween height="100%" marginBottom="11px">
                            <PropertyBlock
                                copiable
                                horizontalPadding={propertyBlockHorizontalPadding}
                                linkRoute={productsLink}
                                subtitle={id}
                                success={copyProductIDMessage}
                                title="Copy productID"
                                width={propertyBlockWidth}
                            />
                            <PropertyBlock
                                horizontalPadding={propertyBlockHorizontalPadding}
                                subtitle={primaryReferenceCount.toString()}
                                title="Referenced count"
                                width={propertyBlockWidth}
                            />
                        </Section>
                        <ManagerLayout>
                            <Section alignCenter justifyBetween height="100%">
                                <Row>
                                    <EditProductPopover id={id} name={name || ''} type="down">
                                        <CardButton marginRight={descriptionPadding}>Edit Info</CardButton>
                                    </EditProductPopover>
                                </Row>

                                <Row>
                                    <UploadProductImgPopover id={id} type="down">
                                        <CardButton marginRight={descriptionPadding}>Upload Image</CardButton>
                                    </UploadProductImgPopover>
                                </Row>
                                <Row>
                                    <CreateAffiliateLinkPopover id={id} type="down">
                                        <CardButton>Create affiliate link</CardButton>
                                    </CreateAffiliateLinkPopover>
                                </Row>
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
                <OverflowAutoLayout>
                    <TableWrapper border={tableDataBorder} borderRadius={tableBorderRadius}>
                        <Table>
                            <TableRow backgroundColor={tableHeaderBackgroundColor}>
                                {/*<TableHeader>Locale</TableHeader>*/}
                                <TableHeader>Default affiliate link</TableHeader>
                                <TableHeader>Priority</TableHeader>
                                <TableHeader>Action</TableHeader>
                            </TableRow>
                            <TableRow borderTop={tableDataBorder} color={assistiveTextColor}>
                                {/*<TableData color={cultureInfo && black} padding={tableDataPadding} width="15%">*/}
                                {/*    <Row alignCenter justifyCenter width="100%">*/}
                                {/*        <EllipsisTableText>{cultureInfo || tableDataPlaceholder}</EllipsisTableText>*/}
                                {/*    </Row>*/}
                                {/*</TableData>*/}
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
                </OverflowAutoLayout>
            </ContentWrapper>
        </DescriptionWrapper>
    );
};
