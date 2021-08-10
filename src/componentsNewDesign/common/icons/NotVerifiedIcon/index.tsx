import trustedIcon from 'assets/error.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';
import { notVerifiedIconDiameter } from 'componentsNewDesign/common/icons/NotVerifiedIcon/constant';

export const NotVerifiedIcon = () => (
    <CustomImg
        alt="Account is not verified"
        height={notVerifiedIconDiameter}
        src={trustedIcon}
        width={notVerifiedIconDiameter}
    />
);
