import commentsIcon from 'assets/comments_icon.svg';
import likesIcon from 'assets/likes_icon.svg';
import savesIcon from 'assets/saves_icon.svg';
import sharesIcon from 'assets/shares_icon.svg';
import viewsIcon from 'assets/views_icon.svg';
import { VideoContainer } from 'componentsNewDesign/common/dividers/VideoContainer';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { VideoCardHashtag } from 'componentsNewDesign/common/tags/Hashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { BlockTitle } from 'componentsNewDesign/layouts/blocks/PropertyBlock/styles';
import {
    formatEngagementStatisticsValues,
    popularityIndicatorTextHorizontalPadding,
    propertyBlockHorizontalPadding,
    propertyBlockWidth
} from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { UserNickName } from 'componentsNewDesign/layouts/cards/VideoCard/styles';
import { CardWrapper } from 'componentsNewDesign/wrappers/CardWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { usersLink } from 'constants/routes';
import { grey27, grey29, grey4 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';
import { copyEvents, copyStores } from 'stores/Copy';

export interface TeamVideoCardProps extends BULLZ.PlaylistVideoResponse {}

export const TeamVideoCard = ({
    id = '',
    username,
    ownerId,
    streaming,
    engagement,
    // engagementUser,
    //primaryProductId = '',
    //title,
    //comments,
    audioLanguages,
    hashTags = [],
    profileImageUrl,
    isTrusted
}: TeamVideoCardProps) => {
    // const { access } = useStore(userStores.auth);
    const copiedDataId = useStore(copyStores.copiedDataId);

    const screenGrabUrl = streaming?.screenGrabUrl || '';
    const videoSrc = streaming?.hlsUrl;
    //const grading = engagementUser?.womGrades;

    // const onEditClick = (id: string, hashTags: string[]) => {
    //     videoHashtagsEditorModal.openModal({ id, hashTags });
    // };

    const onCardClick = (e: MouseEvent) => {
        e.stopPropagation();
        copyEvents.setCopiedId(id);
    };

    return (
        <CardWrapper
            /*disabled={isDeleted}*/
            isSelected={copiedDataId === id}
            onClick={onCardClick}
        >
            <Column height="100%">
                <ContentWrapper
                    backgroundColor={grey29}
                    borderRadius="8px 8px 0px 0px"
                    minHeight="226px"
                    padding="11px 8px 8px"
                    width="100%"
                >
                    <Row alignCenter justifyBetween noWrap height="20px" /*width="345"*/>
                        <Row alignCenter noWrap>
                            <UserNickName to={usersLink + '/' + ownerId}>{username}</UserNickName>

                            {isTrusted && (
                                <MarginWrapper marginLeft="10px" marginRight="10px">
                                    <TrustedIcon />
                                </MarginWrapper>
                            )}
                        </Row>
                    </Row>
                    <ContentWrapper padding="18px 0px 10px" width="100%">
                        <RelativeWrapper>
                            <VideoContainer
                                height="250px"
                                minWidth="100px"
                                screenGrabUrl={screenGrabUrl}
                                thumbnailUrl={profileImageUrl}
                                videoSrc={videoSrc || ''}
                                width="100%"
                            />
                        </RelativeWrapper>
                    </ContentWrapper>

                    <Section alignCenter justifyBetween height="12px">
                        <Row alignCenter>
                            <CustomImg alt="Likes" height="12px" src={likesIcon} width="13px" />
                            <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                {formatEngagementStatisticsValues(engagement?.likes || 0)}
                            </ContentText>
                        </Row>

                        <Row alignCenter>
                            <CustomImg alt="Saves" height="12px" src={savesIcon} width="10px" />
                            <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                {formatEngagementStatisticsValues(engagement?.saves || 0)}
                            </ContentText>
                        </Row>

                        <Row alignCenter>
                            <CustomImg alt="Views" height="12px" src={viewsIcon} width="13px" />
                            <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                {formatEngagementStatisticsValues(engagement?.views || 0)}
                            </ContentText>
                        </Row>

                        <Row alignCenter>
                            <CustomImg alt="Comments" height="12px" src={commentsIcon} width="13px" />
                            <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                {formatEngagementStatisticsValues(engagement?.commentCount || 0)}
                            </ContentText>
                        </Row>

                        <Row alignCenter>
                            <CustomImg alt="Shares" height="12px" src={sharesIcon} width="12px" />
                            <ContentText padding={`0px ${popularityIndicatorTextHorizontalPadding}`}>
                                {formatEngagementStatisticsValues(engagement?.shares || 0)}
                            </ContentText>
                        </Row>
                    </Section>
                </ContentWrapper>

                <ContentWrapper backgroundColor={grey29} borderRadius="0px" width="100%">
                    <Section alignCenter justifyBetween marginTop="8px">
                        <Row alignCenter noWrap marginLeft="10px">
                            {/* <DateContent>{utcUploaded}</DateContent> */}

                            <MarginWrapper /*marginLeft="24px"*/>
                                <BlockTitle color={grey4}>{audioLanguages}</BlockTitle>
                            </MarginWrapper>
                        </Row>
                        {/* <Row alignCenter justifyEnd marginRight="20px">
                        <SimpleButton
                            background="transparent"
                            color={grey4}
                            padding="0px 0px 0px 20px"
                            onClick={() => onEditClick(id, hashTags || [])}
                        >
                            Edit
                        </SimpleButton>
                    </Row> */}
                    </Section>
                </ContentWrapper>
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
                                      <VideoCardHashtag text={item} />
                                  </MarginWrapper>
                              ))
                            : 'no hashtags'}
                    </ScrollableWrapper>
                </ContentWrapper>

                <ContentWrapper backgroundColor={grey29} borderRadius="0px" padding="4px 10px" width="100%">
                    <Section alignCenter justifyBetween>
                        <PropertyBlock
                            //copiable
                            backgroundColor={grey27}
                            //noWrap
                            //linkRoute={homeLink}
                            horizontalPadding={propertyBlockHorizontalPadding}
                            subtitle={id}
                            //success="Video ID was copied"
                            title="Video ID "
                            width={propertyBlockWidth}
                        />

                        <PropertyBlock
                            copiable
                            backgroundColor={grey27}
                            //noWrap
                            horizontalPadding={propertyBlockHorizontalPadding}
                            linkRoute={usersLink}
                            subtitle={ownerId}
                            success="User ID was copied"
                            title="User ID"
                            width={propertyBlockWidth}
                        />
                    </Section>
                </ContentWrapper>
            </Column>
        </CardWrapper>
    );
};
