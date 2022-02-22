import { useMediaQuery } from '@material-ui/core';
import commentsIcon from 'assets/comments_icon.svg';
import likesIcon from 'assets/likes_icon.svg';
import savesIcon from 'assets/saves_icon.svg';
import sharesIcon from 'assets/shares_icon.svg';
import viewsIcon from 'assets/views_icon.svg';
import history from 'browserHistory';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { VideoCardButton } from 'componentsNewDesign/common/buttons/VideoCardButton';
import { VideoContainer } from 'componentsNewDesign/common/dividers/VideoContainer';
import { BannedIcon } from 'componentsNewDesign/common/icons/BannedIcon';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { VideoCardHashtag } from 'componentsNewDesign/common/tags/Hashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { DateContent, PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { BlockTitle } from 'componentsNewDesign/layouts/blocks/PropertyBlock/styles';
import {
    deleteTitle,
    formatEngagementStatisticsValues,
    parseDeleteModalContent,
    parseDeleteSuccessMessage,
    popularityIndicatorTextHorizontalPadding,
    propertyBlockHorizontalPadding,
    propertyBlockWidth,
    rejectionReasonText,
    statuses,
    textFontSize,
    videoCardButtonWidth
} from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { UserNickName } from 'componentsNewDesign/layouts/cards/VideoCard/styles';
import { CuratePopoverLayout } from 'componentsNewDesign/modals/popovers/CuratePopover';
import { CardWrapper } from 'componentsNewDesign/wrappers/CardWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { Roles } from 'constants/defaults/users';
import { homeLink, usersLink } from 'constants/routes';
import {
    blue,
    darkError,
    errorColor,
    grey27,
    grey29,
    grey30,
    grey32,
    grey4,
    grey7,
    white
} from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';
import { message } from 'stores/alerts';
import { copyEvents, copyStores } from 'stores/Copy';
import { videoHashtagsEditorModal } from 'stores/initialize/initialize.modal.store';
import { modalEvents } from 'stores/modals/asyncModal';
import { userStores } from 'stores/users/user';
import { videosEffects } from 'stores/videos/videos';
import { SubjectType } from 'types/types';
import { getDiffDateMoreDateNow, triggerCopy } from 'utils/usefulFunctions';

const { updateAsyncModalLoading } = modalEvents;

// interface Props extends LanguagesOfAudioProps {
//     children?: string[];
// }

// export const LanguagesOfAudio = ({ children, color }: Props) => <BlockTitle color={color}>{children}</BlockTitle>;

export interface Props
    extends Omit<BULLZ.AdminGetProductVideoResponse, 'userInfo'>,
        Omit<BULLZ.AdminGetVideoResponse, 'userInfo'> {
    isBlocked?: boolean; // TODO have no end point yet
    isUserVideos?: boolean;
}

