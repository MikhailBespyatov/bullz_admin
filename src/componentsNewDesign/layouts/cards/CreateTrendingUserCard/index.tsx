import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import { UserCard } from 'componentsNewDesign/layouts/cards/TrendingUserCard';
import {
    cardWrapperMargin,
    hoverModalPositionLeft
} from 'componentsNewDesign/layouts/cards/TrendingUserCard/constants';
import { CreateTrendingCardHoverModal } from 'componentsNewDesign/modals/CreateTrendingCardHoverModal';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { TrendingCardWrapper } from 'componentsNewDesign/wrappers/TrendingCardWrapper';
import { grey23 } from 'constants/styles/colors';
// import { useStore } from 'effector-react';
import React from 'react';
import { trendingsEffects } from 'stores/trendings';

export interface Props extends BULLZ.AdminGetUserCommon {}

export const CreateTrendingUserCard = ({ id, isTrusted, username, profileImageUrl }: Props) => {
    //const loading = useStore(trendingsStores.createLoading);

    const selectHandleClick = () => trendingsEffects.createItem({ userId: id });
    return (
        <>
            <TrendingCardWrapper
                backgroundColor={grey23}
                marginBottom={cardWrapperMargin}
                marginRight={cardWrapperMargin}
                width="fit-content"
            >
                <AbsoluteWrapper left={hoverModalPositionLeft} top="0px" zIndex="5">
                    <CardHoverOpacityEffect>
                        <CreateTrendingCardHoverModal onClick={selectHandleClick} />
                    </CardHoverOpacityEffect>
                </AbsoluteWrapper>
                <UserCard isTrusted={isTrusted} profileImageUrl={profileImageUrl} username={username} />
            </TrendingCardWrapper>
        </>
    );
};
