import { useMediaQuery } from '@material-ui/core';
import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import { UserCard } from 'componentsNewDesign/layouts/cards/TrendingUserCard';
import { cardWrapperMargin } from 'componentsNewDesign/layouts/cards/TrendingUserCard/constants';
import { CreateTrendingCardHoverModal } from 'componentsNewDesign/modals/CreateTrendingCardHoverModal';
import { AbsoluteCenterAlignment } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { TrendingCardWrapper } from 'componentsNewDesign/wrappers/TrendingCardWrapper';
import { grey23 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
// import { useStore } from 'effector-react';
import React from 'react';
import { trendingsEffects } from 'stores/trendings';

export interface Props extends BULLZ.AdminGetUserCommon {
    width?: string;
}

export const CreateTrendingUserCard = ({ id, isTrusted, username, profileImageUrl, width }: Props) => {
    //const loading = useStore(trendingsStores.createLoading);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const selectHandleClick = () => trendingsEffects.createItem({ userId: id });
    return (
        <>
            <TrendingCardWrapper
                backgroundColor={grey23}
                marginBottom={cardWrapperMargin}
                marginRight={isMobile ? '0' : cardWrapperMargin}
                width={width || 'fit-content'}
            >
                <AbsoluteCenterAlignment zIndex="5">
                    <CardHoverOpacityEffect>
                        <CreateTrendingCardHoverModal onClick={selectHandleClick} />
                    </CardHoverOpacityEffect>
                </AbsoluteCenterAlignment>
                <UserCard isTrusted={isTrusted} profileImageUrl={profileImageUrl} username={username} />
            </TrendingCardWrapper>
        </>
    );
};
