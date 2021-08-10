import { EditOutlined } from '@ant-design/icons';
import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormInput } from 'components/formComponents/FormInput';
import { FormTagsSelect } from 'components/formComponents/FormTagsSelect';
import { Section } from 'components/grid/Section';
import { Tooltip } from 'components/modals/Tooltip';
import { noop } from 'constants/functions';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React, { useEffect } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { productsEffects, productsStores } from 'stores/products/products';
import { Title as ITitle } from 'types/data';
import { ProductCardEditableFields } from 'types/form';
import { RemoveMarginRightBottom } from 'types/styles';

interface Props extends ITitle, YEAY.GetProductResponse, RemoveMarginRightBottom {
    id: string;
    onChange?: (fields: ProductCardEditableFields) => void;
}

export const ProductEditorModal = ({
    id,
    onChange = noop,
    title,
    name,
    hashTags,
    description,
    removeMarginRight,
    removeMarginBottom
}: Props) => {
    const [form] = Form.useForm();
    const loading = useStore(modalStores.loading);
    const productLoading = useStore(productsStores.editLoading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const onCancel = () => {
        close();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: YEAY.PutManagedProductRequest) => {
        try {
            modalEffects.editProductInfo({ onChange: onChange, ...values, id: id });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    useEffect(() => {
        if (visible) {
            productsEffects.loadEditInfoItemById(id);
            form.setFieldsValue({ name, hashTags, description });
        }
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

            <Modal footer={[]} title="Edit product info" visible={visible} onCancel={onCancel}>
                <Form
                    form={form}
                    // initialValues={{ remember: true }}
                    // name="edit"
                    //validateMessages={validateMessages}
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormInput label="Name" name="name" rules={[{ required: false }]} />
                    {/* <FormInput label="Description" name="description" rules={[{ required: false }]} /> */}
                    {/* <FormInput label="Brand" name="brand" rules={[{ required: false }]} />
                        <FormInput label="Color" name="color" rules={[{ required: false }]} /> */}

                    <FormTagsSelect
                        label="Hashtags"
                        name="hashTags"
                        placeholder="hashtags..."
                        rules={[{ required: false, message: 'Input hashtags' }]}
                    />

                    {/* <Button onClick={copyHashtagsHandler}>Copy product hashtags</Button> */}

                    {/* <FormInput label="Brand Image Url" name="brandImageUrl" rules={[{ required: false }]} />
                        <FormInput label="Primary Image Id" name="primaryImageId" rules={[{ required: false }]} /> */}
                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to apply this info ?"
                            onChange={onConfirmedChange}
                        />
                    </Section>
                    <FormButton disabled={loading || productLoading || !isConfirmed}>
                        {loading || productLoading ? <Loader size="small" /> : 'Apply'}
                    </FormButton>
                </Form>
            </Modal>
        </>
    );
};

// {addableFieldsArray.map(({ title, name, fieldName }) => (
//     <Fragment key={name}>
//         <Section>
//             <Title>{title}: </Title>
//         </Section>

//         <Form.List name={name}>
//             {(fields, { add, remove }) => (
//                 <div>
//                     {fields.map(field => (
//                         <Form.Item
//                             //{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
//                             key={field.key}
//                             //label={'Features'}
//                             required={false}
//                         >
//                             <Form.Item
//                                 {...field}
//                                 noStyle
//                                 rules={[
//                                     {
//                                         required: true,
//                                         whitespace: true,
//                                         message:
//                                             'Please input a ' +
//                                             fieldName +
//                                             ' or delete this field.'
//                                     }
//                                 ]}
//                                 validateTrigger={['onChange', 'onBlur']}
//                             >
//                                 <Input
//                                     placeholder={'New ' + fieldName}
//                                     style={{ width: '60%' }}
//                                 />
//                             </Form.Item>
//                             {fields.length > 0 ? (
//                                 <MinusCircleOutlined
//                                     className="dynamic-delete-button"
//                                     style={{ margin: '0 8px' }}
//                                     onClick={() => {
//                                         remove(field.name);
//                                     }}
//                                 />
//                             ) : null}
//                         </Form.Item>
//                     ))}
//                     <Form.Item>
//                         <Button
//                             style={{ width: '60%' }}
//                             type="dashed"
//                             onClick={() => {
//                                 add();
//                             }}
//                         >
//                             <PlusOutlined /> Add {fieldName}
//                         </Button>
//                     </Form.Item>
//                 </div>
//             )}
//         </Form.List>
//     </Fragment>
// ))}
