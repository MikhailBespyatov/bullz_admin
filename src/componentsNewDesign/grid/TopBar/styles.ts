import { Span } from 'componentsNewDesign/common/typography/Span';
import { black } from 'constants/styles/colors';
import styled from 'styled-components';
import { Pointer } from 'types/styles';

interface ItemSpanProps extends Pointer {}

export const ItemSpan = styled(Span)<ItemSpanProps>`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')};
`;

export const ItemActiveBorder = styled.div`
    height: 4px;
    width: 50%;
    background-color: ${black};
    border-radius: 8px;
`;
