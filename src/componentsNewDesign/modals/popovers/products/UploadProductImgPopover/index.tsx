import { Upload } from 'antd';
import { getBase64 } from 'componentsNewDesign/modals/formModals/products/ProductImageEditorModal/constants';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { asyncError } from 'constants/notifications';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC, useState } from 'react';
import { message } from 'stores/alerts';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { productsEvents } from 'stores/products/products';
import { Id, PopoverType } from 'types/data';
import { Disabled, ProductCardEditableFields } from 'types/form';
import { UploadImageButton } from 'componentsNewDesign/common/buttons/UploadImageButton';
import { UploadWrapper } from 'componentsNewDesign/modals/popovers/products/UploadProductImgPopover/styles';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';

export interface PopoverProps extends Disabled, PopoverType, Id {}

export const UploadProductImgPopover: FC<PopoverProps> = ({ id, ...rest }) => {
    const loading = useStore(modalStores.loading);
    // const { visible, open, close } = useModal();

    //const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    // const [previewTitle, setPreviewTitle] = useState('');
    // TODO: [any]
    const [fileList, setFileList] = useState<any>([]);

    // @ts-ignore
    const handleChange = async ({ fileList }) => {
        if (fileList.length) {
            const preview = await getBase64(fileList[0].originFileObj);
            setPreviewImage(preview as string);
        }
        setFileList(fileList);
    };
    // const handleCancel = () => setPreviewVisible(false);

    // TODO: [any]
    const handlePreview = async (file: any) => {
        try {
            if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);

            setPreviewImage(file.url || file.preview);
            //setPreviewVisible(true);
            //setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        } catch {
            message.error(asyncError);
        }
    };
    const onApply = async () => {
        const formData = new FormData();

        if (fileList.length) {
            formData.append('file', fileList[0].originFileObj);
            try {
                await modalEffects.uploadProductImg({
                    onChange: (fields: ProductCardEditableFields) => productsEvents.updateItemById({ id, ...fields }),
                    formData: formData,
                    url: fileList[0].thumbUrl,
                    id
                });
                setFileList([]);
            } catch {}
        }
    };

    return (
        <ApplyPopoverLayout
            isApplyAllowed={!!previewImage}
            loading={loading}
            modalChildren={
                <Column alignCenter justifyCenter width="100%">
                    <Row justifyCenter marginBottom={filterMargin} width="256px">
                        {fileList.length >= 1 ? (
                            <Row>
                                <Upload
                                    beforeUpload={() => false}
                                    fileList={fileList}
                                    listType="picture-card"
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                />
                            </Row>
                        ) : (
                            <RelativeWrapper>
                                <UploadImageButton />
                                <AbsoluteWrapper left="0" top="0" width="100%">
                                    <UploadWrapper>
                                        <Upload
                                            beforeUpload={() => false}
                                            fileList={fileList}
                                            listType="picture-card"
                                            onChange={handleChange}
                                            onPreview={handlePreview}
                                        >
                                            Upload
                                        </Upload>
                                    </UploadWrapper>
                                </AbsoluteWrapper>
                            </RelativeWrapper>
                        )}
                    </Row>
                    {/*<MarginWrapper marginBottom={filterMargin}>*/}
                    {/*    <Upload*/}
                    {/*        beforeUpload={() => false}*/}
                    {/*        fileList={fileList}*/}
                    {/*        listType="picture-card"*/}
                    {/*        onChange={handleChange}*/}
                    {/*        onPreview={handlePreview}*/}
                    {/*    >*/}
                    {/*        {fileList.length >= 1 ? null : uploadButton}*/}
                    {/*    </Upload>*/}
                    {/*</MarginWrapper>*/}
                    {/* {previewImage && <PosterLayout height="90%" src={previewImage} width="90%" />} */}
                </Column>
            }
            title="Upload img"
            onApply={onApply}
            {...rest}
        />
    );
};
