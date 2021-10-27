import history from 'browserHistory';
import { AvatarImg } from 'componentsNewDesign/common/imgComponents/AvatarImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import {
    avatarImageWidthAndHeight,
    cardContentHorizontalMargin,
    cardContentVerticalMargin,
    cardWrapperMargin,
    usernameFontSize,
    usernameFontWeight,
    usernamePadding
} from 'componentsNewDesign/layouts/cards/TrendingUserCard/constants';
import { TrendingCardHoverModal } from 'componentsNewDesign/modals/TrendingCardHoverModal';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteCenterAlignment } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { TrendingCardWrapper } from 'componentsNewDesign/wrappers/TrendingCardWrapper';
import { usersLink } from 'constants/routes';
import { grey23, grey27 } from 'constants/styles/colors';
// import { useStore } from 'effector-react';
import React from 'react';
// import { userStores } from 'stores/users/user';
import { RemoveClick } from 'types/modals';

export interface Props extends BULLZ.GetTrendingUserResponse, RemoveClick {}

export interface UserCardProps extends BULLZ.GetTrendingUserResponse {}

export const UserCard = ({ isTrusted, username, profileImageUrl }: UserCardProps) => (
    <ContentWrapper backgroundColor={grey27}>
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
                    borderRadius="50%"
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
                    {`@${username}`}
                </ContentText>
            </Column>
        </Row>
    </ContentWrapper>
);

export const TrendingUserCard = ({ profileImageUrl, userId, isTrusted, username, onRemove }: Props) => {
    // const { access } = useStore(userStores.auth);
    const moreInfoHandleClick = () => history.push(usersLink + '/' + userId);
    return (
        <>
            <TrendingCardWrapper
                backgroundColor={grey23}
                marginBottom={cardWrapperMargin}
                marginRight={cardWrapperMargin}
                width="fit-content"
            >
                <AbsoluteCenterAlignment zIndex="5">
                    <CardHoverOpacityEffect>
                        <TrendingCardHoverModal onClick={moreInfoHandleClick} onRemove={onRemove} />
                    </CardHoverOpacityEffect>
                </AbsoluteCenterAlignment>
                <UserCard isTrusted={isTrusted} profileImageUrl={profileImageUrl} username={username} />
            </TrendingCardWrapper>
        </>
    );
};
