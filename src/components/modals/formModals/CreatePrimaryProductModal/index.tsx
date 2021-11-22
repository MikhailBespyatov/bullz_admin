import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { FormTagsSelect } from 'components/formComponents/FormTagsSelect';
import { Section } from 'components/grid/Section';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, Title as ITitle } from 'types/data';

interface Props extends ITitle, Id {}

export const CreatePrimaryProductModal = ({ id, title }: Props) => {
    const loading = useStore(modalStores.loading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const onCancel = () => {
        close();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: BULLZ.CreateTopicRequest) => {
        try {
            await modalEffects.createProductAndSetAsPrimary({
                ...values,
                videoId: id
            });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <>
            <Button onClick={open}>{title || 'Create topic and set as primary'}</Button>
            <Modal footer={[]} title="Edit topic info" visible={visible} onCancel={onCancel}>
                <Form
                    initialValues={{ remember: true }}
                    name="create"
                    //validateMessages={validateMessages}
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {/* <FormInput label="UPC" name="upc" rules={[{ required: true, message: 'UPC is required' }]} /> */}
                    <FormInput label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]} />
                    {/* <FormInput label="Title" name="title" rules={[{ required: true, message: 'Title is required' }]} />
                    <FormInput
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Description is required' }]}
                    />
                    <FormInput label="Brand" name="brand" rules={[{ required: true, message: 'Brand is required' }]} />
                    <FormInput label="Color" name="color" rules={[{ required: true, message: 'Color is required' }]} />
                    <FormInput
                        label="Brand image url"
                        name="brandImageUrl"
                        rules={[{ required: false, message: 'Input brand image url' }]}
                    />
                    <FormTagsSelect
                        label="Features"
                        name="features"
                        placeholder="features..."
                        rules={[{ required: false, message: 'Input features' }]}
                    /> */}
                    <FormTagsSelect
                        label="Hashtags"
                        name="hashTags"
                        placeholder="hashtags..."
                        rules={[{ required: false, message: 'Input hashtags' }]}
                    />
                    {/* <FormTagsSelect
                        label="Categories"
                        name="category"
                        placeholder="categories..."
                        rules={[{ required: false, message: 'Input categories' }]}
                    /> */}
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to create such topic ?"
                            onChange={onConfirmedChange}
                        />
                    </Section>
                    <FormButton disabled={loading || !isConfirmed}>
                        {loading ? <Loader size="small" /> : 'Create topic'}
                    </FormButton>
                </Form>
            </Modal>
        </>
    );
};
