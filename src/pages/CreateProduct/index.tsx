import { Form as AntForm, message } from 'antd';
import { Loader } from 'components/common/dynamic/Loader';
import { H1 } from 'components/common/typography/titles/H';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { FormTagsSelect } from 'components/formComponents/FormTagsSelect';
import { ErrorFormTitle } from 'components/formComponents/FormTitle';
import { Section } from 'components/grid/Section';
import { FormCard } from 'components/layouts/cards/FormCard';
import { MainLayout } from 'components/layouts/MainLayout';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { formName, title } from 'pages/CreateProduct/constants';
import React from 'react';
import { productsEffects, productsStores } from 'stores/products/products';

export const CreateProduct = () => {
    const loading = useStore(productsStores.loading);
    const error = useStore(productsStores.creationError);

    const onFinish = (values: BULLZ.CreateTopicRequest) => productsEffects.createItem(values);

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
                <FormCard title="Creation of new topic">
                    <AntForm
                        initialValues={{ remember: true }}
                        name={formName}
                        //validateMessages={validateMessages}
                        // @ts-ignore
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        {/* <FormInput label="UPC" name="upc" rules={[{ required: true, message: 'UPC is required' }]} /> */}
                        <FormInput label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]} />
                        {/* <FormInput
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Title is required' }]}
                        /> */}
                        {/*<FormInput*/}
                        {/*    label="Description"*/}
                        {/*    name="description"*/}
                        {/*    rules={[{ required: true, message: 'Description is required' }]}*/}
                        {/*/>*/}
                        {/* <FormInput
                            label="Brand"
                            name="brand"
                            rules={[{ required: true, message: 'Brand is required' }]}
                        />
                        <FormInput
                            label="Color"
                            name="color"
                            rules={[{ required: true, message: 'Color is required' }]}
                        />
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
                            label="tags"
                            name="tags"
                            placeholder="hashtags..."
                            rules={[{ required: false, message: 'Input hashtags' }]}
                        />
                        {/* <FormTagsSelect
                            label="Categories"
                            name="category"
                            placeholder="categories..."
                            rules={[{ required: false, message: 'Input categories' }]}
                        /> */}
                        <FormButton disabled={loading}>{loading ? <Loader size="small" /> : 'Create topic'}</FormButton>
                    </AntForm>
                </FormCard>
            </Section>
        </MainLayout>
    );
};
