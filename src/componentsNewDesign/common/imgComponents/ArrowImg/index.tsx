import arrowImg from 'assets/icons/arrow_icon.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';
import { Rotation, Sizes } from 'types/styles';

interface Props extends Rotation, Sizes {
    alt?: string;
}

export const ArrowImg = ({ height, width, alt, ...props }: Props) => (
    <CustomImg {...props} pointer alt={alt} height={height || '8px'} src={arrowImg} width={width || '16px'} />
);
