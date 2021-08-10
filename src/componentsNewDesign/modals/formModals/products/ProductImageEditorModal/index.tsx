import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { ModalCheckbox } from 'components/common/inputs/ModalCheckbox';
import { Section } from 'components/grid/Section';
import { Tooltip } from 'components/modals/Tooltip';
import { getBase64 } from 'componentsNewDesign/modals/formModals/products/ProductImageEditorModal/constants';
import { noop } from 'constants/functions';
import { asyncError } from 'constants/notifications';
import { useStore } from 'effector-react';
import { useConfirm } from 'hooks/confirm';
import { useModal } from 'hooks/modal';
import React, { useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, Title } from 'types/data';
import { ProductCardEditableFields } from 'types/form';
import { RemoveMarginRightBottom } from 'types/styles';

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

interface Props extends Id, Title, RemoveMarginRightBottom {
    onChange?: (fields: ProductCardEditableFields) => void;
}

export const ProductImageEditorModal = ({
    id,
    onChange = noop,
    title,
    removeMarginRight,
    removeMarginBottom
}: Props) => {
    const loading = useStore(modalStores.loading);
    const { isConfirmed, confirm, cancel } = useConfirm();
    const { visible, open, close } = useModal();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // TODO: [any]
    const [fileList, setFileList] = useState<any>([]);

    const onCancel = () => {
        close();
        cancel();
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
                await modalEffects.uploadProductImg({
                    onChange,
                    formData: formData,
                    url: fileList[0].thumbUrl,
                    id
                });
                close();
                cancel();
            } catch {}
        }
    };

    return (
        <>
            {title ? (
                <Button removeMarginBottom={removeMarginBottom} removeMarginRight={removeMarginRight} onClick={open}>
                    {title}
                </Button>
            ) : (
                <Tooltip title="Upload image">
                    <UploadOutlined
                        // style={{ color: primaryColor, fontSize: featureIconSize, cursor: 'pointer' }}
                        onClick={open}
                    />
                </Tooltip>
            )}
            <Modal footer={[]} title="Upload new image" visible={visible} onCancel={onCancel}>
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
                        title="Are you sure you want to upload this image ?"
                        onChange={onConfirmedChange}
                    />
                </Section>
                <Button disabled={loading || !isConfirmed || !fileList.length} onClick={onFinish}>
                    {loading ? <Loader size="small" /> : 'Upload'}
                </Button>
            </Modal>
        </>
    );
};
