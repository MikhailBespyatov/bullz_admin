import { Modal } from 'antd';
import { Title } from 'components/common/typography/titles/Title';
import { useStore } from 'effector-react';
import React from 'react';
import { removeTrendingModal } from 'stores/initialize/initialize.modal.store';
import { trendingsEffects, trendingsStores } from 'stores/trendings';

export const AsyncDeleteTrendingModal = () => {
    const [visible, data] = useStore(removeTrendingModal.modal);
    const loading = useStore(trendingsStores.removeLoading);

    const okHandler = () => trendingsEffects.removeItem(data);
    const onCancel = () => removeTrendingModal.closeModal();

    return (
        <Modal
            confirmLoading={loading}
            title="Removing trending"
            visible={visible}
            onCancel={onCancel}
            onOk={okHandler}
        >
            Are you sure you want to remove{' '}
            {data?.subject !== 'video' ? <>a {data?.subject} </> : <>this video from position </>}
            <Title>{data?.subjectName}</Title>
            in trendings?
        </Modal>
    );
};
