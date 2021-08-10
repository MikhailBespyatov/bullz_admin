import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import {
    enlargeMultiplier,
    imageMaxHeight,
    imageMaxWidth,
    smallImageAlt
} from 'componentsNewDesign/modals/MagnifyImage/constants';
import { ClickWrapper, Img, ImgWrapper } from 'componentsNewDesign/modals/MagnifyImage/styles';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { filterMargin } from 'constants/styles/sizes';
import { useModal } from 'hooks/modal';
import React, { useEffect, useRef, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { ImgStrictProperties, Title } from 'types/data';
import { BorderRadius } from 'types/styles';

interface Props extends ImgStrictProperties, Title, BorderRadius {
    viewWidth?: string;
    viewHeight?: string;
}

export const MagnifyImage = ({ src, title = 'Zoom image', viewWidth, viewHeight, borderRadius }: Props) => {
    const image = useRef<HTMLImageElement>(null);
    const { visible, close, open } = useModal();

    const [width, setWidth] = useState(imageMaxWidth);
    const [height, setHeight] = useState(imageMaxHeight);
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const size = image?.current?.width;

    // const isLessThenIpadProResolution = windowWidth < parseInt(ipadProMaxResolution);

    // const resizeWindow = () => setWindowWidth(window.innerWidth);

    useEffect(() => {
        const initialWidth = image?.current?.width || 0;
        const initialHeight = image?.current?.height || 0;

        if (initialWidth && initialHeight) {
            if (initialWidth > initialHeight) {
                setWidth(imageMaxWidth);
                setHeight((imageMaxWidth / initialWidth) * initialHeight);
            } else {
                setWidth((imageMaxWidth / initialHeight) * initialWidth);
                setHeight(imageMaxHeight);
            }
        }
    }, [size]);

    // useEffect(() => {
    //     window.addEventListener('resize', resizeWindow);
    //     return () => window.removeEventListener('resize', resizeWindow);
    // }, []);

    return (
        <>
            <ClickWrapper onClick={open}>
                <ImgWrapper center background={src} borderRadius={borderRadius} height={viewHeight} width={viewWidth}>
                    <Img ref={image} alt={smallImageAlt} src={src} />
                </ImgWrapper>
            </ClickWrapper>
            <ModalWrapper visible={visible} onClose={close}>
                <Column alignCenter width="100%">
                    <MarginWrapper marginBottom={filterMargin}>
                        <ContentText>{title}</ContentText>
                    </MarginWrapper>
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: smallImageAlt,
                                isFluidWidth: false,
                                width: width,
                                height: height,
                                src: src
                            },
                            largeImage: {
                                src: src,
                                width: width * enlargeMultiplier,
                                height: height * enlargeMultiplier
                            },
                            enlargedImagePosition: 'over'
                        }}
                    />
                </Column>
            </ModalWrapper>
        </>
    );
};
