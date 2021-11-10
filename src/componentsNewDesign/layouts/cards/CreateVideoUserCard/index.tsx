import { useMediaQuery } from '@material-ui/core';
import defaultImg from 'assets/defaults/default_img.svg';
import { CardHoverOpacityEffect } from 'componentsNewDesign/dynamic/effects';
import { cardWrapperMargin } from 'componentsNewDesign/layouts/cards/TrendingUserCard/constants';
import { VideoCard } from 'componentsNewDesign/layouts/cards/TrendingVideoCard';
import { videoPosterWidth } from 'componentsNewDesign/layouts/cards/TrendingVideoCard/constants';
import { CreateTrendingCardHoverModal } from 'componentsNewDesign/modals/CreateTrendingCardHoverModal';
import { AbsoluteCenterAlignment } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { TrendingCardWrapper } from 'componentsNewDesign/wrappers/TrendingCardWrapper';
import { grey15 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
// import { useStore } from 'effector-react';
import React from 'react';
import { CreateVideoProps } from 'stores/initialize/initialize.modal.store';
import { trendingsEffects } from 'stores/trendings';

interface Props extends BULLZ.AdminGetVideoResponse, CreateVideoProps {}

export const CreateTrendingVideoCard = ({ id = '', thumbnailUrl, definedPosition }: Props) => {
    // const loading = useStore(trendingsStores.createLoading);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const selectHandleClick = () => trendingsEffects.createVideo({ id, definedPosition });

    return (
        <>
            <TrendingCardWrapper
                background={`url(${thumbnailUrl || defaultImg})  no-repeat`}
                backgroundColor={grey15}
                marginBottom={cardWrapperMargin}
                marginRight={isMobile ? '0' : cardWrapperMargin}
                width={isMobile ? '85px' : videoPosterWidth}
            >
                <AbsoluteCenterAlignment z-index="5">
                    <CardHoverOpacityEffect>
                        <CreateTrendingCardHoverModal onClick={selectHandleClick} />
                    </CardHoverOpacityEffect>
                </AbsoluteCenterAlignment>
                <VideoCard />
            </TrendingCardWrapper>
        </>
    );
};
