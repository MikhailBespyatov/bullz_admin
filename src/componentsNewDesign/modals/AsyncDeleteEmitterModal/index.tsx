import { ModalButton } from 'componentsNewDesign/common/buttons/ModalButton';
import { ContentText } from 'componentsNewDesign/modals/AsyncModal/styles';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { errorColor, grey27 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React from 'react';
import { emittersEffects, emittersStores } from 'stores/emitters/emitters';
import { deleteEmitterModal } from 'stores/initialize/initialize.modal.store';

export const AsyncDeleteEmitterModal = () => {
    const [visible, data] = useStore(deleteEmitterModal.modal);

    const loading = useStore(emittersStores.deleteLoading);

    const okHandler = () => emittersEffects.deleteEmitter(data.emitterId);
    const onCancel = () => deleteEmitterModal.closeModal();

    return (
        <ModalWrapper height="230px" visible={visible} width="580px" onClose={onCancel}>
            <Column alignCenter width="100%">
                <Row marginBottom="38px">
                    <ContentText>Are you sure you want to delete {data.emitterId}? </ContentText>
                </Row>
                <Row marginBottom="0">
                    <Column marginRight="8px">
                        <ModalButton background={grey27} onClick={okHandler}>
                            {loading ? 'Loading...' : 'Ok'}
                        </ModalButton>
                    </Column>
                    <ModalButton background={errorColor} onClick={onCancel}>
                        Cancel
                    </ModalButton>
                </Row>
            </Column>
        </ModalWrapper>
    );
};
