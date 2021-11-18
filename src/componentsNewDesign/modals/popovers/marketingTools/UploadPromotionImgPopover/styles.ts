import styled from 'styled-components';
import { uploadImgBtnHeight } from 'componentsNewDesign/common/buttons/UploadImageButton/constants';

export const UploadWrapper = styled.div`
    opacity: 0;
    width: 100%;
    .ant-upload.ant-upload-select-picture-card {
        width: 100%;
        height: ${uploadImgBtnHeight};
    }
`;
