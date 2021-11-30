import { useMediaQuery } from '@material-ui/core';
import { ReactComponent as CloseImg } from 'assets/close.svg';
import whiteLinkIcon from 'assets/copy_icon_white.svg';
import downloadPopupDoneImg from 'assets/download_popup_done.svg';
import downloadPopupLoadingImg from 'assets/download_popup_loading.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg';
import noVideoPoster from 'assets/no_video_poster.svg';
import { Loader } from 'components/common/dynamic/Loader';
import { Button } from 'componentsNewDesign/common/buttons/CopyButton/styles';
import { VideoContainer } from 'componentsNewDesign/common/dividers/VideoContainer';
import { hlsIsSupported } from 'componentsNewDesign/common/dividers/VideoContainer/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { HashtagsInput } from 'componentsNewDesign/common/inputs/HashtagsInput';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { CommentBlock } from 'componentsNewDesign/layouts/blocks/CommentBlock';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    formatEngagementStatisticsValues,
    popularityIndicatorTextHorizontalPadding
} from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import {
    contentTextLineHeight,
    countTotalVideoCommentsQuantity,
    indicatorsArray,
    mobilePropertyPadding,
    mobilePropertyWidth,
    NameEngagementType,
    propertyBlockWidth,
    rejectionReasonText,
    statuses,
    subTitleColor,
    subTitleFontWeight,
    titlePadding,
    videoPlayerWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import {
    Backdrop,
    DownloadPopupWrapper,
    HashtagsWrapper,
    VideoCommentsWrapper
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { DescriptionWrapper } from 'componentsNewDesign/wrappers/DescriptionWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { defaultVideoCommentsValues } from 'constants/defaults/comments';
import { homeLink, topicsLink, usersLink } from 'constants/routes';
import { black, grey27, grey29, white } from 'constants/styles/colors';
import { cardMargin, descriptionPadding, filterMargin, xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import {
    updateCommentPaginationState,
    videoCommentsEffects,
    videoCommentsEvents,
    videoCommentsStores
} from 'stores/comments/videoComments';
import { loadingStores } from 'stores/loading';
import { videosEffects, videosStores } from 'stores/videos/videos';
import { Title } from 'types/data';
import { Sizes } from 'types/styles';
import { formatDateISOString, getLanguagesName } from 'utils/usefulFunctions';

// const { updateAsyncModalLoading, openAsyncModal, closeAsyncModal } = modalEvents;
const { /*invokeGetComments,*/ /*setDefaultCommentValues,*/ updateCommentValues } = videoCommentsEvents;
const { limit: defaultLimit, pageIndex: defaultPageIndex } = defaultVideoCommentsValues;

interface DownloadPopupProps {
    setIsOpened: (value: boolean) => void;
    status?: BULLZ.CreationStatus;
    url?: string | null;
    id?: string;
}

const DownloadPopup = ({ setIsOpened, status, url, id }: DownloadPopupProps) => {
    const saveFile = () => {
        saveAs(`${url}`, `${id}`);
    };
    const isMobile = useMediaQuery(`(max-width: ${xs})`);
    return (
        <>
            <Backdrop
                onClick={() => {
                    setIsOpened(false);
                }}
            />
            <DownloadPopupWrapper>
                <MarginWrapper marginLeft={isMobile ? '0' : '22px'}>
                    {status && status === 3 ? (
                        <CustomImg height="auto" src={downloadPopupDoneImg} width={isMobile ? '280px' : '302px'} />
                    ) : (
                        <CustomImg height="auto" src={downloadPopupLoadingImg} width={isMobile ? '280px' : '302px'} />
                    )}
                </MarginWrapper>

                <Column alignCenter marginTop="33px">
                    <MarginWrapper marginBottom="6px">
                        <Span fontSize="24px" fontWeight="bold" lineHeight="28px">
                            {status && status === 3 ? 'Wait is over' : 'Wait please...'}
                        </Span>
                    </MarginWrapper>

                    <MarginWrapper marginBottom="33px">
                        <Span alignCenter color={white} fontSize="16px" fontWeight="500" lineHeight="23px">
                            {status && status === 3
                                ? 'Video is ready to be downloaded'
                                : 'We are generating the video. It may take 2 to 5 minutes. Then refresh a page.'}
                        </Span>
                    </MarginWrapper>

                    {status && status === 3 && url !== null ? (
                        <Button background={black} height="35px" width="134px" onClick={saveFile}>
                            <Span color={white} fontSize="16px" fontWeight="normal" lineHeight="19px">
                                Download
                            </Span>
                        </Button>
                    ) : null}
                </Column>

                <AbsoluteWrapper right="20px" top="17px">
                    <ClickableWrapper
                        onClick={() => {
                            setIsOpened(false);
                        }}
                    >
                        <CloseImg />
                    </ClickableWrapper>
                </AbsoluteWrapper>
            </DownloadPopupWrapper>
        </>
    );
};

interface VideoEngagementBlockProps
    extends Pick<BULLZ.AdminGetVideoResponse, 'engagementStatistics'>,
        Pick<Sizes, 'width'>,
        Pick<Title, 'title'> {}

export const VideoEngagementBlock = ({
    engagementStatistics,
    width = '100%',
    title = 'Engagements'
}: VideoEngagementBlockProps) => (
    <Column width={width}>
        <Row alignCenter marginBottom={descriptionPadding} width={width}>
            <ContentText
                color={subTitleColor}
                fontWeight={subTitleFontWeight}
                lineHeight={contentTextLineHeight}
                padding={titlePadding}
            >
                {title}
            </ContentText>
        </Row>
        <Row alignCenter justifyBetween height="12px" marginBottom="20px" marginLeft="5px" width={width}>
            {/* {curationState === 2 && (
             */}
            {indicatorsArray.map(({ name, imageHeight, imageSource, imageWidth }) => (
                <Row
                    key={name}
                    alignCenter
                    // marginRight={engagementMarginRight}
                >
                    <CustomImg alt={name} height={imageHeight} src={imageSource} width={imageWidth} />
                    <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                        {formatEngagementStatisticsValues(engagementStatistics?.[name as NameEngagementType] || 0)}
                    </ContentText>
                </Row>
            ))}
        </Row>
    </Column>
);

// interface WOMQualityBlockProps
//     extends Required<Pick<WOM.ContentItemResponse, 'womQualityScore'>>,
//         Pick<Sizes, 'width'> {}

// const WOMQualityBlock = ({ womQualityScore, width = '100%' }: WOMQualityBlockProps) => (
//     <Column>
//         <Row alignCenter marginBottom={descriptionPadding} width={width}>
//             <ContentText
//                 color={subTitleColor}
//                 fontWeight={subTitleFontWeight}
//                 lineHeight={contentTextLineHeight}
//                 padding={titlePadding}
//             >
//                 WOM Quality Score
//             </ContentText>
//         </Row>
//         <Row alignCenter justifyBetween height="12px" marginBottom="20px" marginLeft="5px" width={width}>
//             {/* {curationState === 2 && (
//              */}
//             {indicatorsWOMQualityScoreArray.map(({ name, qualityIndicator }) => (
//                 <Row key={name} alignCenter>
//                     <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
//                         {qualityIndicator + ': ' + womQualityScore[name]?.toFixed(2)}
//                     </ContentText>
//                 </Row>
//             ))}
//         </Row>
//     </Column>
// );

// interface ValidationReasonBlockProps
//     extends Required<Pick<WOM.ContentItemResponse, 'validationState'>>,
//         Pick<Sizes, 'width'> {}

// const ValidationReasonBlock = ({ validationState, width = '100%' }: ValidationReasonBlockProps) => (
//     <Column>
//         <Row alignCenter marginBottom={descriptionPadding} width={width}>
//             <ContentText
//                 color={subTitleColor}
//                 fontWeight={subTitleFontWeight}
//                 lineHeight={contentTextLineHeight}
//                 padding={titlePadding}
//             >
//                 Validation State
//             </ContentText>
//         </Row>
//         <Row alignCenter justifyBetween height="12px" marginBottom="20px" marginLeft="5px" width={width}>
//             {/* {curationState === 2 && (
//              */}
//             {/*{indicatorsWOMQualityScoreArray.map(({ name, qualityIndicator }) => (*/}
//             {/*    <Row key={name} alignCenter>*/}
//             {/*        <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>*/}
//             {/*            {qualityIndicator + ': ' + womQualityScore[name]?.toFixed(2)}*/}
//             {/*        </ContentText>*/}
//             {/*    </Row>*/}
//             {/*))}*/}
//             {validationState.validationResult && (
//                 <Row alignCenter>
//                     <ContentText>
//                         {'Validation result: ' + getWOMValidationResult(validationState.validationResult)}
//                     </ContentText>
//                 </Row>
//             )}
//             {validationState.endedReason && (
//                 <Row alignCenter>
//                     <ContentText>{'Ended reason: ' + getWOMEndedReason(validationState.endedReason)}</ContentText>
//                 </Row>
//             )}
//         </Row>
//     </Column>
// );
export interface VideoDescriptionProps extends BULLZ.AdminGetVideoResponse, BULLZ.BullzValidationInfo {}

export const VideoDescription = ({
    engagementStatistics,
    id = '',
    ownerId,
    primaryProductId,
    streaming,
    username,
    audioLanguages = [''],
    utcUploaded = '',
    validation,
    isTrusted,
    commentsCount,
    productLink,
    thumbnailUrl,
    hashTags = [],
    isDeleted = false,
    isPublic
}: VideoDescriptionProps) => {
    const loading = useStore(loadingStores.loading);
    const commentsLoading = useStore(videoCommentsEffects.loadVideoComments.pending);
    const videoLoading = useStore(videosStores.editLoading);
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const videoSourse = useStore(videosStores.videoSourse);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);
    //const isFirst = useStore(videoCommentsStores.isFirst);
    const videoComments = useStore(videoCommentsStores.videoComments);
    const totalVideoCommentsQuantity = countTotalVideoCommentsQuantity(videoComments);
    const curationEndedReason = validation?.bullz?.curationEndedReason || 0;

    useEffect(() => {
        videosEffects.getVideoSourceFile({ videoId: id });
        // setTimeout(() => videosEffects.getVideoSourceFile({ videoId: id }), 120000);
    }, [id]);

    const { pageIndex, limit } = useStore(videoCommentsStores.commentValues);

    const screenGrabUrl = streaming?.details?.screenGrabUrl || '';
    const videoSrc = streaming?.details?.hlsUrl;
    // const grading = validation?.wom?.grading?.consensus;
    // *  0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
    const curationState = validation?.bullz?.curationState;

    const languagesOfTheVideo = getLanguagesName(audioLanguages || []);

    // const usernameClickHandler = () => history.push(usersLink + '/' + ownerId);
    // const changeInfoCallBack = (fields: VideoCardEditableFields) => videosEvents.updateVideoTags({ id, ...fields });
    // const validateCallBack = (fields: VideoCurateEditableFields) =>
    //    videosEvents.updateCurationStateById({ id, curationState: fields.curationState });

    const onConfirm = async (tags: string[]) => videosEffects.updateVideoTags({ id, tags });

    const onDownloadClick = () => {
        videosEffects.getVideoSourceFile({ videoId: id });

        setIsOpened(true);
    };

    const onCurrentPageChange = (page: number, pageSize: number | undefined = defaultLimit) => {
        updateCommentValues({
            videoId: id,
            pageIndex: page,
            limit: pageSize
        });

        updateCommentPaginationState();

        //console.log('page', page, 'pageSize', pageSize);
        //console.log('PaginationUpdated!');
    };

    useEffect(() => {
        updateCommentValues({
            videoId: id,
            pageIndex: defaultPageIndex,
            limit: defaultLimit
        });

        //console.log('video id', id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <DescriptionWrapper
                backgroundColor={grey29}
                disabled={isDeleted}
                marginBottom={filterMargin}
                marginRight={isMobile ? '0' : filterMargin}
            >
                <Row justifyBetween marginBottom={descriptionPadding} width={isMobile ? '100%' : videoPlayerWidth}>
                    <ContentText
                        uppercase
                        color={
                            (isDeleted && statuses[4].color) ||
                            (curationState !== undefined && statuses[curationState].color) ||
                            black
                        }
                        fontSize="14px"
                    >
                        {(isDeleted && statuses[4].text) ||
                            (curationState === 3 &&
                                `${statuses[3].text} (${rejectionReasonText[curationEndedReason]})`) ||
                            (curationState !== undefined && statuses[curationState].text)}
                    </ContentText>
                    {isPublic && (
                        <Row alignCenter>
                            <ClickableWrapper onClick={onDownloadClick}>
                                <DownloadIcon />
                            </ClickableWrapper>
                            {videoSourse && videoSourse.status === 3 && (
                                <MarginWrapper marginLeft="7px">
                                    <ClickableWrapper onClick={onDownloadClick}>
                                        <Span fontWeight="500">Download Ready</Span>
                                    </ClickableWrapper>
                                </MarginWrapper>
                            )}
                        </Row>
                    )}
                </Row>
                <Section>
                    <Column
                        alignCenter={isMobile}
                        marginBottom={isMobile ? '16px' : '0'}
                        marginRight={isMobile ? '0' : cardMargin}
                        width={isMobile ? '100%' : 'fit-content'}
                    >
                        <RelativeWrapper height="100%" width={isMobile ? '200px' : videoPlayerWidth}>
                            <VideoContainer
                                height="250px"
                                minWidth="100px"
                                screenGrabUrl={screenGrabUrl}
                                thumbnailUrl={thumbnailUrl}
                                videoSrc={videoSrc || ''}
                                width="100%"
                            />
                            {/* <Row alignCenter justifyCenter> */}
                            {/*{videoSrc && hlsIsSupported && !startLoading && <PlayButton onClick={goLoading} />}*/}
                            {/*<ContentWrapper height="254px" minWidth="180px">*/}
                            {/*    <Video*/}
                            {/*        ref={video}*/}
                            {/*        controls={!!videoSrc && hlsIsSupported}*/}
                            {/*        id="video"*/}
                            {/*        maxHeight="254px"*/}
                            {/*        poster={videoSrc && hlsIsSupported ? thumbnailUrl || screenGrabUrl : noVideoPoster}*/}
                            {/*        preload="metadata"*/}
                            {/*    />*/}
                            {/*</ContentWrapper>*/}
                            {/* </Row> */}
                        </RelativeWrapper>
                    </Column>
                    <Column width="100%">
                        <Section marginBottom="20px">
                            <VideoEngagementBlock
                                engagementStatistics={engagementStatistics}
                                title="Engagements BULLZ"
                                width={isMobile ? '100%' : '300px'}
                            />
                        </Section>

                        {!isMobile && (
                            <>
                                <Section noWrap>
                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteLinkIcon}
                                        linkRoute={homeLink}
                                        marginBottom={descriptionPadding}
                                        marginRight={descriptionPadding}
                                        subtitle={id}
                                        success="Video ID was copied"
                                        title="Video ID"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteLinkIcon}
                                        linkRoute={usersLink}
                                        marginBottom={descriptionPadding}
                                        marginRight={descriptionPadding}
                                        subtitle={ownerId}
                                        success="User ID was copied"
                                        title="User ID"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteLinkIcon}
                                        linkRoute={topicsLink}
                                        marginBottom={descriptionPadding}
                                        marginRight={descriptionPadding}
                                        subtitle={primaryProductId}
                                        success="Topic ID was copied"
                                        title="Topic ID"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        isLink
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteLinkIcon}
                                        //linkRoute={productLink || ''}
                                        marginBottom={descriptionPadding}
                                        subtitle={productLink || ''}
                                        success="Topic link was copied"
                                        title="Topic Link"
                                        width={propertyBlockWidth}
                                    />
                                </Section>
                                <Section noWrap>
                                    <PropertyBlock
                                        isDate
                                        backgroundColor={grey27}
                                        marginBottom={descriptionPadding}
                                        marginRight={descriptionPadding}
                                        subtitle={utcUploaded as string}
                                        title="Date of Creation"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        backgroundColor={grey27}
                                        marginBottom={descriptionPadding}
                                        marginRight={descriptionPadding}
                                        //subtitle={getFullLanguage(audioLanguages)}
                                        subtitle={languagesOfTheVideo}
                                        title="Audio Language"
                                        width={propertyBlockWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteLinkIcon}
                                        isTrusted={isTrusted}
                                        marginBottom={descriptionPadding}
                                        subtitle={username || ''}
                                        success="Username was copied"
                                        title="Username"
                                        width={propertyBlockWidth}
                                    />
                                </Section>
                            </>
                        )}

                        {isMobile && (
                            <>
                                <Section justifyBetween>
                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        linkRoute={homeLink}
                                        marginBottom={mobilePropertyPadding}
                                        subtitle={id}
                                        success="Video ID was copied"
                                        title="Copy video ID "
                                        width={mobilePropertyWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        linkRoute={usersLink}
                                        marginBottom={mobilePropertyPadding}
                                        subtitle={ownerId}
                                        success="User ID was copied"
                                        title="Copy user ID"
                                        width={mobilePropertyWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        linkRoute={topicsLink}
                                        marginBottom={mobilePropertyPadding}
                                        subtitle={primaryProductId}
                                        success="Topic ID was copied"
                                        title="Copy topic ID"
                                        width={mobilePropertyWidth}
                                    />

                                    <PropertyBlock
                                        isDate
                                        backgroundColor={grey27}
                                        marginBottom={mobilePropertyPadding}
                                        subtitle={formatDateISOString(utcUploaded)}
                                        title="Date of Creation"
                                        width={mobilePropertyWidth}
                                    />

                                    <PropertyBlock
                                        backgroundColor={grey27}
                                        marginBottom={mobilePropertyPadding}
                                        subtitle={languagesOfTheVideo}
                                        title="Audio Language"
                                        width={mobilePropertyWidth}
                                    />

                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        isTrusted={isTrusted}
                                        marginBottom={mobilePropertyPadding}
                                        subtitle={username || ''}
                                        success="Username was copied"
                                        title="Username"
                                        width={mobilePropertyWidth}
                                    />
                                </Section>
                            </>
                        )}

                        <HashtagsWrapper>
                            <Column
                                marginBottom={isMobile ? '16px' : '0'}
                                marginRight={isMobile ? '0' : descriptionPadding}
                                width={isMobile ? '100%' : '370px'}
                            >
                                <HashtagsInput
                                    hashTags={hashTags || undefined}
                                    loading={videoLoading || loading}
                                    type="video"
                                    width={isMobile ? '100%' : 'auto'}
                                    onConfirm={onConfirm}
                                />
                            </Column>
                            <Column>
                                <Row marginBottom={descriptionPadding}>
                                    <ContentText
                                        color={subTitleColor}
                                        fontWeight={subTitleFontWeight}
                                        lineHeight={contentTextLineHeight}
                                    >
                                        Poster
                                    </ContentText>
                                </Row>

                                <ContentWrapper
                                    backgroundColor={grey27}
                                    height="116px"
                                    minWidth="90px"
                                    padding="8px 10px"
                                    width="90px"
                                >
                                    <PosterLayout
                                        defaultPoster={noVideoPoster}
                                        height="100px"
                                        posterHeight="100px"
                                        src={hlsIsSupported ? thumbnailUrl || screenGrabUrl : undefined}
                                        width="70px"
                                    />
                                </ContentWrapper>
                            </Column>
                        </HashtagsWrapper>
                    </Column>
                    {/*<Column alignEnd marginLeft="auto">*/}
                    {/*    <Row marginBottom={descriptionPadding}>*/}
                    {/*        <ContentText*/}
                    {/*            color={*/}
                    {/*                (isDeleted && statuses[4].color) ||*/}
                    {/*                (curationState !== undefined && statuses[curationState].color) ||*/}
                    {/*                black*/}
                    {/*            }*/}
                    {/*            fontSize="11px"*/}
                    {/*            uppercase={isDeleted}*/}
                    {/*        >*/}
                    {/*            {(isDeleted && statuses[4].text) ||*/}
                    {/*                (curationState === 3 &&*/}
                    {/*                    `${statuses[3].text} (${rejectionReasonText[curationEndedReason]})`) ||*/}
                    {/*                (curationState !== undefined && statuses[curationState].text)}*/}
                    {/*        </ContentText>*/}
                    {/*    </Row>*/}
                    {/*    <Row justifyEnd>*/}
                    {/*        <RolesLayout accessList={[Roles.Administrator, Roles.ContentManager]}>*/}
                    {/*            <SimpleButton*/}
                    {/*                background={black}*/}
                    {/*                borderRadius={buttonsBorderRadius}*/}
                    {/*                color={white}*/}
                    {/*                fontSize={buttonsFontSize}*/}
                    {/*                fontWeight={buttonsFontWeight}*/}
                    {/*                marginRight={descriptionPadding}*/}
                    {/*                padding={buttonsPadding}*/}
                    {/*                onClick={() => createDescriptionVideoCardModal.openModal()}*/}
                    {/*            >*/}
                    {/*                Change primary topic*/}
                    {/*            </SimpleButton>*/}
                    {/*        </RolesLayout>*/}
                    {/*        <AdministratorLayout>*/}
                    {/*            <SimpleButton*/}
                    {/*                background={errorColor}*/}
                    {/*                borderRadius={buttonsBorderRadius}*/}
                    {/*                color={white}*/}
                    {/*                fontSize={buttonsFontSize}*/}
                    {/*                fontWeight={buttonsFontWeight}*/}
                    {/*                marginRight={descriptionPadding}*/}
                    {/*                padding={buttonsPadding}*/}
                    {/*                onClick={deleteHandler}*/}
                    {/*            >*/}
                    {/*                Delete Video*/}
                    {/*            </SimpleButton>*/}
                    {/*        </AdministratorLayout>*/}
                    {/*        <CuratePopoverLayout disabled={curationState !== 1} id={id} type="down">*/}
                    {/*            <VideoCardButton*/}
                    {/*                backgroundColor={black}*/}
                    {/*                borderRadius={buttonsBorderRadius}*/}
                    {/*                color={white}*/}
                    {/*                disabled={curationState !== 1}*/}
                    {/*                fontSize={buttonsFontSize}*/}
                    {/*                fontWeight={buttonsFontWeight}*/}
                    {/*                padding={buttonsPadding}*/}
                    {/*                width={curateButtonWidth}*/}
                    {/*            >*/}
                    {/*                Curate*/}
                    {/*            </VideoCardButton>*/}
                    {/*        </CuratePopoverLayout>*/}
                    {/*    </Row>*/}
                    {/*</Column>*/}
                    {isOpened ? (
                        <DownloadPopup
                            id={id}
                            setIsOpened={setIsOpened}
                            status={videoSourse?.status}
                            url={videoSourse?.url}
                        />
                    ) : null}
                </Section>
            </DescriptionWrapper>
            <VideoCommentsWrapper backgroundColor={grey29} marginRight={isMobile ? '0' : filterMargin}>
                {commentsLoading ? (
                    <Section justifyCenter>
                        <Loader size="large" />
                    </Section>
                ) : (
                    <>
                        <Section>
                            <ContentText fontSize="14px" fontWeight="500" padding="21px 0 12px">
                                {/* {videoComments?.totalRecords || 0} */}
                                {`${totalVideoCommentsQuantity} ${commentsCount !== undefined && ` Comments`}`}
                            </ContentText>
                        </Section>
                        {videoComments?.items?.map((comment, index) => (
                            <CommentBlock
                                key={comment.body + `${index}`}
                                threadComments={comment.replies || undefined}
                                //onBlockButtonClick={noop}
                                {...comment}
                            />
                        ))}

                        <Section marginTop="50px">
                            <Pagination
                                currentIndex={pageIndex + 1}
                                defaultSize={limit}
                                pagesLimit={100}
                                totalItems={videoComments?.totalRecords}
                                onSizeChange={onCurrentPageChange}
                            />
                        </Section>
                    </>
                )}
            </VideoCommentsWrapper>
        </>
    );
};
