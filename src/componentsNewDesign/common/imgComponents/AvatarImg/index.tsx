import defaultAvatarImg from 'assets/bullz_logo_black.svg';
import { BannedIcon } from 'componentsNewDesign/common/icons/BannedIcon';
import { NotVerifiedIcon } from 'componentsNewDesign/common/icons/NotVerifiedIcon';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { avatarDiameter } from 'componentsNewDesign/common/imgComponents/AvatarImg/constants';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import React from 'react';
import { ImgProperties } from 'types/data';
import { Sizes } from 'types/styles';

interface Props
    extends ImgProperties,
        Sizes,
        Pick<YEAY.AdminGetUserCommon, 'isTrusted' | 'isDisabled' | 'isAccountVerified'> {}

export const AvatarImg = ({ src, isTrusted, isAccountVerified, isDisabled, height, width }: Props) => (
    <RelativeWrapper height={height || ''} width={width || ''}>
        <PosterLayout
            borderRadius="16px"
            defaultPoster={defaultAvatarImg}
            height={height || avatarDiameter}
            src={src}
            width={width || avatarDiameter}
        />
        <AbsoluteWrapper bottom="0" right="0" /*right={isTrusted && isDisabled ? '10px' : '0'}*/>
            <Row noWrap>
                {isTrusted && <TrustedIcon />}

                {!isAccountVerified && isAccountVerified !== undefined && (
                    <MarginWrapper marginLeft="8px">
                        <NotVerifiedIcon />
                    </MarginWrapper>
                )}
                {isDisabled && (
                    <MarginWrapper marginLeft="8px">
                        <BannedIcon />
                    </MarginWrapper>
                )}
            </Row>
        </AbsoluteWrapper>
    </RelativeWrapper>
);
