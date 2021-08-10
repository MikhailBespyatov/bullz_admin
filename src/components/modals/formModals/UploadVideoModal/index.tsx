import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, message, Modal, Select, Upload } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SelectValue } from 'antd/lib/select';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { Title } from 'components/common/typography/titles/Title';
import { Section } from 'components/grid/Section';
import { getBase64 } from 'components/modals/formModals/UploadVideoModal/constants';
import { Tooltip } from 'components/modals/Tooltip';
import { asyncError } from 'constants/notifications';
import { errorColor } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Title as ITitle } from 'types/data';
import { RemoveMarginRightBottom } from 'types/styles';

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload video</div>
    </div>
);

interface Props extends ITitle, RemoveMarginRightBottom {}

export const UploadVideoModal = ({ title, removeMarginBottom, removeMarginRight }: Props) => {
    const loading = useStore(modalStores.loading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const [data, setData] = useState<YEAY.CreateVideoRequest>({});
    const [error, setError] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // TODO: [any]
    const [fileList, setFileList] = useState<any>([]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value
        });
    const onSelect = (value: SelectValue) => setData({ ...data, hashTags: value as string[] });

    const onCancel = () => {
        close();
        cancel();
        setData({});
    };
    // @ts-ignore
    const handleChange = ({ fileList }) => setFileList(fileList);
    const handleCancel = () => setPreviewVisible(false);

    // TODO: [any]
    const handlePreview = async (file: any) => {
        try {
            if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);

            setPreviewImage(file.url || file.preview);
            setPreviewVisible(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        } catch {
            message.error(asyncError);
        }
    };
    const onConfirmedChange = (e: CheckboxChangeEvent) => (e.target.checked ? confirm() : cancel());
    const onFinish = async () => {
        const formData = new FormData();

        if (fileList.length) {
            formData.append('file', fileList[0].originFileObj);
            try {
                await modalEffects.uploadNewVideo({
                    formData: formData,
                    data
                });
                onCancel();
            } catch {}
        }
    };

    useEffect(
        () =>
            !data?.brand
                ? setError('Brand is Required')
                : !data?.product
                ? setError('Product is Required')
                : setError(''),
        [data]
    );

    return (
        <>
            {title ? (
                <Button removeMarginBottom={removeMarginBottom} removeMarginRight={removeMarginRight} onClick={open}>
                    <UploadOutlined />
                    {title}
                </Button>
            ) : (
                <Tooltip title="Upload video">
                    <UploadOutlined
                        //style={{ color: primaryColor, fontSize: featureIconSize, cursor: 'pointer' }}
                        onClick={open}
                    />
                </Tooltip>
            )}
            <Modal footer={[]} title="Upload new video" visible={visible} onCancel={onCancel}>
                <Section removeMarginRight>
                    <Title color={errorColor}>{error}</Title>
                </Section>
                <Section removeMarginRight>
                    <Input name="brand" placeholder="Brand" onChange={onChange} />
                </Section>
                <Section removeMarginRight>
                    <Input name="product" placeholder="Product" onChange={onChange} />
                </Section>
                <Section removeMarginRight>
                    <Select mode="tags" placeholder="hashtags..." style={{ width: '100%' }} onChange={onSelect} />
                </Section>
                <Upload
                    beforeUpload={() => false}
                    fileList={fileList}
                    listType="picture-card"
                    onChange={handleChange}
                    onPreview={handlePreview}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal footer={null} title={previewTitle} visible={previewVisible} onCancel={handleCancel}>
                    <img alt="example" src={previewImage} style={{ width: '100%' }} />
                </Modal>
                <Section>
                    <ModalCheckbox
                        checked={isConfirmed}
                        title="Are you sure you want to upload this video ?"
                        onChange={onConfirmedChange}
                    />
                </Section>
                <Button disabled={loading || !isConfirmed || !fileList.length || !!error} onClick={onFinish}>
                    {loading ? <Loader size="small" /> : 'Upload'}
                </Button>
            </Modal>
        </>
    );
};
