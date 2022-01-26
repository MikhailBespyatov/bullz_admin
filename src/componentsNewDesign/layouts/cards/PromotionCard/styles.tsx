import dashedBorder from 'assets/dashed_border.svg';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { grey11, white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled, { css } from 'styled-components';

interface ImageContainerProps {
    withDecoration: boolean;
}

export const ImageContainer = styled.div<ImageContainerProps>`
    //border: 1px dashed grey;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    ${flexCenter};

    ${({ withDecoration }) =>
        withDecoration &&
        css`
            background: url(${dashedBorder}) no-repeat center;
        `};
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

export const LocationsListWrapper = styled.div`
    position: absolute;
    max-height: 180px;
    min-width: 200px;
    padding-right: 10px;
    border-radius: 0px 0px 8px 8px;
    background-color: #161616;
    border: 1px solid #252525;
    box-shadow: 7px 10px 10px #131313;
    overflow-y: scroll;
    z-index: 5;

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #313131;
    }
`;

export const ItemClickableWrapper = styled(ClickableWrapper)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 5px 10px;
    font-size: 12px;
    color: inherit;

    :hover {
        background-color: ${grey11};
    }
`;
