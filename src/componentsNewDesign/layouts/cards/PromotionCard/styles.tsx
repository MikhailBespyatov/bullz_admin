import dashedBorder from 'assets/dashed_border.svg';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ImageContainer = styled.div`
    //border: 1px dashed grey;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    ${flexCenter};
    background: url(${dashedBorder}) no-repeat center;
`;

export const PromotionCardButton = styled(SimpleButton)`
    border-radius: 4px;
    font-weight: 400;
    margin-bottom: 10px;
    padding: 8px;

    :hover {
        background-color: #383636;
        color: ${white};
    }
`;
