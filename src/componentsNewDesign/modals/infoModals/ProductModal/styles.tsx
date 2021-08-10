import { ellipsisMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { BackgroundColor, BorderProperties, BorderRadius, Color, Padding, Sizes, TextProperties } from 'types/styles';

interface TableProps extends BackgroundColor, BorderRadius, BorderProperties, Sizes, Padding, Color, TextProperties {
    center?: boolean;
}

export const EllipsisTableText = styled.span<TableProps>`
    ${({ width }) => width && `width: ${width}`};
    text-align: start;
    ${ellipsisMixin};
    font-size: ${({ fontSize }) => fontSize || '10px'};
`;

export const TableWrapper = styled.div<TableProps>`
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    ${({ border }) => border && `border: ${border}`};
    overflow: hidden;
`;

export const Table = styled.table<TableProps>`
    border-collapse: collapse;
    width: 100%;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    text-align: center;
`;
export const TableRow = styled.tr<TableProps>`
    width: 100%;
    height: 60px;
    padding: 24px 0px;
    ${({ borderTop }) => borderTop && `border-top: ${borderTop}`};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    ${({ color }) => color && `color: ${color}`};
    text-align: center;
`;

export const TableHeader = styled.th<TableProps>`
    text-align: center;
    ${({ width }) => width && `width: ${width}`};
`;
export const TableData = styled.td<TableProps>`
    text-align: center;
    ${({ color }) => color && `color: ${color}`};
    ${({ padding }) => padding && `padding: ${padding}`};
    ${({ width }) => width && `width: ${width}`};
`;
