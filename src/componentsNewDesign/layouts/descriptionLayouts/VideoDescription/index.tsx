import noVideoPoster from 'assets/no_video_poster.svg';
import { Loader } from 'components/common/dynamic/Loader';
import { VideoContainer } from 'componentsNewDesign/common/dividers/VideoContainer';
import { hlsIsSupported } from 'componentsNewDesign/common/dividers/VideoContainer/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { HashtagsInput } from 'componentsNewDesign/common/inputs/HashtagsInput';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { CommentBlock } from 'componentsNewDesign/layouts/blocks/CommentBlock';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    formatEngagementStatisticsValues,
    popularityIndicatorTextHorizontalPadding
} from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import {
    contentTextLineHeight,
    countTotalVideoCommentsQuantity,
    formatDate,
    indicatorsArray,
    NameEngagementType,
    propertyBlockWidth,
    rejectionReasonText,
    statuses,
    subTitleColor,
    subTitleFontWeight,
    titlePadding,
    videoPlayerWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import { VideoCommentsWrapper } from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { DescriptionWrapper } from 'componentsNewDesign/wrappers/DescriptionWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { defaultVideoCommentsValues } from 'constants/defaults/comments';
import { homeLink, productsLink, usersLink } from 'constants/routes';
import { black, grey3 } from 'constants/styles/colors';
import { cardMargin, descriptionPadding, filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
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
import { getLanguagesName } from 'utils/usefulFunctions';

// const { updateAsyncModalLoading, openAsyncModal, closeAsyncModal } = modalEvents;
const { /*invokeGetComments,*/ /*setDefaultCommentValues,*/ updateCommentValues } = videoCommentsEvents;
const { limit: defaultLimit, pageIndex: defaultPageIndex } = defaultVideoCommentsValues;

interface VideoEngagementBlockProps
    extends Pick<YEAY.AdminGetVideoResponse, 'engagementStatistics'>,
        Pick<Sizes, 'width'>,
        Pick<Title, 'title'> {}

export const VideoEngagementBlock = ({
    engagementStatistics,
    width = '100%',
    title = 'Engagements'
}: VideoEngagementBlockProps) => (
    <Column>
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
export interface VideoDescriptionProps extends YEAY.AdminGetVideoResponse, YEAY.YeayValidationInfo {}

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
    // * 0 = None; 1 = DeclineRequested; 2 = Inappropriate; 3 = GraphicContent; 4 = Violence; 5 = Copyright; 6 = TestVideo; 7 = IncorrectFormat; 8 = UserRequested; 9 = Other; 10 = NotProductRecommendation
    curationEndedReason = 0,
    thumbnailUrl,
    hashTags = [],
    isDeleted = false
}: VideoDescriptionProps) => {
    const loading = useStore(loadingStores.loading);
    const commentsLoading = useStore(videoCommentsEffects.loadVideoComments.pending);
    const videoLoading = useStore(videosStores.editLoading);

    //const isFirst = useStore(videoCommentsStores.isFirst);
    const videoComments = useStore(videoCommentsStores.videoComments);
    const totalVideoCommentsQuantity = countTotalVideoCommentsQuantity(videoComments);

    const { pageIndex, limit } = useStore(videoCommentsStores.commentValues);

    const screenGrabUrl = streaming?.details?.screenGrabUrl || '';
    const videoSrc = streaming?.details?.hlsUrl;
    // const grading = validation?.wom?.grading?.consensus;
    // *  0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
    const curationState = validation?.yeay?.curationState;

    const languagesOfTheVideo = getLanguagesName(audioLanguages || []);

    // const usernameClickHandler = () => history.push(usersLink + '/' + ownerId);
    // const changeInfoCallBack = (fields: VideoCardEditableFields) => videosEvents.updateVideoTags({ id, ...fields });
    // const validateCallBack = (fields: VideoCurateEditableFields) =>
    //    videosEvents.updateCurationStateById({ id, curationState: fields.curationState });

    const onConfirm = async (tags: string[]) => videosEffects.updateVideoTags({ id, tags });

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
            <DescriptionWrapper disabled={isDeleted} marginBottom={filterMargin} marginRight={filterMargin}>
                <Section marginBottom={descriptionPadding}>
                    <ContentText
                        color={
                            (isDeleted && statuses[4].color) ||
                            (curationState !== undefined && statuses[curationState].color) ||
                            black
                        }
                        fontSize="14px"
                        uppercase={isDeleted}
                    >
                        {(isDeleted && statuses[4].text) ||
                            (curationState === 3 &&
                                `${statuses[3].text} (${rejectionReasonText[curationEndedReason]})`) ||
                            (curationState !== undefined && statuses[curationState].text)}
                    </ContentText>
                </Section>
                <Section>
                    <Column marginRight={cardMargin}>
                        <RelativeWrapper height="100%" width={videoPlayerWidth}>
                            <VideoContainer
                                height="410px"
                                minWidth="240px"
                                screenGrabUrl={screenGrabUrl}
                                thumbnailUrl={thumbnailUrl}
                                videoSrc={videoSrc || ''}
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
                    <Column>
                        <Section marginBottom="20px">
                            <VideoEngagementBlock
                                engagementStatistics={engagementStatistics}
                                title="Engagements YEAY"
                                width="300px"
                            />
                        </Section>

                        <Section noWrap>
                            <PropertyBlock
                                copiable
                                linkRoute={homeLink}
                                marginBottom={descriptionPadding}
                                marginRight={descriptionPadding}
                                subtitle={id}
                                success="VideoID was copied"
                                title="Copy videoID "
                                width={propertyBlockWidth}
                            />

                            <PropertyBlock
                                copiable
                                linkRoute={usersLink}
                                marginBottom={descriptionPadding}
                                marginRight={descriptionPadding}
                                subtitle={ownerId}
                                success="UserID was copied"
                                title="Copy userID"
                                width={propertyBlockWidth}
                            />

                            <PropertyBlock
                                copiable
                                linkRoute={productsLink}
                                marginBottom={descriptionPadding}
                                subtitle={primaryProductId}
                                success="ProductID was copied"
                                title="Copy productID"
                                width={propertyBlockWidth}
                            />
                        </Section>
                        <Section noWrap>
                            <PropertyBlock
                                isDate
                                marginBottom={descriptionPadding}
                                marginRight={descriptionPadding}
                                subtitle={formatDate(utcUploaded)}
                                title="Date of Creation"
                                width={propertyBlockWidth}
                            />

                            <PropertyBlock
                                marginBottom={descriptionPadding}
                                marginRight={descriptionPadding}
                                //subtitle={getFullLanguage(audioLanguages)}
                                subtitle={languagesOfTheVideo}
                                title="Audio Language"
                                width={propertyBlockWidth}
                            />

                            <PropertyBlock
                                copiable
                                isTrusted={isTrusted}
                                marginBottom={descriptionPadding}
                                subtitle={username || ''}
                                success="Username was copied"
                                title="Username"
                                width={propertyBlockWidth}
                            />
                        </Section>
                        <Row>
                            <Column marginRight={descriptionPadding} width="370px">
                                <HashtagsInput
                                    hashTags={hashTags || undefined}
                                    loading={videoLoading || loading}
                                    type="video"
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
                                    backgroundColor={grey3}
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
                        </Row>
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
                    {/*                Change primary product*/}
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
                </Section>
            </DescriptionWrapper>
            <VideoCommentsWrapper marginRight={filterMargin}>
                {commentsLoading ? (
                    <Section justifyCenter>
                        <Loader size="large" />
                    </Section>
                ) : (
                    <>
                        <Section>
                            <ContentText fontSize="14px" fontWeight="500" padding="21px 0 12px">
                                {/* {videoComments?.totalRecords || 0} */}
                                {`${totalVideoCommentsQuantity} ${
                                    commentsCount !== undefined && ` (${commentsCount}) Comments`
                                }`}
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
