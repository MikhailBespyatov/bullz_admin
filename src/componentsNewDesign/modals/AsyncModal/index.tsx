import { ModalButton } from 'componentsNewDesign/common/buttons/ModalButton';
import { ContentText, TitleText } from 'componentsNewDesign/modals/AsyncModal/styles';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { errorColor, grey27 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React from 'react';
import { modalEvents, modalStores } from 'stores/modals/asyncModal';

export const AsyncModal = () => {
    const [loading, { visible, subject, title, content, onOk, modalHeight }] = useStore(modalStores.asyncModalStore);

    const okHandler = () => onOk && onOk(subject);
    const onClose = () => modalEvents.closeAsyncModal();

    return (
        <ModalWrapper height={modalHeight || '240px'} visible={visible} width="700px" onClose={onClose}>
            <Column alignCenter width="100%">
                <Row marginBottom="20px">
                    <TitleText>{title}</TitleText>
                </Row>
                <Row marginBottom="38px">
                    <ContentText>{content}</ContentText>
                </Row>
                <Row marginBottom="0">
                    <Column marginRight="8px">
                        <ModalButton background={errorColor} disabled={loading} onClick={onClose}>
                            Cancel
                        </ModalButton>
                    </Column>
                    <ModalButton background={grey27} onClick={okHandler}>
                        {loading ? 'Loading...' : 'Ok'}
                    </ModalButton>
                </Row>
            </Column>
        </ModalWrapper>
    );
};
