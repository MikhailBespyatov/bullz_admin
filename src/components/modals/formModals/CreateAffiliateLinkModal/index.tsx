import { BorderInnerOutlined } from '@ant-design/icons';
import { Form, message, Modal, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { Section } from 'components/grid/Section';
import { initialValues, localeValues } from 'components/modals/formModals/CreateAffiliateLinkModal/constants';
import { Tooltip } from 'components/modals/Tooltip';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, Title as ITitle } from 'types/data';
import { RemoveMarginRightBottom } from 'types/styles';

const { Option } = Select;

interface Props extends ITitle, Id, RemoveMarginRightBottom {}

export const CreateAffiliateLinkModal = ({ id, title, removeMarginRight, removeMarginBottom }: Props) => {
    const [form] = Form.useForm();
    const loading = useStore(modalStores.loading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const onCancel = () => {
        close();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: YEAY.CreateManagedProductAffiliateLinkRequest) => {
        try {
            await modalEffects.createAffiliateLink({ ...values, productId: id });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <>
            {title ? (
                <Button removeMarginBottom={removeMarginBottom} removeMarginRight={removeMarginRight} onClick={open}>
                    {title}
                </Button>
            ) : (
                <Tooltip title="Create affiliate link">
                    <BorderInnerOutlined onClick={open} />
                </Tooltip>
            )}
            <Modal footer={[]} title="Create affiliate link for product" visible={visible} onCancel={onCancel}>
                <Form
                    form={form}
                    initialValues={initialValues}
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Select a locale" name="locale" rules={[{ required: true }]}>
                        <Select style={{ width: 120 }}>
                            {localeValues?.map((item, i) => (
                                <Option key={i.toString()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <FormInput label="Url" name="url" rules={[{ required: true }]} />
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to apply this locale ?"
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
