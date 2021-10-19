import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { AdaptiveTooltipButton } from 'components/common/buttons/AdaptiveTooltipButton';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { DefaultAffiliateLinkEditableChange } from 'components/common/tables/AffiliateLinksTable/types';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { Section } from 'components/grid/Section';
import {
    initialValues,
    localeDefaultValue
} from 'componentsNewDesign/modals/formModals/products/ChangeAffiliateLinkModal/constants';
import { noop } from 'constants/functions';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, Title as ITitle } from 'types/data';

//const { Option } = Select;

interface Props extends ITitle, Id, DefaultAffiliateLinkEditableChange {
    url: string;
}

export const ChangeDefaultAffiliateLinkModal = ({
    id,
    title = 'change default affiliate link',
    subtitle = 'change default affiliate link for product',
    url,
    onChange = noop
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
    const onFinish = async (values: BULLZ.CreateManagedProductAffiliateLinkRequest) => {
        try {
            await modalEffects.changeDefaultAffiliateLink({
                ...values,
                locale: localeDefaultValue,
                productId: id,
                onChange
            });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <>
            <AdaptiveTooltipButton onClick={open}>{title}</AdaptiveTooltipButton>
            <Modal footer={[]} title={subtitle} visible={visible} onCancel={onCancel}>
                <Form
                    form={form}
                    initialValues={{ ...initialValues, url: url }}
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {/* <Form.Item label="Select a locale" name="locale" rules={[{ required: true }]}>
                        <Select disabled style={{ width: 120 }}>
                            {localeValues?.map((item, i) => (
                                <Option key={i.toString()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item> */}
                    <FormInput label="Url" name="url" rules={[{ required: true }]} />
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to apply this url ?"
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
