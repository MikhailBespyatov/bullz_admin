import { Upload } from 'antd';
import { UploadImageButton } from 'componentsNewDesign/common/buttons/UploadImageButton';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import { getBase64 } from 'componentsNewDesign/modals/popovers/marketingTools/UploadPromotionImgPopover/constants';
import { UploadWrapper } from 'componentsNewDesign/modals/popovers/marketingTools/UploadPromotionImgPopover/styles';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { asyncError } from 'constants/notifications';
import { filterMargin } from 'constants/styles/sizes';
import { useField } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { FC, useState } from 'react';
import { message } from 'stores/alerts';
import { promotionForm } from 'stores/forms/promotionForm';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { promotionsEffects } from 'stores/promotions/promotions';
import { Id, PopoverType } from 'types/data';
import { Disabled, ProductCardEditableFields } from 'types/form';

const { createPromotion } = promotionsEffects;

export interface PopoverProps extends Disabled, PopoverType, Id {}

export const UploadPromotionImgPopover: FC<PopoverProps> = ({ id, ...rest }) => {
    const { value: ageRanges } = useField(promotionForm.fields.ageRanges);
    const { value: userGenders } = useField(promotionForm.fields.userGenders);
    const { value: pageRoute } = useField(promotionForm.fields.pageRoute);
    const { value: targetRegions } = useField(promotionForm.fields.targetRegions);
    const { set: setImageUrl } = useField(promotionForm.fields.imageUrl);

    const loading = useStore(modalStores.loading);
    const [previewImage, setPreviewImage] = useState('');
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

    // TODO: [any]
    const handlePreview = async (file: any) => {
        try {
            if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);

            setPreviewImage(file.url || file.preview);
        } catch {
            message.error(asyncError);
        }
    };

    const onImageUrlChange = (fields: Pick<ProductCardEditableFields, 'imageUrl'>) =>
        fields.imageUrl && setImageUrl(fields.imageUrl);

    const onApply = async () => {
        const formData = new FormData();
        let promotionId: BULLZ.CreatePromotionResponse | undefined = undefined;

        if (!id) {
            promotionId = await createPromotion({
                userAgeRanges: ageRanges, //! no in design
                userGenders, //! no in design
                location: targetRegions.length ? targetRegions.map(item => item.countryCode || '') : [],
                pageLocation: pageRoute
                //name: promotionName, //! There is no promotionName in create request
                //isActive: isPromotionActive, //! There is no status in create request
                //startDate: startDate, //! There is no promotion duration in create request
                //endDate: endDate
            });
        }

        if (fileList.length) {
            formData.append('file', fileList[0].originFileObj);
            try {
                await modalEffects.uploadPromotionImg({
                    onChange: onImageUrlChange,
                    formData: formData,
                    url: fileList[0].thumbUrl,
                    id: promotionId?.id ? promotionId.id : id
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
                </Column>
            }
            title="Upload img"
            onApply={onApply}
            {...rest}
        />
    );
};
