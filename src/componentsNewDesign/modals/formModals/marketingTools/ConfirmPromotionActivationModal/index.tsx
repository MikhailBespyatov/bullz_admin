import { ModalButton } from 'componentsNewDesign/common/buttons/ModalButton';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { black, errorColor } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React from 'react';
import { confirmPromotionActivationModal } from 'stores/initialize/initialize.modal.store';
import { getModalContent } from './constants';

export const ConfirmPromotionActivationModal = () => {
    const [visible, { /*promotionName,*/ promotionId, onOk }] = useStore(confirmPromotionActivationModal.modal);
    const modalContent = promotionId && getModalContent(promotionId);

    const onClose = () => confirmPromotionActivationModal.closeModal();

    const okApplyClick = async () => {
        onOk();
        onClose();
    };

    return (
        <ModalWrapper height="fit-content" visible={visible} width="580px" onClose={onClose}>
            <Column alignCenter width="100%">
                <Row marginBottom="20px" marginTop="30px" width="400px">
                    <Span alignCenter font-size="14px" fontWeight="500" lineHeight="18px">
                        {modalContent}
                    </Span>
                </Row>

                <Row>
                    <Column marginRight="16px">
                        <ModalButton background={black} onClick={okApplyClick}>
                            OK
                        </ModalButton>
                    </Column>

                    <ModalButton background={errorColor} onClick={onClose}>
                        Cancel
                    </ModalButton>
                </Row>
            </Column>
        </ModalWrapper>
    );
};
