import { Form as AntForm, message } from 'antd';
import { Loader } from 'components/common/dynamic/Loader';
import { H1 } from 'components/common/typography/titles/H';
import { FormButton } from 'components/formComponents/FormButton';
import { FormTagsSelect } from 'components/formComponents/FormTagsSelect';
import { Section } from 'components/grid/Section';
import { FormCard } from 'components/layouts/cards/FormCard';
import { MainLayout } from 'components/layouts/MainLayout';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { formName } from 'pages/CreateProduct/constants';
import { contentDeleteUserAsyncModal, titleDeleteUserAsyncModal } from 'pages/DeleteUser/constants';
import React from 'react';
import { modalEvents } from 'stores/modals/asyncModal';
import { usersEffects, usersStores } from 'stores/users/users';
import { SubjectType } from 'types/types';

export const DeleteUser = () => {
    const loading = useStore(usersStores.editLoading);

    const deleteOkHandler = async (subject: SubjectType) => {
        if (typeof subject === 'string' || typeof subject === 'boolean') return;

        usersEffects.deleteUsersById({ userIds: subject });
        modalEvents.closeAsyncModal();
    };

    const onFinish = ({ userIds }: BULLZ.AdminDeleteUsersRequest) => {
        if (userIds) {
            modalEvents.openAsyncModal({
                visible: true,
                title: titleDeleteUserAsyncModal,
                content: contentDeleteUserAsyncModal,
                subject: userIds,
                onOk: deleteOkHandler,
                modalHeight: '310px'
            });
        }
    };

    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <MainLayout>
            <Section justifyCenter>
                <H1>Delete users page</H1>
            </Section>
            <Section>
                <FormCard title="Delete users by id" width="900px">
                    <AntForm
                        initialValues={{ remember: true }}
                        name={formName}
                        // @ts-ignore
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <FormTagsSelect
                            label="User Ids"
                            name="userIds"
                            placeholder="User Ids"
                            rules={[{ required: false, message: 'Input User Ids' }]}
                        />
                        <FormButton disabled={loading}>{loading ? <Loader size="small" /> : 'Delete users'}</FormButton>
                    </AntForm>
                </FormCard>
            </Section>
        </MainLayout>
    );
};
