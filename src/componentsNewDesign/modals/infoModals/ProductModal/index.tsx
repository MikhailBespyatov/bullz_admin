import blackCopyIcon from 'assets/copy_icon_black.svg';
import noProductImageIcon from 'assets/no_product_icon.svg';
import history from 'browserHistory';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { TopBar } from 'componentsNewDesign/grid/TopBar';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    copyProductIDMessage,
    noProductImageIconHeight,
    textFontSize
} from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import {
    assistiveTextColor,
    brandImageHeight,
    buttonsBorderRadius,
    buttonsFontSize,
    buttonsFontWeight,
    deleteTitle,
    parseDeleteModalContent,
    parseDeleteSuccessMessage,
    propertyBlockWidth,
    tableBorderRadius,
    tableDataBorder,
    tableDataPadding,
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
import { propertyBlockHorizontalPadding } from 'componentsNewDesign/modals/infoModals/ProductModal/constants';
import { CardWrapper } from 'componentsNewDesign/wrappers/CardWrapper';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { noop } from 'constants/functions';
import { topicsLink } from 'constants/routes';
import { black, errorColor, grey13, grey3, white } from 'constants/styles/colors';
import React from 'react';
import { message } from 'stores/alerts';
import { modalEvents } from 'stores/modals/asyncModal';
import { videosEffects } from 'stores/videos/videos';
import { SubjectType } from 'types/types';

const { updateAsyncModalLoading } = modalEvents;

export interface ProductDescriptionProps extends BULLZ.GetManagedProductResponse, BULLZ.AffiliateLinkEntryResponse {}

export const ProductModal = ({
    id = '',
    name,
    primaryReferencesCount,
    brandImageUrl,
    priority,
    cultureInfo,
    url,
    hashTags = []
}: ProductDescriptionProps) => {
    // const [isApplied, toggleIsApplied] = useToggle(false);

    // const { access } = useStore(userStores.auth);

    const deleteOkHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await videosEffects.removeItemById(subject.toString());
            updateAsyncModalLoading();

            modalEvents.closeAsyncModal();
            message.success(parseDeleteSuccessMessage(id));
        } catch {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
        }
    };

    // const usernameClickHandler = () => history.push(usersLink + '/' + ownerId);

    const deleteHandler = async () => {
        modalEvents.openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContent(id),
            subject: id,
            onOk: deleteOkHandler
        });
        try {
            updateAsyncModalLoading();
            await videosEffects.loadEditInfoItemById(id);
            updateAsyncModalLoading();
        } catch (error) {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
        }
    };
    const moreInfoHandleClick = () => history.push(topicsLink + '/' + id);

    return (
        <CardWrapper width="780px">
            <ContentWrapper backgroundColor={white} borderRadius="8px" padding="20px" width="100%">
                <Section alignCenter marginBottom="30px" marginTop="30px">
                    <ClickableWrapper onClick={noop}>
                        <ContentText color={grey13}>Videos /</ContentText>
                        <ContentText padding="0px 4px 0px 0px">{id}</ContentText>
                    </ClickableWrapper>
                    <CopyButton subject={id} success="Video ID was copied" />
                </Section>
                <Section alignCenter justifyBetween>
                    <ContentWrapper width="300px">
                        <TopBar content={['Video Info', 'Topic Info']} onChange={noop} />
                    </ContentWrapper>
                    <SimpleButton
                        background={errorColor}
                        borderRadius={buttonsBorderRadius}
                        color={white}
                        fontSize={buttonsFontSize}
                        fontWeight={buttonsFontWeight}
                        padding="8px"
                        onClick={deleteHandler}
                    >
                        Delete Topic
                    </SimpleButton>
                </Section>
                <Section marginTop="16px">
                    <ContentWrapper backgroundColor={grey3} height={brandImageHeight} minWidth="103px" width="103px">
                        <ClickableWrapper
                            height={brandImageHeight}
                            title={name || ''}
                            width="100%"
                            onClick={moreInfoHandleClick}
                        >
                            <CustomImg
                                center
                                alt={name || 'Topic image'}
                                height={brandImageUrl ? brandImageHeight : noProductImageIconHeight}
                                src={brandImageUrl || noProductImageIcon}
                            />
                        </ClickableWrapper>
                    </ContentWrapper>
                    <MarginWrapper marginLeft="8px" marginRight="8px">
                        <ContentWrapper
                            backgroundColor={grey3}
                            height="104px"
                            padding=" 8px 8px 16px 12px"
                            width="290px"
                        >
                            <Column noWrap height="100%" width="100%">
                                <ContentText fontSize={textFontSize} padding="0px 0px 16px 0px">
                                    {name}
                                </ContentText>
                                <ScrollableWrapper height="100%" overflowY="scroll" paddingRight="4px" width="100%">
                                    {hashTags?.length ? (
                                        hashTags.map(item => (
                                            <RemovableHashtag
                                                key={item}
                                                // TODO background={white}
                                                subject={item}
                                                text={item}
                                            />
                                        ))
                                    ) : (
                                        <ContentText color={assistiveTextColor} fontSize={textFontSize}>
                                            No hashtags
                                        </ContentText>
                                    )}
                                </ScrollableWrapper>
                            </Column>
                        </ContentWrapper>
                    </MarginWrapper>

                    <Column>
                        <Section alignCenter justifyBetween height="100%" marginBottom="11px">
                            <PropertyBlock
                                copiable
                                horizontalPadding={propertyBlockHorizontalPadding}
                                linkRoute={topicsLink}
                                subtitle={id}
                                success={copyProductIDMessage}
                                title="Copy topicID"
                                width={propertyBlockWidth}
                            />
                            <PropertyBlock
                                horizontalPadding={propertyBlockHorizontalPadding}
                                subtitle={`${primaryReferencesCount}`}
                                title="Referenced count"
                                width={propertyBlockWidth}
                            />
                        </Section>
                        <Section alignCenter justifyBetween height="100%">
                            <CardButton marginRight="8px" onClick={noop /*changeEditableFieldsCallback*/}>
                                Edit Info
                            </CardButton>

                            <CardButton marginRight="8px">Upload Image</CardButton>

                            <CardButton onClick={moreInfoHandleClick}>More Info</CardButton>
                        </Section>
                    </Column>
                </Section>
                <TableWrapper border={tableDataBorder} borderRadius={tableBorderRadius}>
                    <Table>
                        <TableRow backgroundColor={tableHeaderBackgroundColor}>
                            <TableHeader>Locale</TableHeader>
                            <TableHeader>Default affiliate link</TableHeader>
                            <TableHeader>Priority</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                        <TableRow borderTop={tableDataBorder} color={assistiveTextColor}>
                            <TableData color={cultureInfo && black} padding={tableDataPadding} width="100px">
                                <Row alignCenter justifyCenter width="50px">
                                    <EllipsisTableText>{cultureInfo || 'No Content'}</EllipsisTableText>
                                </Row>
                            </TableData>
                            <TableData color={url && urlColor} padding={tableDataPadding} width="370px">
                                <ContentWrapper
                                    backgroundColor={urlBackgroundColor}
                                    borderRadius="4px"
                                    padding="0px 4px"
                                >
                                    <Row alignCenter justifyBetween width="310px">
                                        <EllipsisTableText
                                            alignTextCenter={!url}
                                            color={url && urlColor}
                                            width={(url && '275px') || '100%'}
                                        >
                                            {url || 'No Content'}
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
                            <TableData color={`${priority}` && black} padding={tableDataPadding}>
                                <Row alignCenter justifyCenter width="30px">
                                    <EllipsisTableText>{priority || 'No Content'}</EllipsisTableText>
                                </Row>
                            </TableData>
                            <TableData padding={tableDataPadding} width="190px">
                                <Row alignCenter justifyCenter>
                                    <SimpleButton
                                        background={black}
                                        borderRadius={buttonsBorderRadius}
                                        color={white}
                                        fontSize={buttonsFontSize}
                                        fontWeight={buttonsFontWeight}
                                        padding="8px"
                                        onClick={noop}
                                    >
                                        Create Default Affiliate Link
                                    </SimpleButton>
                                </Row>
                            </TableData>
                        </TableRow>
                    </Table>
                </TableWrapper>
            </ContentWrapper>
        </CardWrapper>
    );
};
