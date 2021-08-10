import avatarImg from 'assets/avatar.svg';
import verifiedImg from 'assets/is_trusted.svg';
import { imgDiameter, verifiedImgDiameter } from 'components/common/imgComponents/UserImg/constants';
import { ImgWrapper } from 'components/common/imgComponents/UserImg/styles';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import React from 'react';
import { ImgProperties } from 'types/data';

interface Props extends ImgProperties {
    isTrusted?: boolean;
}

export const UserImg = ({ src, alt = 'verified', isTrusted }: Props) => (
    <ImgWrapper>
        <CustomImg
            alt="avatar"
            borderRadius="50%!important"
            height={imgDiameter}
            src={src || avatarImg}
            width={imgDiameter}
        />
        {isTrusted && (
            <AbsoluteWrapper bottom="0px" left="27px">
                <CustomImg alt={alt} height={verifiedImgDiameter} src={verifiedImg} width={verifiedImgDiameter} />
            </AbsoluteWrapper>
        )}
    </ImgWrapper>
);
