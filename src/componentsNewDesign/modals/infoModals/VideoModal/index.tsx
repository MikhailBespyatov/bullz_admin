import noVideoPoster from 'assets/no_video_poster.svg';
import history from 'browserHistory';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { PlayButton } from 'componentsNewDesign/common/buttons/PlayButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { VideoCardButton } from 'componentsNewDesign/common/buttons/VideoCardButton';
import { hlsIsSupported } from 'componentsNewDesign/common/dividers/VideoContainer/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { HashtagsInput } from 'componentsNewDesign/common/inputs/HashtagsInput';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Video } from 'componentsNewDesign/common/Video';
import { TopBar } from 'componentsNewDesign/grid/TopBar';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    deleteTitle,
    parseDeleteModalContent,
    parseDeleteSuccessMessage
} from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import {
    buttonsBorderRadius,
    buttonsFontSize,
    buttonsFontWeight,
    buttonsPadding,
    curateButtonWidth,
    formatDate,
    propertyBlockWidth,
    rejectionReasonText,
    statuses,
    subTitleColor,
    subTitleFontWeight,
    videoPlayerWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import { CuratePopoverLayout } from 'componentsNewDesign/modals/popovers/CuratePopover';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { noop } from 'constants/functions';
import { homeLink, topicsLink, usersLink } from 'constants/routes';
import { black, errorColor, grey13, grey3, white } from 'constants/styles/colors';
import { descriptionPadding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { message } from 'stores/alerts';
import { loadingStores } from 'stores/loading';
import { modalEffects, modalEvents } from 'stores/modals/asyncModal';
import { videosEffects, videosEvents, videosStores } from 'stores/videos/videos';
import { VideoCardEditableFields } from 'types/form';
import { SubjectType } from 'types/types';
import { getLanguagesName } from 'utils/usefulFunctions';
import { VideoDescriptionWrapper } from './styles';

const { updateAsyncModalLoading, openAsyncModal, closeAsyncModal } = modalEvents;

export interface VideoDescriptionProps extends BULLZ.AdminGetVideoResponse, BULLZ.BullzValidationInfo {}

export const VideoModal = ({
    id = '',
    ownerId,
    primaryProductId,
    streaming,
    username,
    audioLanguages = [''],
    utcUploaded = '',
    validation,
    // * 0 = None; 1 = DeclineRequested; 2 = Inappropriate; 3 = GraphicContent; 4 = Violence; 5 = Copyright; 6 = TestVideo; 7 = IncorrectFormat; 8 = UserRequested; 9 = Other; 10 = NotProductRecommendation
    curationEndedReason = 0,
    thumbnailUrl,
    hashTags = [],
    isDeleted = false
}: VideoDescriptionProps) => {
    const video = useRef<HTMLVideoElement>(null);
    const loading = useStore(loadingStores.loading);
    const videoLoading = useStore(videosStores.editLoading);
    // const { access } = useStore(userStores.auth);

    const screenGrabUrl = streaming?.details?.screenGrabUrl || '';
    const videoSrc = streaming?.details?.hlsUrl;
    // const grading = validation?.wom?.grading?.consensus;
    // *  0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
    const curationState = validation?.bullz?.curationState;
    const languagesOfTheVideo = getLanguagesName(audioLanguages || []);

    const [startLoading, setStartLoading] = useState(false);

    const deleteOkHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await videosEffects.removeItemById(subject.toString());
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success(parseDeleteSuccessMessage(id));
        } catch {
            updateAsyncModalLoading();
            closeAsyncModal();
        }
    };

    const goLoading = () => setStartLoading(true);

    const usernameClickHandler = () => history.push(usersLink + '/' + ownerId);
    const changeInfoCallBack = (fields: VideoCardEditableFields) => videosEvents.updateItemById({ id, ...fields });
    // const validateCallBack = (fields: VideoCurateEditableFields) =>
    //    videosEvents.updateCurationStateById({ id, curationState: fields.curationState });

    const deleteHandler = async () => {
        openAsyncModal({
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
            closeAsyncModal();
        }
    };

    const onConfirm = async (hashtags: string[]) => {
        try {
            await videosEffects.loadEditInfoItemById(id);
            await modalEffects.editVideoInfo({ onChange: changeInfoCallBack, hashTags: hashtags, id: id });
        } catch {}
    };

    useEffect(() => {
        if (startLoading && hlsIsSupported && videoSrc && video.current) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video?.current?.play();
            });
        }
    }, [videoSrc, startLoading]);

    return (
        <MarginWrapper marginBottom="16px" marginRight="16px">
            <VideoDescriptionWrapper disabled={isDeleted}>
                <Column height="100%">
                    <ContentWrapper backgroundColor={white} borderRadius="8px" padding="20px" width="100%">
                        <Row alignCenter justifyBetween marginBottom="17px" marginTop="17px">
                            <Row alignCenter>
                                <ClickableWrapper onClick={usernameClickHandler}>
                                    <ContentText color={grey13}>Videos /&nbsp;</ContentText>
                                    <ContentText padding="0px 4px 0px 0px">{id}</ContentText>
                                </ClickableWrapper>
                                <CopyButton subject={id} success="VideoID was copied" />
                            </Row>
                            <Row alignCenter justifyEnd>
                                <ContentText
                                    color={
                                        (isDeleted && statuses[4].color) ||
                                        (curationState !== undefined && statuses[curationState].color) ||
                                        black
                                    }
                                    fontSize="11px"
                                    uppercase={isDeleted}
                                >
                                    {(isDeleted && statuses[4].text) ||
                                        (curationState === 3 &&
                                            `${statuses[3].text} (${rejectionReasonText[curationEndedReason]})`) ||
                                        (curationState !== undefined && statuses[curationState].text)}
                                </ContentText>
                            </Row>
                        </Row>
                        <Row alignCenter justifyBetween>
                            <ContentWrapper width="300px">
                                <TopBar content={['Video Info', 'Topic Info']} onChange={noop} />
                            </ContentWrapper>
                            <Row alignCenter justifyBetween width="215px">
                                <SimpleButton
                                    background={errorColor}
                                    borderRadius={buttonsBorderRadius}
                                    color={white}
                                    fontSize={buttonsFontSize}
                                    fontWeight={buttonsFontWeight}
                                    marginRight={descriptionPadding}
                                    padding="8px"
                                    onClick={deleteHandler}
                                >
                                    Delete Video
                                </SimpleButton>
                                <CuratePopoverLayout disabled={curationState !== 1} id={id} type="down">
                                    <VideoCardButton
                                        backgroundColor={black}
                                        borderRadius={buttonsBorderRadius}
                                        color={white}
                                        disabled={curationState !== 1}
                                        fontSize={buttonsFontSize}
                                        fontWeight={buttonsFontWeight}
                                        padding={buttonsPadding}
                                        width={curateButtonWidth}
                                    >
                                        Curate
                                    </VideoCardButton>
                                </CuratePopoverLayout>
                            </Row>
                        </Row>
                        <Row marginTop="16px">
                            <RelativeWrapper width={videoPlayerWidth}>
                                <Row alignCenter justifyCenter>
                                    {videoSrc && !startLoading && <PlayButton onClick={goLoading} />}
                                    <ContentWrapper minWidth="180px">
                                        <Video
                                            ref={video}
                                            controls={!!videoSrc && hlsIsSupported}
                                            id="video"
                                            poster={
                                                videoSrc && hlsIsSupported
                                                    ? thumbnailUrl || screenGrabUrl
                                                    : noVideoPoster
                                            }
                                            preload="metadata"
                                        />
                                    </ContentWrapper>
                                </Row>
                            </RelativeWrapper>

                            <Column marginLeft="8px">
                                <Section alignCenter justifyBetween marginBottom="8px">
                                    <PropertyBlock
                                        copiable
                                        linkRoute={homeLink}
                                        subtitle={id}
                                        success="Video ID was copied"
                                        title="Copy video ID "
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        linkRoute={usersLink}
                                        subtitle={ownerId}
                                        success="User ID was copied"
                                        title="Copy user ID"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        linkRoute={topicsLink}
                                        subtitle={primaryProductId}
                                        success="Topic ID was copied"
                                        title="Copy topic ID"
                                        width={propertyBlockWidth}
                                    />
                                </Section>
                                <Section alignCenter justifyBetween marginBottom="11px">
                                    <PropertyBlock
                                        subtitle={formatDate(utcUploaded)}
                                        title="Date of Creation"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        //subtitle={getFullLanguage(audioLanguages)}
                                        subtitle={languagesOfTheVideo}
                                        title="Audio Language"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        subtitle={username || ''}
                                        title="Username"
                                        width={propertyBlockWidth}
                                    />
                                </Section>
                                <Section>
                                    <HashtagsInput
                                        hashTags={hashTags || undefined}
                                        loading={videoLoading || loading}
                                        width="370px"
                                        onConfirm={onConfirm}
                                    />
                                    <Column marginRight="86px">
                                        <Row marginBottom="8px">
                                            <ContentText color={subTitleColor} fontWeight={subTitleFontWeight}>
                                                Poster
                                            </ContentText>
                                        </Row>
                                        <ContentWrapper
                                            backgroundColor={grey3}
                                            height="116px"
                                            minWidth="93px"
                                            padding=" 8px 12px"
                                            width="93px"
                                        >
                                            <CustomImg
                                                src={
                                                    videoSrc && hlsIsSupported
                                                        ? thumbnailUrl || screenGrabUrl
                                                        : noVideoPoster
                                                }
                                            />
                                        </ContentWrapper>
                                    </Column>
                                </Section>
                            </Column>
                        </Row>
                    </ContentWrapper>
                </Column>
            </VideoDescriptionWrapper>
        </MarginWrapper>
    );
};
