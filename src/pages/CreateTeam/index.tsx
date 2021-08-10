import { message } from 'antd';
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
import { formName, title, titleFrom } from './constants';
import React from 'react';
import { teamsEffects, teamsStores } from 'stores/team';
import { Form } from 'components/formComponents/Form';

export const CreateTeam = () => {
    const loading = useStore(teamsStores.loading);
    const error = useStore(teamsStores.creationError);

    const onFinish = (values: YEAY.CreateProductRequest) => teamsEffects.createItem(values);

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
                <FormCard title={titleFrom}>
                    <Form
                        initialValues={{ remember: true }}
                        name={formName}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <FormInput label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]} />
                        <FormInput label="URL Name" name="urlName" rules={[{ required: false }]} />
                        <FormButton disabled={loading}>{loading ? <Loader size="small" /> : 'Create team'}</FormButton>
                    </Form>
                </FormCard>
            </Section>
        </MainLayout>
    );
};
