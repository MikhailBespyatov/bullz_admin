import absentPrimaryImg from 'assets/absentPrimary.svg';
import commentImg from 'assets/comment.svg';
import errorImg from 'assets/error.svg';
import likeImg from 'assets/like.svg';
import saveImg from 'assets/save.svg';
import shareImg from 'assets/share.svg';
import viewImg from 'assets/view.svg';
import history from 'browserHistory';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { Badge } from 'components/common/typography/Badge';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { PlayThumbnail, Video } from 'components/common/Video';
import {
    Card,
    CardRow,
    CardRowFeatures,
    CardRowSlider,
    FeatureCell,
    PinnedBlock,
    PinnedInfo
} from 'components/grid/Card';
import {
    copyIdMessage,
    copyUserIdMessage,
    errorImageDiameter
} from 'components/layouts/cards/comments/CommentCard/constants';
import {
    absentPrimaryTemplate,
    copyProductIdMessage,
    copyUrlMessage,
    hashtagsInfoAbsentMessage
} from 'components/layouts/cards/videos/TeamVideoCard/constants';
import {
    PinnedSphere,
    Quantity,
    VideoInfoComponent,
    VideoInfoComponentCell,
    VideoInfoIcon,
    VideoWrapper
} from 'components/layouts/cards/videos/TeamVideoCard/styles';
import { Tooltip } from 'components/modals/Tooltip';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { homeLink, usersLink } from 'constants/routes';
import { atPrefix, hashTagPrefix } from 'constants/styles/others';
import { padding } from 'constants/styles/sizes';
import Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { FixSize } from 'types/styles';
import { averageValue, numberConverter } from 'utils/usefulFunctions';

interface GradingProps {
    grading: BULLZ.VideoDetailsValidationWOMGradingCommon;
}

export const Grading = ({ grading }: GradingProps) => {
    const numbersArray: number[] = Object.values(grading).map(i => Number(i));
    const average = averageValue(numbersArray);

    if (isNaN(average)) return null;
    return (
        <>
            {numbersArray.map((item: number, i) => (
                <PinnedSphere key={i.toString()} top={i + 1}>
                    {item}
                </PinnedSphere>
            ))}
            <PinnedSphere average right={2}>
                {average}
            </PinnedSphere>
        </>
    );
};

interface Props extends FixSize, BULLZ.PlaylistVideoResponse {}

