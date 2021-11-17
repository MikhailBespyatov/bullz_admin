import { ModalButton } from 'componentsNewDesign/common/buttons/ModalButton';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { black } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { useNonScrolledBackground } from 'hooks/nonScrolledBackground';
import React from 'react';
import { informationalModal } from 'stores/initialize/initialize.modal.store';

const { modal, closeModal } = informationalModal;

export const InformationalModal = () => {
    const [visible, { infoText }] = useStore(modal);

    const onOkClick = () => {
        closeModal();
    };

    useNonScrolledBackground(visible);

    return (
        <ModalWrapper height="fit-content" visible={visible} width="fit-content" onClose={onOkClick}>
            <Column alignCenter width="100%">
                <Row justifyCenter margin="30px 20px" maxWidth="400px">
                    <Span alignCenter font-size="14px" fontWeight="500" lineHeight="18px">
                        {infoText}
                    </Span>
                </Row>

                <ModalButton background={black} onClick={onOkClick}>
                    OK
                </ModalButton>
            </Column>
        </ModalWrapper>
    );
};
