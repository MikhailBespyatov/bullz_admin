import { uploadImgBtnHeight } from 'componentsNewDesign/common/buttons/UploadImageButton/constants';
import { grey27 } from 'constants/styles/colors';
import styled from 'styled-components';

export const UploadWrapper = styled.div`
    opacity: 0;
    width: 100%;
    .ant-upload.ant-upload-select-picture-card {
        width: 100%;
        height: ${uploadImgBtnHeight};
        background-color: ${grey27};
    }
`;
