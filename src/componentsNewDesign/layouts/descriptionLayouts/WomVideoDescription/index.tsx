import { VideoContainer } from 'componentsNewDesign/common/dividers/VideoContainer';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import {
    NameEngagementType,
    rejectionReasonText,
    statuses,
    videoPlayerWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import {
    consensusBlockMinWidth,
    consensusBlockPadding,
    consensusSpanFontWeight,
    endedReasonObject,
    engagementBlockMinWidth,
    engagementBlockPadding,
    engagementBlockWidth,
    maxScore,
    percentageGrowthFontSize,
    percentConversionCoefficient,
    propertyBlockWidth,
    roundToNumber,
    svgContainerDiameter,
    tableMarginBottom,
    textFontSize,
    textFontWeight,
    textLineHeight,
    titleFontSize,
    titleFontWeight,
    titleMarginBottom,
    validationResultObject,
    validationStageObject,
    WomVideoValidationStatusesObject,
    zeroOffsetCoefficient
} from 'componentsNewDesign/layouts/descriptionLayouts/WomVideoDescription/constants';
import {
    WomPropertyBlockWrapper,
    WomPropertyBlockWrapperProps
} from 'componentsNewDesign/layouts/descriptionLayouts/WomVideoDescription/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { DescriptionWrapper } from 'componentsNewDesign/wrappers/DescriptionWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { black, blue, errorColor, green, grey13, grey3, lightBlue } from 'constants/styles/colors';
import { cardMargin, descriptionPadding, filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { videosStores } from 'stores/videos/videos';
import { BackgroundColor, Color, TextProperties } from 'types/styles';

// const { updateAsyncModalLoading, openAsyncModal, closeAsyncModal } = modalEvents;

interface TitleProps extends BackgroundColor, Color, TextProperties {}

const Title: FC<TitleProps> = ({ children, backgroundColor, color, fontSize, fontWeight }) => (
    <ContentWrapper backgroundColor={backgroundColor || grey3} padding="8px" width="100%">
        <Span
            color={color}
            fontSize={fontSize || titleFontSize}
            fontWeight={fontWeight || titleFontWeight}
            lineHeight={textLineHeight}
        >
            {children}
        </Span>
    </ContentWrapper>
);

interface ValidationDataSpanProps extends Color {}

const ValidationDataSpan: FC<ValidationDataSpanProps> = ({ children, color }) => (
    <ContentText color={color || undefined} fontWeight={textFontWeight} lineHeight={textLineHeight}>
        {children}
    </ContentText>
);

interface WomPropertyBlockProps extends WomPropertyBlockWrapperProps {
    title: string;
}

const WomPropertyBlock: FC<WomPropertyBlockProps> = ({ title, children, ...props }) => (
    <WomPropertyBlockWrapper {...props}>
        <ContentText color={grey13} fontWeight={textFontWeight} lineHeight={textLineHeight}>
            {title}
        </ContentText>
        <Section alignCenter noWrap marginTop="10px">
            {children}
        </Section>
    </WomPropertyBlockWrapper>
);

interface EngagementIndicatorBlockProps {
    title: string;
    value: number;
    percentageGrowth?: number;
}

const EngagementIndicatorBlock = ({ value, percentageGrowth, title }: EngagementIndicatorBlockProps) => (
    <WomPropertyBlock
        background="transparent"
        marginBottom="14px"
        minWidth={engagementBlockMinWidth}
        title={title}
        width={engagementBlockWidth}
    >
        <ContentText fontWeight={textFontWeight} lineHeight={textLineHeight} padding={engagementBlockPadding}>
            {value}
        </ContentText>
        {percentageGrowth !== undefined && (
            <ContentText
                color={percentageGrowth === 0 ? black : percentageGrowth > 0 ? green : errorColor}
                fontSize={percentageGrowthFontSize}
                fontWeight={textFontWeight}
                lineHeight={textLineHeight}
                padding={engagementBlockPadding}
            >
                {percentageGrowth === 0 ? '' : percentageGrowth > 0 ? '+ ' : '- '} {percentageGrowth || 0}%
            </ContentText>
        )}
    </WomPropertyBlock>
);

interface SvgCircleProps extends Pick<ConsensusScoreBlockProps, 'highValue' | 'lowValue'> {}

const SvgCircle = ({ highValue = 0, lowValue = 0 }: SvgCircleProps) => {
    const filledRingPercent = Math.round((highValue - lowValue) * percentConversionCoefficient) || 0;
    const emptyRingPercent = 100 - filledRingPercent;
    const offsetPercent =
        zeroOffsetCoefficient + Math.round((maxScore - highValue) * percentConversionCoefficient) + filledRingPercent;

    //console.log('filledRingPercent ', filledRingPercent, 'emptyRingPercent', emptyRingPercent, 'offset', offsetPercent);

    return (
        <>
            <svg height={svgContainerDiameter} viewBox="0 0 40 40" width={svgContainerDiameter}>
                <circle
                    className="empty-ring"
                    cx="20"
                    cy="20"
                    fill="transparent"
                    r="15.91549430918954"
                    stroke={lightBlue}
                    //strokeDasharray="10 10"
                    //strokeDashoffset="25"
                    strokeWidth="2"
                ></circle>
                <circle
                    className="filled-ring"
                    cx="20"
                    cy="20"
                    fill="transparent"
                    r="15.91549430918954"
                    stroke={blue}
                    strokeDasharray={`${filledRingPercent} ${emptyRingPercent}`}
                    strokeDashoffset={offsetPercent}
                    strokeWidth="2"
                ></circle>
            </svg>
        </>
    );
};

interface ConsensusScoreBlockProps {
    title: string;
    value?: number;
    highValue?: number;
    lowValue?: number;
}

const ConsensusScoreBlock = ({ value, title, highValue = 0, lowValue = 0 }: ConsensusScoreBlockProps) => {
    const consensusRange =
        highValue && lowValue ? `${lowValue.toFixed(roundToNumber)} - ${highValue.toFixed(roundToNumber)}` : 0;

    const averageScore = value?.toFixed(roundToNumber);
    //console.log('lowValue - highValue', lowValue, highValue);

    return (
        <WomPropertyBlock
            background="transparent"
            minWidth={consensusBlockMinWidth}
            padding={consensusBlockPadding}
            title={title}
            width={engagementBlockWidth}
        >
            <Column alignCenter>
                <RelativeWrapper height="60px" width={svgContainerDiameter}>
                    <AbsoluteWrapper left="18px" top="17px">
                        <ContentText color={blue} fontWeight={consensusSpanFontWeight}>
                            {averageScore}
                        </ContentText>
                    </AbsoluteWrapper>
                    <SvgCircle highValue={highValue} lowValue={lowValue} />
                </RelativeWrapper>

                <ContentText color={blue} fontSize="10px" fontWeight={consensusSpanFontWeight}>
                    {consensusRange}
                </ContentText>
            </Column>
        </WomPropertyBlock>
    );
};

const PercentageRangeSpan: FC = ({ children }) => (
    <MarginWrapper marginBottom={tableMarginBottom}>
        <Span color={grey13} fontSize="12px" fontWeight={textFontWeight} lineHeight={textLineHeight}>
            {children}
        </Span>
    </MarginWrapper>
);

const PercentageValueSpan: FC = ({ children }) => (
    <MarginWrapper marginBottom={tableMarginBottom}>
        <Span fontSize={textFontSize} fontWeight={textFontWeight}>
            {children}
        </Span>
    </MarginWrapper>
);

export interface WOMVideoDescriptionProps extends YEAY.AdminGetVideoResponse, YEAY.YeayValidationInfo {}

export const WOMVideoDescription = ({
    curationEndedReason = 0,
    validation,
    isDeleted = false,
    streaming,
    thumbnailUrl
}: WOMVideoDescriptionProps) => {
    //  const loading = useStore(loadingStores.loading);
    // const loadingWomApi = useStore(videosEffects.getWOMVideoDataById.pending);
    // const videoLoading = useStore(videosStores.editLoading);
    // const videoId = id;
    //const { access } = useStore(userStores.auth);

    const { engagement, womQualityScore, /*validationState, products,*/ isDeleted: WomIsDeleted, tags } = useStore(
        videosStores.videoWOMData
    );

    const { consensusRange } = useStore(videosStores.validationState);

    // const { processStatus, endedReason, currentStage, validationResult, profitLoss } = useStore(
    //     videosStores.videoDetails
    // );

    const { wom, primaryProduct } = useStore(videosStores.videoDetails);
    const processStatus = wom?.processStatus;
    const endedReason = wom?.endedReason;
    const currentStage = wom?.currentStage;
    const validationResult = wom?.validationResult;
    const brandName = primaryProduct?.name;
    const brandDescription = primaryProduct?.description;

    const engagementMappedWOMStatistic: { [key in NameEngagementType]: number | undefined } = {
        likes: engagement?.likeCount,
        saves: engagement?.saveCount,
        views: engagement?.viewCount,
        commentCount: engagement?.commentCount,
        shares: engagement?.shareCount
    };

    const screenGrabUrl = streaming?.details?.screenGrabUrl || '';
    const videoSrc = streaming?.details?.hlsUrl;
    // const grading = validation?.wom?.grading?.consensus;
    // *  0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
    const curationState = validation?.yeay?.curationState;

    // useEffect(() => {
    //     if (access === Roles.Administrator || access === Roles.SuperAdministrator) {
    //         videosEffects.getWOMVideoDataById(id);
    //         videosEffects.getVideoDetailsByIds({ videoId });
    //     }
    //     eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    //console.log('processStatus__', processStatus);
    //console.log('WOMIsDeleted__', WomIsDeleted);
    //console.log('tags ', tags);
    //console.log('brandName', brandName);
    //console.log('brandDescription', brandDescription);
    // console.log('likes%__', engagement?.likesPercentage, 'shares%__', engagement?.sharesPercentage);
    // console.log('saves%__', engagement?.savesPercentage, 'comments%__', engagement?.commentsPercentage);

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
                        fontSize={textFontSize}
                        uppercase={isDeleted}
                    >
                        {(isDeleted && statuses[4].text) ||
                            (curationState === 3 &&
                                `${statuses[3].text} (${rejectionReasonText[curationEndedReason]})`) ||
                            (curationState !== undefined && statuses[curationState].text)}
                    </ContentText>
                </Section>
                <Section>
                    <Column marginBottom={cardMargin} marginRight={cardMargin}>
                        <RelativeWrapper height="100%" width={videoPlayerWidth}>
                            <VideoContainer
                                height="410px"
                                minWidth="240px"
                                screenGrabUrl={screenGrabUrl}
                                thumbnailUrl={thumbnailUrl}
                                videoSrc={videoSrc || ''}
                            />
                        </RelativeWrapper>
                    </Column>
                    <FlexGrow>
                        <Section marginBottom={titleMarginBottom}>
                            <Title>
                                WOM&nbsp;&nbsp;
                                <ContentText
                                    color={
                                        (WomIsDeleted && errorColor) ||
                                        (processStatus !== undefined &&
                                            WomVideoValidationStatusesObject[processStatus].color) ||
                                        black
                                    }
                                    fontSize={textFontSize}
                                >
                                    (
                                    {(WomIsDeleted && 'This video was deleted') ||
                                        (processStatus !== undefined &&
                                            WomVideoValidationStatusesObject[processStatus].text)}
                                    )
                                </ContentText>
                            </Title>
                        </Section>

                        <Section>
                            <WomPropertyBlock title="Validation Results" width={propertyBlockWidth}>
                                <ValidationDataSpan color={validationResultObject[validationResult || 0].color}>
                                    {validationResult ? validationResultObject[validationResult].text : ''}
                                </ValidationDataSpan>
                            </WomPropertyBlock>

                            <WomPropertyBlock title="Validation Stage" width={propertyBlockWidth}>
                                <ValidationDataSpan>
                                    {currentStage ? validationStageObject[currentStage].text : ''}
                                </ValidationDataSpan>
                            </WomPropertyBlock>

                            <WomPropertyBlock title="Validation Ended Reason" width={propertyBlockWidth}>
                                <ValidationDataSpan color={endedReasonObject[endedReason || 0].color}>
                                    {endedReason ? endedReasonObject[endedReason].text : ''}
                                </ValidationDataSpan>
                            </WomPropertyBlock>
                        </Section>
                        <Section marginBottom={titleMarginBottom}>
                            <Title>Consensus</Title>
                        </Section>
                        <Section>
                            <ConsensusScoreBlock
                                highValue={consensusRange?.highAuthenticity}
                                lowValue={consensusRange?.lowAuthenticity}
                                title="Authenticity"
                                value={womQualityScore?.authenticity || 0}
                            />

                            <ConsensusScoreBlock
                                highValue={consensusRange?.highCreativity}
                                lowValue={consensusRange?.lowCreativity}
                                title="Creativity"
                                value={womQualityScore?.creativity || 0}
                            />

                            <ConsensusScoreBlock
                                highValue={consensusRange?.highPositivity}
                                lowValue={consensusRange?.lowPositivity}
                                title="Positivity"
                                value={womQualityScore?.positivity || 0}
                            />
                        </Section>

                        <Section marginBottom={titleMarginBottom}>
                            <Title>Product Information</Title>
                        </Section>

                        <Section>
                            <WomPropertyBlock background="transparent" title="Brand" width={propertyBlockWidth}>
                                <ContentText fontWeight={textFontWeight} lineHeight={textLineHeight}>
                                    {brandName || ''}
                                </ContentText>
                            </WomPropertyBlock>
                            <WomPropertyBlock background="transparent" title="Items" width={propertyBlockWidth}>
                                <ContentText fontWeight={textFontWeight} lineHeight={textLineHeight}>
                                    {brandDescription || ''}
                                </ContentText>
                            </WomPropertyBlock>
                        </Section>

                        <Section marginBottom={titleMarginBottom}>
                            <Title>Engagement</Title>
                        </Section>

                        <Section>
                            <EngagementIndicatorBlock title="Views" value={engagementMappedWOMStatistic.views || 0} />
                            {/* <EngagementIndicatorBlock title="WOM" value={profitLoss?.womTotalEarnings || 0} /> */}
                            <EngagementIndicatorBlock
                                percentageGrowth={engagement?.likesPercentage || 0}
                                title="Likes"
                                value={engagementMappedWOMStatistic.likes || 0}
                            />
                            <EngagementIndicatorBlock
                                percentageGrowth={engagement?.savesPercentage || 0}
                                title="Saves"
                                value={engagementMappedWOMStatistic.saves || 0}
                            />
                            <EngagementIndicatorBlock
                                percentageGrowth={engagement?.commentsPercentage || 0}
                                title="Comment"
                                value={engagementMappedWOMStatistic.commentCount || 0}
                            />
                            <EngagementIndicatorBlock
                                percentageGrowth={engagement?.sharesPercentage || 0}
                                title="Shares"
                                value={engagementMappedWOMStatistic.shares || 0}
                            />
                        </Section>

                        <Section>
                            <Title backgroundColor="transparent" color={grey13} fontWeight={textFontWeight}>
                                Average Percentage Viewed
                            </Title>
                        </Section>

                        <Section>
                            <Column marginLeft="8px" marginRight="80px">
                                <PercentageRangeSpan>{'< 25%'}</PercentageRangeSpan>
                                <PercentageRangeSpan>25% - 50%</PercentageRangeSpan>
                                <PercentageRangeSpan>50% - 75%</PercentageRangeSpan>
                                <PercentageRangeSpan>{'> 75%'}</PercentageRangeSpan>
                            </Column>
                            <Column>
                                <PercentageValueSpan>{engagement?.viewsD1Percentage || 0}%</PercentageValueSpan>
                                <PercentageValueSpan>{engagement?.viewsD2Percentage || 0}%</PercentageValueSpan>
                                <PercentageValueSpan>{engagement?.viewsD3Percentage || 0}%</PercentageValueSpan>
                                <PercentageValueSpan>{engagement?.viewsD4Percentage || 0}%</PercentageValueSpan>
                            </Column>
                        </Section>

                        <Section marginBottom={tableMarginBottom}>
                            <Title>Hashtags</Title>
                        </Section>

                        <Section>
                            <ScrollableWrapper overflowY="scroll" /*width="350px"*/>
                                {tags?.length
                                    ? tags.map(item => (
                                          <RemovableHashtag
                                              key={item}
                                              untouchable
                                              subject={item}
                                              // type={type}
                                              text={item}
                                          />
                                      ))
                                    : 'no hashtags'}
                            </ScrollableWrapper>
                        </Section>
                    </FlexGrow>
                </Section>
            </DescriptionWrapper>
        </>
    );
};
