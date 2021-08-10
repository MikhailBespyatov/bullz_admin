import moreInfoIcon from 'assets/more_info_icon.svg';
import { moreInfoIconWidthAndHeight } from 'componentsNewDesign/common/icons/MoreInfoIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

export const MoreInfoIcon = () => (
    <CustomImg
        alt="More information icon"
        height={moreInfoIconWidthAndHeight}
        src={moreInfoIcon}
        width={moreInfoIconWidthAndHeight}
    />
);
