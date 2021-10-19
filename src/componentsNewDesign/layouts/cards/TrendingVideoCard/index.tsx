import defaultImg from 'assets/defaults/default_img.svg';
import playButtonImage from 'assets/play_button_image.svg';
import history from 'browserHistory';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import {
    cardWrapperMargin,
    playIconWidth,
    positionHeight,
    positionPadding,
    textFontSize,
    textFontWeight,
    videoPosterHeight,
    videoPosterWidth,
    viewCountBackgroundColor,
    viewCountBorderRadius,
    viewCountMargin,
    viewCountPadding
} from 'componentsNewDesign/layouts/cards/TrendingVideoCard/constants';
import { TrendingCardHoverModal } from 'componentsNewDesign/modals/TrendingCardHoverModal';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteCenterAlignment } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { TrendingCardWrapper } from 'componentsNewDesign/wrappers/TrendingCardWrapper';
import { homeLink } from 'constants/routes';
import { grey15, white } from 'constants/styles/colors';
// import { useStore } from 'effector-react';
import React from 'react';
import { RemoveClick } from 'types/modals';

interface VideoCardProps extends BULLZ.GetTrendVideosResponse {
    position?: number;
}

export interface Props extends BULLZ.GetTrendVideosResponse, VideoCardProps, RemoveClick {}

export const VideoCard = ({ viewCount, position }: VideoCardProps) => (
    <Column justifyBetween height={videoPosterHeight}>
        <Section alignCenter justifyEnd>
            {position !== undefined && (
                <MarginWrapper margin="4px">
                    <ContentWrapper height={positionHeight} minWidth={positionHeight} padding={positionPadding}>
                        <Column>
                            <ContentText lineHeight={textFontSize}>{position + 1 || ''}</ContentText>
                        </Column>
                    </ContentWrapper>
                </MarginWrapper>
            )}
        </Section>
        <MarginWrapper margin={viewCountMargin}>
            <ContentWrapper
                backgroundColor={viewCountBackgroundColor}
                borderRadius={viewCountBorderRadius}
                height="14px"
                minWidth="30px"
            >
                <Row alignCenter noWrap>
                    <CustomImg alt="Play icon" height={playIconWidth} src={playButtonImage} width={playIconWidth} />
                    <ContentText
                        color={white}
                        fontSize={textFontSize}
                        fontWeight={textFontWeight}
                        height="14px"
                        lineHeight={textFontSize}
                        maxWidth="71px"
                        padding={viewCountPadding}
                    >
                        {viewCount || 0}
                    </ContentText>
                </Row>
            </ContentWrapper>
        </MarginWrapper>
    </Column>
);

export const TrendingVideoCard = ({ onRemove, thumbnailUrl, videoId, ...rest }: Props) => {
    // const { access } = useStore(userStores.auth);
    const moreInfoHandleClick = () => history.push(homeLink + '/' + videoId);

    return (
        <TrendingCardWrapper
            background={`url(${thumbnailUrl || defaultImg})  no-repeat`}
            backgroundColor={grey15}
            marginBottom={cardWrapperMargin}
            marginRight={cardWrapperMargin}
            width={videoPosterWidth}
        >
            <AbsoluteCenterAlignment z-index="5">
                <CardHoverOpacityEffect>
                    <TrendingCardHoverModal onClick={moreInfoHandleClick} onRemove={onRemove} />
                </CardHoverOpacityEffect>
            </AbsoluteCenterAlignment>
            <VideoCard {...rest} />
        </TrendingCardWrapper>
    );
};
