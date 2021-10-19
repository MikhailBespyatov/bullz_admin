import { EditOutlined } from '@ant-design/icons';
import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { Section } from 'components/grid/Section';
import { Tooltip } from 'components/modals/Tooltip';
import { noop } from 'constants/functions';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React, { useEffect } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Title as ITitle } from 'types/data';
import { ProductCardEditableFields } from 'types/form';
import { RemoveMarginRightBottom } from 'types/styles';

interface Props extends ITitle, BULLZ.GetTeamResponse, RemoveMarginRightBottom {
    id: string;
    onChange?: (fields: ProductCardEditableFields) => void;
}

export const TeamEditorModal = ({
    id,
    onChange = noop,
    title,
    name,
    urlName,
    removeMarginRight,
    removeMarginBottom
}: Props) => {
    const [form] = Form.useForm();
    const loading = useStore(modalStores.loading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const onCancel = () => {
        close();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: BULLZ.PutManagedProductRequest) => {
        try {
            modalEffects.editTeamInfo({ onChange: onChange, ...values, id: id });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    useEffect(() => {
        visible && form.setFieldsValue({ name, urlName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
        <>
            {title ? (
                <Button removeMarginBottom={removeMarginBottom} removeMarginRight={removeMarginRight} onClick={open}>
                    {title}
                </Button>
            ) : (
                <Tooltip title="Edit info">
                    <EditOutlined onClick={open} />
                </Tooltip>
            )}

            <Modal footer={[]} title="Edit team info" visible={visible} onCancel={onCancel}>
                <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <FormInput label="Name" name="name" rules={[{ required: true }]} />
                    <FormInput label="URL Name" name="urlName" rules={[{ required: false }]} />
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to apply this info ?"
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
