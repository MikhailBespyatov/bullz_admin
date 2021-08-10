import { Loader } from 'components/common/dynamic/Loader';
import { H1 } from 'components/common/typography/titles/H';
import { Form } from 'components/formComponents/Form';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import {
    buttonText,
    formName,
    nameMessage,
    passwordLabel,
    passwordMessage,
    passwordName,
    title
} from 'pages/Auth/constants';
import React, { FC } from 'react';
import { message } from 'stores/alerts';
import { userEffects, userStores } from 'stores/users/user';
import { AuthValuesType } from 'types/types';

export const Login: FC = () => {
    const loading = useStore(userStores.loading);

    const onFinish = (values: AuthValuesType) => userEffects.loadToken(values);

    const onFinishFailed = () => message.error(errorEmptyMessage);

    return (
        <AuthLayout>
            <H1>{title}</H1>
            <Form
                initialValues={{ remember: true }}
                name={formName}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormInput rules={[{ required: true, message: nameMessage }]} />
                <FormInput
                    label={passwordLabel}
                    name={passwordName}
                    rules={[{ required: true, message: passwordMessage }]}
                />
                <FormButton disabled={loading && true}>{loading ? <Loader size="small" /> : buttonText}</FormButton>
            </Form>
        </AuthLayout>
    );
};
