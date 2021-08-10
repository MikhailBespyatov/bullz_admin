import { ImgProps } from 'componentsNewDesign/common/imgComponents/CustomImg/types';
import React, { MouseEventHandler } from 'react';
import { LazyImage } from 'react-lazy-images';
import { CustomImage } from './styles';

export interface CustomImageProps extends ImgProps {
    alt?: string;
    src: string;
    onClick?: MouseEventHandler;
    className?: string;
}

export const CustomImg = ({ className, alt, src, onClick, ...rest }: CustomImageProps) => (
    <LazyImage
        actual={({ imageProps }) => <CustomImage className={className} onClick={onClick} {...rest} {...imageProps} />}
        alt={alt}
        debounceDurationMs={200}
        // loading={() => <LogoImg />}
        placeholder={({ ref }) => (
            <CustomImage ref={ref} alt={alt} className={className} onClick={onClick} {...rest} src={src} />
            // <LogoImg ref={ref} />
        )}
        src={src}
    />
);
