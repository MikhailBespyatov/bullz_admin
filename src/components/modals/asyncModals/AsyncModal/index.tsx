import { Modal } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { modalEvents, modalStores } from 'stores/modals/asyncModal';

export const AsyncModal = () => {
    const [loading, { visible, subject, title, content, onOk }] = useStore(modalStores.asyncModalStore);

    const okHandler = () => onOk && onOk(subject);
    const onCancel = () => modalEvents.closeAsyncModal();

    return (
        <Modal confirmLoading={loading} title={title} visible={visible} onCancel={onCancel} onOk={okHandler}>
            {content}
        </Modal>
    );
};
