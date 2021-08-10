import { StopOutlined } from '@ant-design/icons';
import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { Section } from 'components/grid/Section';
import { Tooltip } from 'components/modals/Tooltip';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import { useToggle } from 'hooks/toggle';
import React from 'react';
import { modalStores } from 'stores/modals/asyncModal';
import { teamsEffects } from 'stores/team';
import { Title as ITitle } from 'types/data';
import { ProductCardEditableFields } from 'types/form';
import { RemoveMarginRightBottom } from 'types/styles';

const { removeOrBanMember } = teamsEffects;

interface Props extends ITitle, RemoveMarginRightBottom {
    id: string;
    onChange?: (fields: ProductCardEditableFields) => void;
}

export const BlockUserInTeamModal = ({ id, title, removeMarginRight, removeMarginBottom }: Props) => {
    const loading = useStore(modalStores.loading);
    const teamLoading = useStore(removeOrBanMember.pending);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();
    const [isBan, setIsBan] = useToggle(false);

    const onCancel = () => {
        close();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: YEAY.RemoveTeamMemberRequest) => {
        await removeOrBanMember({
            userId: values.userId,
            teamId: id,
            isBanned: isBan
        });
        cancel();
        close();
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <>
            {title ? (
                <Button removeMarginBottom={removeMarginBottom} removeMarginRight={removeMarginRight} onClick={open}>
                    {title}
                </Button>
            ) : (
                <Tooltip title="Remove or Ban user">
                    <StopOutlined onClick={open} />
                </Tooltip>
            )}

            <Modal footer={[]} title="Remove or Ban user by User ID" visible={visible} onCancel={onCancel}>
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <FormInput label="User id" name="userId" rules={[{ required: true }]} />
                    <Section>
                        <ModalCheckbox checked={isBan} title="Ban?" onChange={setIsBan} />
                    </Section>
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title={`Are you sure you want to remove ${isBan ? 'and ban' : ''} this user?`}
                            onChange={onConfirmedChange}
                        />
                    </Section>
                    <FormButton disabled={loading || teamLoading || !isConfirmed}>
                        {loading || teamLoading ? <Loader size="small" /> : isBan ? 'Ban' : 'Remove'}
                    </FormButton>
                </Form>
            </Modal>
        </>
    );
};
