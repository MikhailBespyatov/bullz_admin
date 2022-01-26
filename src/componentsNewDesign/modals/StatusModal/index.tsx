import { useMediaQuery } from '@material-ui/core';
import closeIcon from 'assets/close.svg';
import inProcessBackground from 'assets/process_modal_bg.png';
import successBackground from 'assets/success_modal_bg.png';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import {
    ContentText,
    ModalContentWrapper,
    StyledButton,
    TitleText
} from 'componentsNewDesign/modals/StatusModal/styles';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { closeIconDiameter } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { ModalBackground } from 'componentsNewDesign/wrappers/ModalWrapper/styles';
import { xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { modalEvents, modalStores } from 'stores/modals/asyncModal';

export const StatusModal = () => {
    const { visible, status, title, content, buttonText, onClick, onCloseClick } = useStore(modalStores.statusModal);
    const backgroundImage = status === 'inProcess' ? inProcessBackground : successBackground;
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const onClose = () => {
        modalEvents.closeStatusModal();
        if (onCloseClick) onCloseClick();
    };

    if (!visible) return null;

    return (
        <>
            <ModalBackground onClick={onClose} />
            <ModalContentWrapper>
                <AbsoluteWrapper right="15px" top="15px">
                    <CustomImg
                        pointer
                        height={closeIconDiameter}
                        src={closeIcon}
                        width={closeIconDiameter}
                        onClick={onClose}
                    />
                </AbsoluteWrapper>

                <CustomImg height={isMobile ? '110px' : '150px'} src={backgroundImage} width="auto" />

                <TitleText>{title}</TitleText>

                <ContentText>{content}</ContentText>

                {!!buttonText && <StyledButton onClick={onClick}>{buttonText}</StyledButton>}
            </ModalContentWrapper>
        </>
    );
};
