import { Form, message, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { FormButton } from 'components/formComponents/FormButton';
import { FormTagsSelect } from 'components/formComponents/FormTagsSelect';
import { FeatureCell } from 'components/grid/Card';
import { Section } from 'components/grid/Section';
import { noop } from 'constants/functions';
import { errorEmptyMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React, { useEffect } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { videosEffects, videosStores } from 'stores/videos/videos';
import { ButtonTitle } from 'types/data';
import { Disabled, VideoCardEditableChange } from 'types/form';

interface Props extends VideoCardEditableChange, BULLZ.AdminGetVideoResponse, ButtonTitle, Disabled {}

export const VideoEditorModal = ({ id = '', onChange = noop, buttonTitle, hashTags, disabled }: Props) => {
    const [form] = Form.useForm();
    //const productHashtags = useStore(copiedProductsHashtagsStores.productHashtags);
    const loading = useStore(modalStores.loading);
    const videoLoading = useStore(videosStores.editLoading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const onCancel = () => {
        close();
        cancel();
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async (values: BULLZ.UpdateVideoRequest) => {
        try {
            modalEffects.editVideoInfo({ onChange: onChange, ...values, id: id });
            cancel();
            close();
        } catch {}
    };
    const onFinishFailed = () => message.error(errorEmptyMessage);

    // const insertHashtagsHandler = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    //     e.preventDefault();
    //     form.setFieldsValue({
    //         hashTags: [...form.getFieldValue('hashTags'), ...productHashtags]
    //     });
    //     copiedProductsHashtagsEvents.clearProductHashtags();
    //     message.success('you successfully inserted product hashtags');
    // };

    // const insertPrimaryHashtagsHandler = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    //     e.preventDefault();
    //     const ondValues = form.getFieldValue('hashTags');
    //     const newValues = primaryProductHashtags.filter(i => !ondValues.includes(i));
    //     form.setFieldsValue({
    //         hashTags: [...ondValues, ...newValues]
    //     });
    //     newValues.length > ondValues.length
    //         ? message.success('you successfully inserted primary product hashtags')
    //         : message.info('this video already has all primary product hashtags');
    // };

    useEffect(() => {
        if (visible) {
            videosEffects.loadEditInfoItemById(id);
            form.setFieldsValue({ hashTags });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
        <>
            {buttonTitle ? (
                <Button removeMarginRight disabled={disabled} onClick={open}>
                    {buttonTitle}
                </Button>
            ) : (
                // <FeatureCell style={disabled ? { color: grey } : {}} onClick={disabled ? undefined : open()}>
                <FeatureCell disabled={disabled} onClick={open}>
                    {'Edit'}
                </FeatureCell>
            )}
            <Modal footer={[]} title="Edit video info" visible={visible} onCancel={onCancel}>
                <Form
                    form={form}
                    // @ts-ignore
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {/* <FormInput disabled label="Title" name="title" rules={[{ required: false }]} />
                        <FormInput disabled label="Subtitle" name="subtitle" rules={[{ required: false }]} /> */}

                    <FormTagsSelect
                        label="Hashtags"
                        name="hashTags"
                        placeholder="hashtags..."
                        rules={[{ required: false, message: 'Input hashtags' }]}
                    />

                    {/* <Button disabled={!productHashtags.length} onClick={insertHashtagsHandler}>
                            Insert product hashtags
                        </Button> */}

                    {/* <Button
                            disabled={!primaryProductHashtags.length || loadingPrimaryProduct}
                            onClick={insertPrimaryHashtagsHandler}
                        >
                            {loadingPrimaryProduct ? <Loader size="small" /> : 'Insert primary product hashtags'}
                        </Button> */}

                    <Section>
                        <ModalCheckbox
                            checked={isConfirmed}
                            title="Are you sure you want to apply this info ?"
                            onChange={onConfirmedChange}
                        />
                    </Section>
                    <FormButton disabled={loading || videoLoading || !isConfirmed}>
                        {loading || videoLoading ? <Loader size="small" /> : 'Apply'}
                    </FormButton>
                </Form>
            </Modal>
        </>
    );
};
