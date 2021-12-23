import { Img } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { pink2, purple2 } from 'constants/styles/colors';
import styled from 'styled-components';

export const TableDataSpan = styled(Span)`
    font-weight: 500;
    font-size: 12px;
    ${({ color }) => color && `color: ${color}`};
`;

export const TableDataImg = styled(Img)`
    width: 42px;
    height: 42px;
`;

export const Reason = styled.div`
    white-space: nowrap;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;

    color: ${purple2};

    padding: 8px 16px;
    background: ${pink2};
    border-radius: 32px;

    margin-right: 4px;
`;

export const TableWrapper = styled.div`
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
`;
