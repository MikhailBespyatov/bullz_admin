import { Span } from 'componentsNewDesign/common/typography/Span';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { white } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Pointer } from 'types/styles';

interface ItemSpanProps extends Pointer {}

export const ItemSpan = styled(Span)<ItemSpanProps>`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')};
    :hover {
        color: ${({ textHover }) => textHover || 'initial'};
    }

    @media (max-width: ${xs}) {
        display: inline-block;
        white-space: nowrap;

        font-size: 14px;
        line-height: 16px;
    }
`;

export const ItemActiveBorder = styled.div`
    height: 4px;
    width: 50%;
    background-color: ${white};
    border-radius: 8px;
`;

export const Wrapper = styled(Section)`
    margin-bottom: 16px;

    @media (max-width: ${xs}) {
        width: 100%;
        overflow-x: scroll;
        scroll-behavior: smooth;
    }
`;
