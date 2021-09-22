import addIcon from 'assets/add_icon_white.svg';
import { addIconWidthAndHeight } from 'componentsNewDesign/common/icons/AddIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';
import { Sizes } from 'types/styles';

interface Props extends Sizes {}

export const AddIcon = ({ width, height }: Props) => (
    <CustomImg
        alt="Plus icon"
        height={height || addIconWidthAndHeight}
        src={addIcon}
        width={width || addIconWidthAndHeight}
    />
);
