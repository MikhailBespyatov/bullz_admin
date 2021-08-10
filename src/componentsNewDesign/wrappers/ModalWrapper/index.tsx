import closeIcon from 'assets/close.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import {
    closeIconDiameter,
    modalHorizontalPadding,
    modalVerticalPadding
} from 'componentsNewDesign/wrappers/ModalWrapper/constant';
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

export const ModalWrapper: FC<Props> = ({
    overflow,
    children,
    visible,
    customHeader,
    onClose,
    width,
    height,
    expanded = false
}) => {
    // console.log('expanded', expanded);
    useNonScrolledBackground(visible, expanded);

    if (!visible) return null;

    return (
        <ModalBackground>
            <ModalContentWrapper
                height={height}
                overflow={overflow}
                padding={modalVerticalPadding + ' ' + modalHorizontalPadding}
                width={width}
            >
                {customHeader || (
                    <AbsoluteWrapper right={modalHorizontalPadding} top={modalVerticalPadding} zIndex="100">
                        <ModalCloseButton onClose={onClose} />
                    </AbsoluteWrapper>
                )}
                {children}
            </ModalContentWrapper>
        </ModalBackground>
    );
};
