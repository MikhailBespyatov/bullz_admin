import trustedIcon from 'assets/trusted-icon.svg';
import { trustedIconDiameter } from 'componentsNewDesign/common/icons/TrustedIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

interface TrustedIconProps {
    diameter?: string;
}

export const TrustedIcon = ({ diameter = trustedIconDiameter }: TrustedIconProps) => (
    <CustomImg alt="Account is trusted" height={diameter} src={trustedIcon} width={diameter} />
);
