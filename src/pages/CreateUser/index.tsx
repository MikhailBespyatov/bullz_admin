import { message } from 'antd';
import Form from 'antd/lib/form/Form';
import { Loader } from 'components/common/dynamic/Loader';
import { H1 } from 'components/common/typography/titles/H';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { ErrorFormTitle } from 'components/formComponents/FormTitle';
import { Section } from 'components/grid/Section';
import { FormCard } from 'components/layouts/cards/FormCard';
import { MainLayout } from 'components/layouts/MainLayout';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import {
    emailLabel,
    emailMessage,
    emailName,
    formName,
    loginLabel,
    loginName,
    nameMessage,
    passwordLabel,
    passwordMessage,
    passwordName,
    title,
    validateMessages
} from 'pages/CreateUser/constants';
import React from 'react';
import { userEffects, userStores } from 'stores/users/user';
import { RegisterValuesType } from 'types/types';

export const CreateUser = () => {
    const loading = useStore(userStores.loading);
    const error = useStore(userStores.registerError);

    const onFinish = (values: RegisterValuesType) => userEffects.createUser(values);

    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <MainLayout>
            <Section justifyCenter>
                <H1>{title}</H1>
            </Section>
            <Section>
                <ErrorFormTitle>{error}</ErrorFormTitle>
            </Section>
            <Section>
                <FormCard title="Creation of new user">
                    <Form
                        initialValues={{ remember: true }}
                        name={formName}
                        validateMessages={validateMessages}
                        // @ts-ignore
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <FormInput
                            label={loginLabel}
                            name={loginName}
                            rules={[{ required: true, message: nameMessage }]}
                        />
                        <FormInput
                            label={emailLabel}
                            name={emailName}
                            rules={[{ required: true, message: emailMessage }, { type: 'email' }]}
                        />
                        <FormInput
                            label={passwordLabel}
                            name={passwordName}
                            rules={[{ required: true, message: passwordMessage }]}
                        />
                        <FormButton disabled={loading}>{loading ? <Loader size="small" /> : 'Create user'}</FormButton>
                    </Form>
                </FormCard>
            </Section>
        </MainLayout>
    );
};