export const TeamVideoCard = ({
    id = '',
    ownerId = '',
    primaryProductId = '',
    streaming,
    engagementUser,
    username,
    engagement,
    audioLanguages,
    hashTags,
    fixSize
}: Props) => {
    const video = useRef<HTMLVideoElement>(null);

    const userId = ownerId;
    const productId = primaryProductId;
    const hlsUrl = streaming?.hlsUrl || '';
    const thumbnailUrl = streaming?.screenGrabUrl;
    const engagementStatistics = engagement;
    const videoSrc = hlsUrl;
    const grading = engagementUser?.womGrades;

    const [startLoading, setStartLoading] = useState(false);

    const goLoading = () => setStartLoading(true);
    const usernameClickHandler = () => history.push(usersLink + '/' + userId);
    const moreInfoHandleClick = () => history.push(homeLink + '/' + id);

    useEffect(() => {
        if (startLoading && Hls.isSupported() && videoSrc && video.current) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video?.current?.play();
            });
        }
    }, [videoSrc, startLoading]);

    return (
        <>
            <Card fixSize={fixSize}>
                <VideoWrapper>
                    {!startLoading && <PlayThumbnail onClick={goLoading} />}
                    <Video ref={video} controls id="video" poster={thumbnailUrl || ''} preload="metadata" />
                    <PinnedBlock right={padding} top={padding}>
                        {(!productId || productId === absentPrimaryTemplate) && (
                            <Tooltip title="Video has no primary topic">
                                <CustomImg height="18px" src={absentPrimaryImg} />
                            </Tooltip>
                        )}
                    </PinnedBlock>
                    <PinnedBlock top={padding}>
                        <Row marginBottom="0">
                            {username && (
                                <Column marginRight={padding}>
                                    <PinnedInfo onClick={usernameClickHandler}>
                                        <Tooltip title="Username">
                                            <Badge count={atPrefix + username} />
                                        </Tooltip>
                                    </PinnedInfo>
                                </Column>
                            )}
                        </Row>
                        {!hlsUrl && (
                            <Tooltip title="Video has no hls stream">
                                <PinnedInfo>
                                    <CustomImg
                                        alt="error"
                                        height={errorImageDiameter}
                                        src={errorImg}
                                        width={errorImageDiameter}
                                    />
                                </PinnedInfo>
                            </Tooltip>
                        )}
                    </PinnedBlock>
                    {grading && <Grading grading={grading} />}
                </VideoWrapper>
                <ContentWrapper>
                    <VideoInfoComponent>
                        <VideoInfoComponentCell>
                            <Tooltip title="Views">
                                <VideoInfoIcon alt="view" src={viewImg} />
                            </Tooltip>
                            <Quantity>{numberConverter(engagementStatistics?.views || 0)}</Quantity>
                        </VideoInfoComponentCell>
                        <VideoInfoComponentCell>
                            <Tooltip title="Likes">
                                <VideoInfoIcon alt="like" src={likeImg} />
                            </Tooltip>
                            <Quantity>{numberConverter(engagementStatistics?.likes || 0)}</Quantity>
                        </VideoInfoComponentCell>
                        <VideoInfoComponentCell>
                            <Tooltip title="Saves">
                                <VideoInfoIcon alt="save" src={saveImg} />
                            </Tooltip>
                            <Quantity>{numberConverter(engagementStatistics?.saves || 0)}</Quantity>
                        </VideoInfoComponentCell>
                        <VideoInfoComponentCell>
                            <Tooltip title="Comments">
                                <VideoInfoIcon alt="comment" src={commentImg} />
                            </Tooltip>
                            <Quantity>{numberConverter(engagementStatistics?.commentCount || 0)}</Quantity>
                        </VideoInfoComponentCell>
                        <VideoInfoComponentCell>
                            <Tooltip title="Shares">
                                <VideoInfoIcon alt="share" src={shareImg} />
                            </Tooltip>
                            <Quantity>{numberConverter(engagementStatistics?.shares || 0)}</Quantity>
                        </VideoInfoComponentCell>
                    </VideoInfoComponent>
                    <CardRowSlider>
                        {audioLanguages?.length ? (
                            audioLanguages.map((item: string) => (
                                <Tooltip key={item} title="Spoken language">
                                    <Badge count={item} />
                                </Tooltip>
                            ))
                        ) : (
                            <AbsentInfo>No languages</AbsentInfo>
                        )}
                    </CardRowSlider>
                    <CardRowSlider>
                        {hashTags?.length ? (
                            hashTags.map((item: string, i: number) => (
                                <Badge key={i.toString()} count={hashTagPrefix + item} />
                            ))
                        ) : (
                            <AbsentInfo>{hashtagsInfoAbsentMessage}</AbsentInfo>
                        )}
                    </CardRowSlider>
                    <CardRow removeMarginBottom removePaddingRight>
                        <CopyButton subject={id} success={copyIdMessage}>
                            Copy video id
                        </CopyButton>
                        <CopyButton subject={userId} success={copyUserIdMessage}>
                            Copy user id
                        </CopyButton>
                        <CopyButton
                            subject={productId === absentPrimaryTemplate ? undefined : productId}
                            success={copyProductIdMessage}
                        >
                            Copy topic id
                        </CopyButton>
                        <CopyButton subject={hlsUrl} success={copyUrlMessage}>
                            Copy HLS url
                        </CopyButton>
                    </CardRow>
                </ContentWrapper>
                <CardRowFeatures quantity={1}>
                    <FeatureCell onClick={moreInfoHandleClick}>More info</FeatureCell>
                </CardRowFeatures>
            </Card>
        </>
    );
};
