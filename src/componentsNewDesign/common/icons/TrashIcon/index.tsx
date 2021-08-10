import trashIcon from 'assets/trash_can_icon.svg';
import { trashIconHeight, trashIconWidth } from 'componentsNewDesign/common/icons/TrashIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

export const TrashIcon = () => (
    <CustomImg alt="Trash can icon" height={trashIconHeight} src={trashIcon} width={trashIconWidth} />
);
