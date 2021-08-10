import uploadImageIcon from 'assets/upload_image_icon.svg';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { SimpleButtonProps } from 'componentsNewDesign/common/buttons/SimpleButton/types';
import {
    uploadImageBtnBgColor,
    uploadImageIconWidthAndHeight,
    uploadImgBtnHeight,
    uploadImgBtnTxtFontSize,
    uploadImgBtnWidth
} from 'componentsNewDesign/common/buttons/UploadImageButton/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import React, { FC } from 'react';
import { Text } from './style';

export const UploadImageButton: FC<SimpleButtonProps> = props => (
    <SimpleButton
        background={uploadImageBtnBgColor}
        fontSize={uploadImgBtnTxtFontSize}
        height={uploadImgBtnHeight}
        width={uploadImgBtnWidth}
        {...props}
    >
        <Column alignCenter>
            <CustomImg
                alt="Upload image button"
                height={uploadImageIconWidthAndHeight}
                src={uploadImageIcon}
                width={uploadImageIconWidthAndHeight}
            />
            <Text>Upload Image</Text>
        </Column>
    </SimpleButton>
);
