import history from 'browserHistory';
import { AvatarImg } from 'componentsNewDesign/common/imgComponents/AvatarImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import {
    avatarImageWidthAndHeight,
    cardContentHorizontalMargin,
    cardContentVerticalMargin,
    cardWrapperMargin,
    hoverModalPositionLeft,
    hoverModalPositionTop,
    usernameFontSize,
    usernameFontWeight,
    usernamePadding
} from 'componentsNewDesign/layouts/cards/TrendingUserCard/constants';
import { TrendingCardHoverModal } from 'componentsNewDesign/modals/TrendingCardHoverModal';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { TrendingCardWrapper } from 'componentsNewDesign/wrappers/TrendingCardWrapper';
import { usersLink } from 'constants/routes';
import { grey15 } from 'constants/styles/colors';
// import { useStore } from 'effector-react';
import React from 'react';
// import { userStores } from 'stores/users/user';
import { RemoveClick } from 'types/modals';

export interface Props extends YEAY.GetTrendingUserResponse, RemoveClick {}

export interface UserCardProps extends YEAY.GetTrendingUserResponse {}

export const UserCard = ({ isTrusted, username, profileImageUrl }: UserCardProps) => (
    <Row alignCenter justifyCenter>
        <Column
            alignCenter
            height="100%"
            marginLeft={cardContentHorizontalMargin}
            marginRight={cardContentHorizontalMargin}
            marginTop={cardContentVerticalMargin}
            width="100%"
        >
            <AvatarImg
                height={avatarImageWidthAndHeight}
                isTrusted={isTrusted}
                src={profileImageUrl || ''}
                width={avatarImageWidthAndHeight}
            />
            <ContentText
                alignTextCenter
                fontSize={usernameFontSize}
                fontWeight={usernameFontWeight}
                padding={usernamePadding}
                width="66px"
            >
                {username}
            </ContentText>
        </Column>
    </Row>
);

export const TrendingUserCard = ({ profileImageUrl, userId, isTrusted, username, onRemove }: Props) => {
    // const { access } = useStore(userStores.auth);
    const moreInfoHandleClick = () => history.push(usersLink + '/' + userId);
    return (
        <>
            <TrendingCardWrapper
                backgroundColor={grey15}
                marginBottom={cardWrapperMargin}
                marginRight={cardWrapperMargin}
                width="fit-content"
            >
                <AbsoluteWrapper left={hoverModalPositionLeft} top={hoverModalPositionTop} zIndex="5">
                    <CardHoverOpacityEffect>
                        <TrendingCardHoverModal onClick={moreInfoHandleClick} onRemove={onRemove} />
                    </CardHoverOpacityEffect>
                </AbsoluteWrapper>
                <UserCard isTrusted={isTrusted} profileImageUrl={profileImageUrl} username={username} />
            </TrendingCardWrapper>
        </>
    );
};
