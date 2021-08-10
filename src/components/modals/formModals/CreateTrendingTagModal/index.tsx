import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { Section } from 'components/grid/Section';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import React from 'react';
import { createTagTrendingModal } from 'stores/initialize/initialize.modal.store';
import { trendingsEffects, trendingsStores } from 'stores/trendings';

interface FormProps {
    text: string;
}

export const CreateTrendingTagModal = () => {
    const { visible } = useStore(createTagTrendingModal.modal);
    const loading = useStore(trendingsStores.createLoading);
    const { confirm, cancel, isConfirmed } = useConfirm();

    const onCancel = () => {
        createTagTrendingModal.closeModal();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async ({ text }: FormProps) => {
        trendingsEffects.createItem({ text });
        cancel();
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <>
            <Modal footer={[]} title="Create trending tag" visible={visible} onCancel={onCancel}>
                <Form
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormInput label="Hashtag" name="text" rules={[{ required: true }]} />

                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to create this tag?"
                            onChange={onConfirmedChange}
                        />
                    </Section>
                    <FormButton disabled={loading || !isConfirmed}>
                        {loading ? <Loader size="small" /> : 'Apply'}
                    </FormButton>
                </Form>
            </Modal>
        </>
    );
};
