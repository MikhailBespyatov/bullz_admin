import noProductImageIcon from 'assets/no_product_icon.svg';
import history from 'browserHistory';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { noProductImageIconHeight } from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import { MagnifyImage } from 'componentsNewDesign/modals/MagnifyImage';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import React from 'react';
import { ImgProperties } from 'types/data';
import { BorderRadius, Sizes } from 'types/styles';

export interface PosterLayoutProps extends Pick<ImgProperties, 'src'>, Sizes, BorderRadius {
    defaultPoster?: string;
    redirectTo?: string;
    posterWidth?: string;
    posterHeight?: string;
}

export const PosterLayout = ({
    src,
    width = noProductImageIconHeight,
    height = width,
    posterWidth = width,
    posterHeight = posterWidth,
    defaultPoster = noProductImageIcon,
    borderRadius,
    redirectTo
}: PosterLayoutProps) => (
    <>
        {src ? (
            <MagnifyImage borderRadius={borderRadius} src={src} viewHeight={posterHeight} viewWidth={posterWidth} />
        ) : (
            <ClickableWrapper disabled={!redirectTo} onClick={redirectTo ? () => history.push(redirectTo) : undefined}>
                <CustomImg
                    center
                    alt="Poster image"
                    borderRadius={borderRadius}
                    height={height}
                    src={defaultPoster}
                    width={width}
                />
            </ClickableWrapper>
        )}
    </>
);
