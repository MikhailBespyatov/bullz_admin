import backArrowIcon from 'assets/back_arrow_icon.svg';
import { backArrowIconWidthAndHeight } from 'componentsNewDesign/common/icons/BackArrowIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

export const BackArrowIcon = () => (
    <CustomImg
        alt="Back-arrow button"
        height={backArrowIconWidthAndHeight}
        src={backArrowIcon}
        width={backArrowIconWidthAndHeight}
    />
);
