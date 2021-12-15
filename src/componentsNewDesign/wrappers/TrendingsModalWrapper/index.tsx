import { useMediaQuery } from '@material-ui/core';
import closeIcon from 'assets/close.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import {
    closeIconDiameter,
    modalHorizontalPadding,
    modalVerticalPadding
} from 'componentsNewDesign/wrappers/TrendingsModalWrapper/constant';
import { xs } from 'constants/styles/sizes';
import { useNonScrolledBackground } from 'hooks/nonScrolledBackground';
import React, { FC } from 'react';
import { Overflow, Sizes, Visibility } from 'types/styles';
import { noop } from 'types/types';
import { ModalBackground, ModalContentWrapper } from './styles';

interface OnClose {
    onClose: noop;
}

// TODO: may be partial<OnClose> is better
interface Props extends Visibility, Sizes, OnClose, Overflow {
    expanded?: boolean;
    customHeader?: JSX.Element;
    background?: string;
}

export const ModalCloseButton = ({ onClose }: OnClose) => (
    <CustomImg
        pointer
        height={closeIconDiameter}
        src={closeIcon}
        width={closeIconDiameter}
        onClick={e => {
            e.stopPropagation();
            onClose();
        }}
    />
);

export const TrendingsModalWrapper: FC<Props> = ({
    overflow,
    children,
    visible,
    customHeader,
    onClose,
    width,
    height,
    expanded = false,
    background
}) => {
    useNonScrolledBackground(visible, expanded);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    if (!visible) return null;

    return (
        <>
            <ModalBackground onClick={onClose} />

            <ModalContentWrapper
                background={background}
                height={height}
                overflow={overflow}
                padding={
                    isMobile
                        ? '22px 9px 0'
                        : `${modalVerticalPadding} ${modalHorizontalPadding} 0 ${modalHorizontalPadding}`
                }
                width={width}
            >
                {customHeader || (
                    <AbsoluteWrapper
                        right={isMobile ? '12px' : modalHorizontalPadding}
                        top={isMobile ? '22px' : modalVerticalPadding}
                        zIndex="100"
                    >
                        <ModalCloseButton onClose={onClose} />
                    </AbsoluteWrapper>
                )}
                {children}
            </ModalContentWrapper>
        </>
    );
};
