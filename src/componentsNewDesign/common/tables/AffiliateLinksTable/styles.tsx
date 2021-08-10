import { tableDataPadding } from 'componentsNewDesign/common/tables/AffiliateLinksTable/constants';
import { black, grey11 } from 'constants/styles/colors';
import { ellipsisMixin, flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';
import {
    Background,
    BorderProperties,
    BorderRadius,
    Color,
    Padding,
    Sizes,
    TextAlignment,
    TextProperties
} from 'types/styles';

interface TableProps
    extends Background,
        BorderRadius,
        BorderProperties,
        Sizes,
        Padding,
        Color,
        TextProperties,
        TextAlignment {
    center?: boolean;
}

export const EllipsisTableText = styled.span<TableProps>`
    text-align: ${({ alignTextCenter }) => (alignTextCenter && ' center') || 'start'};
    font-size: ${({ fontSize }) => fontSize || '12px'};
    color: ${({ color }) => color || black};
    ${({ width }) => width && `width: ${width}`};
    ${ellipsisMixin};
`;

export const TableBody = styled.tbody`
    width: 100%;
`;

export const Table = styled.table<TableProps>`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
    ${({ background }) => background && `background-color: ${background}`};
`;
export const TableRow = styled.tr<TableProps>`
    font-size: ${({ fontSize }) => fontSize || '10px'};
    font-weight: ${({ fontWeight }) => fontWeight || '500'};
    line-height: normal;
    text-align: center;
    display: flex;
    align-items: center;
`;

export const TableTitle = styled.th<TableProps>`
    ${({ color }) => color && `color: ${color}`};
    ${({ height }) => height && `height: ${height}`};
    width: ${({ width }) => width || 'fit-content'};
    text-align: center;
    font-size: 14px;
    ${flexCenter};
`;

export const Cell = styled.td<TableProps>`
    ${({ color }) => color && `color: ${color}`};
    ${({ height }) => height && `height: ${height}`};
    width: ${({ width }) => width || 'fit-content'};
    padding: ${tableDataPadding};
    text-align: center;
    border-bottom: 1px solid ${grey11};
    ${flexCenter};
`;
