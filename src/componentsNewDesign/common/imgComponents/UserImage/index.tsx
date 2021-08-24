import defaultUserImg from 'assets/bullz_logo_black.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import {
    userImageBorderRadius,
    userImageWidthAndHeight,
    userImageWrapperWidthAndHeight
} from 'componentsNewDesign/common/imgComponents/UserImage/constants';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import React, { FC } from 'react';

interface Props {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    src?: string;
}

export const UserImage: FC<Props> = ({ src, ...props }) => (
    <ClickableWrapper height={userImageWrapperWidthAndHeight} width={userImageWrapperWidthAndHeight} {...props}>
        <CustomImg
            alt="User avatar"
            borderRadius={userImageBorderRadius}
            height={userImageWidthAndHeight}
            src={src || defaultUserImg}
            width={userImageWidthAndHeight}
        />
    </ClickableWrapper>
);
