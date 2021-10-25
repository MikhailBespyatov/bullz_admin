import dashedBorder from 'assets/dashed_border.svg';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ImageContainer = styled.div`
    border-radius: 8px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    ${flexCenter};
    background: url(${dashedBorder}) no-repeat center;
`;
