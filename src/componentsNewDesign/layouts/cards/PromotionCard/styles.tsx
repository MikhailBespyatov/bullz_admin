import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ImageContainer = styled.div`
    border: 1px dashed grey;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    ${flexCenter};
`;
