import { Span } from 'componentsNewDesign/common/typography/Span';
import { white } from 'constants/styles/colors';
import styled from 'styled-components';
import { Pointer } from 'types/styles';

interface ItemSpanProps extends Pointer {}

export const ItemSpan = styled(Span)<ItemSpanProps>`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')};
    :hover {
        color: ${({ textHover }) => textHover || 'initial'};
    }
`;

export const ItemActiveBorder = styled.div`
    height: 4px;
    width: 50%;
    background-color: ${white};
    border-radius: 8px;
`;