export const VideoCard = ({ isUserVideos, ...video }: Props) => {
    const {
        id = '',
        ownerId,
        //primaryProductId,
        streaming,
        validation,
        thumbnailUrl,
        username,
        engagementStatistics,
        utcUploaded = '',
        audioLanguages,
        hashTags = [],
        isBlocked, // TODO have no end point yet
        isDeleted,
        isTrusted
    } = video;
    const { access } = useStore(userStores.auth);
    const copiedDataId = useStore(copyStores.copiedDataId);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);
    const screenGrabUrl = streaming?.details?.screenGrabUrl || '';
    const videoSrc = streaming?.details?.hlsUrl;
    // const grading = validation?.wom?.grading?.consensus;
    // *  0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
    const curationState = validation?.bullz?.curationState;
    // *  0 = None; 1 = DeclineRequested; 2 = Inappropriate; 3 = GraphicContent; 4 = Violence; 5 = Copyright; 6 = TestVideo; 7 = IncorrectFormat; 8 = UserRequested; 9 = Other; 10 = NotProductRecommendation
    const curationEndedReason = validation?.bullz?.curationEndedReason || 0;
    const showErrorButton =
        getDiffDateMoreDateNow(utcUploaded) &&
        streaming?.isReady === false &&
        streaming?.details?.isReadyForStreaming === false &&
        streaming?.details?.hlsUrl === '';

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
    // const changeInfoCallBack = (fields: VideoCardEditableFields) => videosEvents.updateItemById({ id, ...fields });
    // const validateCallBack = (fields: VideoCurateEditableFields) =>
    //    videosEvents.updateCurationStateById({ id, curationState: fields.curationState });
    const moreInfoHandleClick = () => history.push(homeLink + '/' + id);
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

    const onEditClick = (id: string, hashTags: string[]) => {
        videoHashtagsEditorModal.openModal({ id, hashTags });
    };

    const onCardClick = (e: MouseEvent) => {
        e.stopPropagation();
        copyEvents.setCopiedId(id);
    };

    const onErrorClick = () => {
        triggerCopy(JSON.stringify(video));
    };

    return (
        <CardWrapper
            backgroundColor={grey29}
            border={(isUserVideos && grey27) || undefined}
            disabled={isDeleted}
            isSelected={copiedDataId === id}
            onClick={onCardClick} /*width="100%"*/
        >
            <Column height="100%">
                <ContentWrapper
                    backgroundColor={grey29}
                    borderRadius="8px 8px 0px 0px"
                    minHeight="226px"
                    padding="14px 11px 8px 8px"
                    width="100%"
                >
                    <Row alignCenter justifyBetween noWrap height="20px" /*width="345"*/>
                        <Row alignCenter noWrap>
                            <UserNickName to={usersLink + '/' + ownerId}>{username}</UserNickName>
                            {isBlocked && (
                                <MarginWrapper marginLeft="10px">
                                    <BannedIcon />
                                </MarginWrapper>
                            )}
                            {isTrusted && (
                                <MarginWrapper marginLeft="10px" marginRight="10px">
                                    <TrustedIcon />
                                </MarginWrapper>
                            )}
                        </Row>
                        <Row alignCenter justifyEnd /*maxWidth="212px"*/ width="150px">
                            <ContentText
                                uppercase
                                color={
                                    (isDeleted && statuses[4].color) ||
                                    (curationState !== undefined && statuses[curationState].color) ||
                                    'white'
                                }
                                fontSize={textFontSize}
                            >
                                {(isDeleted && statuses[4].text) ||
                                    (curationState === 3 && `${rejectionReasonText[curationEndedReason]}`) ||
                                    (curationState !== undefined && statuses[curationState].text)}
                            </ContentText>
                        </Row>
                    </Row>
                    <ContentWrapper padding="18px 0px 10px" width="100%">
                        <RelativeWrapper>
                            <VideoContainer
                                height="250px"
                                minWidth="100px"
                                screenGrabUrl={screenGrabUrl}
                                thumbnailUrl={thumbnailUrl}
                                videoSrc={videoSrc || ''}
                                width="100%"
                            />

                            {/*{!startLoading && videoSrc && hlsIsSupported && <PlayButton onClick={goLoading} />}*/}
                            {/*<Row alignCenter justifyCenter height="250px" maxWidth="345px" minWidth="100px">*/}
                            {/*    <Video*/}
                            {/*        ref={video}*/}
                            {/*        controls={!!videoSrc && hlsIsSupported}*/}
                            {/*        poster={*/}
                            {/*            videoSrc && hlsIsSupported ? thumbnailUrl || screenGrabUrl || '' : noVideoPoster*/}
                            {/*        }*/}
                            {/*        preload="metadata"*/}
                            {/*    />*/}
                            {/*</Row>*/}
                            {showErrorButton && (
                                <AbsoluteWrapper bottom="-33px" right="6px">
                                    <SimpleButton
                                        background={errorColor}
                                        color={white}
                                        height="25px"
                                        width="50px"
                                        onClick={onErrorClick}
                                    >
                                        ERROR
                                    </SimpleButton>
                                </AbsoluteWrapper>
                            )}
                        </RelativeWrapper>
                    </ContentWrapper>

                    <Section alignCenter justifyBetween height="12px">
                        {curationState === 2 && (
                            <>
                                <Row alignCenter>
                                    <CustomImg alt="Likes" height="12px" src={likesIcon} width="13px" />
                                    <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                        {formatEngagementStatisticsValues(engagementStatistics?.likes || 0)}
                                    </ContentText>
                                </Row>

                                <Row alignCenter>
                                    <CustomImg alt="Saves" height="12px" src={savesIcon} width="10px" />
                                    <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                        {formatEngagementStatisticsValues(engagementStatistics?.saves || 0)}
                                    </ContentText>
                                </Row>

                                <Row alignCenter>
                                    <CustomImg alt="Views" height="12px" src={viewsIcon} width="13px" />
                                    <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                        {formatEngagementStatisticsValues(engagementStatistics?.views || 0)}
                                    </ContentText>
                                </Row>

                                <Row alignCenter>
                                    <CustomImg alt="Comments" height="12px" src={commentsIcon} width="13px" />
                                    <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                        {formatEngagementStatisticsValues(engagementStatistics?.commentCount || 0)}
                                    </ContentText>
                                </Row>

                                <Row alignCenter>
                                    <CustomImg alt="Shares" height="12px" src={sharesIcon} width="12px" />
                                    <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                        {formatEngagementStatisticsValues(engagementStatistics?.shares || 0)}
                                    </ContentText>
                                </Row>
                            </>
                        )}
                    </Section>
                </ContentWrapper>

                {/* <ContentWrapper borderRadius="0px" padding="8px 10px 0px" width="100%"> */}
                <Section alignCenter justifyBetween marginTop="8px">
                    <Row alignCenter noWrap marginLeft="10px">
                        <DateContent>{utcUploaded}</DateContent>

                        <MarginWrapper marginLeft="24px">
                            <BlockTitle color={grey4}>{audioLanguages}</BlockTitle>
                        </MarginWrapper>
                    </Row>
                    <Row alignCenter justifyEnd marginRight="20px">
                        <SimpleButton
                            background="transparent"
                            color={blue}
                            padding="0px 0px 0px 20px"
                            textHover={blue}
                            onClick={() => onEditClick(id, hashTags || [])}
                        >
                            Edit
                        </SimpleButton>
                    </Row>
                </Section>
                {/* </ContentWrapper> */}

                <ContentWrapper
                    backgroundColor={grey29}
                    borderRadius="0px"
                    height="46px"
                    padding="8px 10px 4px"
                    width="100%"
                >
                    <ScrollableWrapper alignCenter noWrap paddingBottom="8px" width="100%">
                        {hashTags?.length
                            ? hashTags.map((item: string) => (
                                  <MarginWrapper key={item} marginRight="4px">
                                      <VideoCardHashtag background={grey30} text={item} />
                                  </MarginWrapper>
                              ))
                            : 'no hashtags'}
                    </ScrollableWrapper>
                </ContentWrapper>
                <ContentWrapper backgroundColor={grey29} borderRadius="0px" padding="4px 10px" width="100%">
                    <Section alignCenter justifyBetween>
                        <PropertyBlock
                            copiable
                            backgroundColor={grey27}
                            horizontalPadding={propertyBlockHorizontalPadding}
                            //noWrap
                            linkRoute={homeLink}
                            subtitle={id}
                            success="Video ID was copied"
                            title="Video ID "
                            width={propertyBlockWidth}
                        />

                        <PropertyBlock
                            copiable
                            backgroundColor={grey27}
                            horizontalPadding={propertyBlockHorizontalPadding}
                            //noWrap
                            linkRoute={usersLink}
                            subtitle={ownerId}
                            success="User ID was copied"
                            title="User ID"
                            width={propertyBlockWidth}
                        />

                        {/* <PropertyBlock
                            copiable
                            noWrap
                            padding={propertyBlockHorizontalPadding}
                            subtitle={primaryProductId}
                            success="Topic ID was copied"
                            title="Product ID"
                            width={propertyBlockWidth}
                        /> */}
                    </Section>
                </ContentWrapper>

                <Column minHeight="58px" width="100%">
                    <ContentWrapper backgroundColor={grey29} borderRadius="8px" padding="4px 10px 0px" width="100%">
                        <Row
                            alignCenter
                            height="100%"
                            justifyBetween={
                                access === Roles.Administrator ||
                                access === Roles.SuperAdministrator ||
                                access === Roles.Curator
                            }
                            justifyCenter={access !== Roles.Administrator && access !== Roles.SuperAdministrator}
                        >
                            <VideoCardButton
                                backgroundColor={grey27}
                                backgroundHover={grey32}
                                color={grey7}
                                fontSize={isMobile ? '11px' : '12px'}
                                width={videoCardButtonWidth}
                                onClick={moreInfoHandleClick}
                            >
                                More Info
                            </VideoCardButton>

                            <CuratePopoverLayout
                                disabled={curationState !== 1}
                                id={id}
                                type="top"
                                width={videoCardButtonWidth}
                            >
                                <VideoCardButton
                                    backgroundColor={grey27}
                                    backgroundHover={grey32}
                                    color={grey7}
                                    disabled={curationState !== 1}
                                    fontSize={isMobile ? '11px' : '12px'}
                                    width="100%"
                                >
                                    Curate
                                </VideoCardButton>
                            </CuratePopoverLayout>
                        </Row>
                    </ContentWrapper>
                    <AdministratorLayout>
                        <ContentWrapper borderRadius="0px 0px 8px 8px" height="40px" width="100%">
                            {!isDeleted && (
                                <Row alignCenter justifyCenter width="100%">
                                    <SimpleButton
                                        background="transparent"
                                        color="#ff3333"
                                        fontSize={isMobile ? '14px' : '12px'}
                                        padding="6px 10px 16px"
                                        textHover={darkError}
                                        width="80px"
                                        onClick={deleteHandler}
                                    >
                                        Delete
                                    </SimpleButton>
                                </Row>
                            )}
                        </ContentWrapper>
                    </AdministratorLayout>
                </Column>
            </Column>
        </CardWrapper>
    );
};
