import { Form, message, Modal, Radio, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { Title } from 'components/common/typography/titles/Title';
import { FormButton } from 'components/formComponents/FormButton';
import { FeatureCell } from 'components/grid/Card';
import { Section } from 'components/grid/Section';
import { VideoCurateEditableChange } from 'components/layouts/cards/videos/VideoCard/types';
import { formItemLayout, reasonRadioArray } from 'components/modals/formModals/VideoCurateModal/constants';
import { noop } from 'constants/functions';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React, { useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, Title as ITitle } from 'types/data';
import { Disabled } from 'types/form';

interface Props extends Id, VideoCurateEditableChange, ITitle, Disabled {}

export const VideoCurateModal = ({ id, onChange = noop, title, disabled }: Props) => {
    const [form] = Form.useForm();
    const loading = useStore(modalStores.loading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const [accepted, setAccepted] = useState(true);

    const onCancel = () => {
        close();
        cancel();
    };
    const onAcceptedChange = (e: RadioChangeEvent) => {
        const value = e.target.value as boolean;
        form.setFieldsValue({
            reason: value ? 0 : 1
        });
        setAccepted(value);
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: BULLZ.SubmitVideoCurationRequest) => {
        try {
            await modalEffects.curateVideo({ onChange: onChange, ...values, videoId: id });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <>
            {title ? (
                <Button disabled={disabled} onClick={open}>
                    {title}
                </Button>
            ) : (
                <FeatureCell disabled={disabled} onClick={open}>
                    Curate
                </FeatureCell>
            )}
            <Modal footer={[]} title="Edit curation status" visible={visible} onCancel={onCancel}>
                <Form
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                        reason: 0
                    }}
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Radio.Group value={accepted} onChange={onAcceptedChange}>
                            <Radio value>Accepted</Radio>
                            <Radio value={false}>Declined</Radio>
                        </Radio.Group>
                    </Row>
                    {!accepted && <Title>Reason:</Title>}
                    <Form.Item name="reason">
                        <Radio.Group>
                            {!accepted &&
                                reasonRadioArray.map(i => (
                                    <Radio key={i.value} value={i.value}>
                                        {i.data}
                                    </Radio>
                                ))}
                        </Radio.Group>
                    </Form.Item>
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to apply this curation status ?"
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
