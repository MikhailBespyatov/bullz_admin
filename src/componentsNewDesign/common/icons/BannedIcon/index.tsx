import bannedIcon from 'assets/banned_Icon.svg';
import { bannedIconDiameter } from 'componentsNewDesign/common/icons/BannedIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

export const BannedIcon = () => (
    <CustomImg alt="Account is disabled" height={bannedIconDiameter} src={bannedIcon} width={bannedIconDiameter} />
);
