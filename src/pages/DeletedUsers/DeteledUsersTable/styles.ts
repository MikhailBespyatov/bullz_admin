import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey13, grey27, white } from 'constants/styles/colors';
import styled, { css } from 'styled-components';
import { BackgroundColor, BorderProperties, Color } from 'types/styles';

interface TableHeaderColumnSpan extends Color {
    isSorted?: boolean;
    ascending?: boolean;
    descending?: boolean;
}

export const TableHeaderColumnSpan = styled.span<TableHeaderColumnSpan>`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${({ color }) => color || grey13};

    ${({ isSorted, ascending, descending }) =>
        isSorted &&
        css`
            position: relative;
            cursor: pointer;
            &::after {
                content: '';
                position: absolute;
                width: 6px;
                right: -15%;
                bottom: 0;
                border: 3px solid transparent;
                border-top: ${descending ? ` 3px solid ${white}` : '3px solid rgba(255, 255, 255, 0.2)'};
            }
            &::before {
                content: '';
                position: absolute;
                width: 6px;
                right: -15%;
                bottom: 50%;
                border: 3px solid transparent;
                border-bottom: ${ascending ? ` 3px solid ${white}` : '3px solid rgba(255, 255, 255, 0.2)'};
            }
        `}
`;

interface TableHeaderProps extends BorderProperties, BackgroundColor {}

export const TableHeader = styled(Section)<TableHeaderProps>`
    ${({ height }) => height && `height: ${height}`};
    ${({ border }) => border && `border: ${border}`};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    border-radius: 4px 4px 0px 0px;
`;

export const TableBody = styled(Column)`
    width: 100%;
`;

interface RowWrapperProps extends Pick<BorderProperties, 'borderBottom'> {}

export const RowWrapper = styled(Section)<RowWrapperProps>`
    height: 58px;
    ${({ borderBottom }) => borderBottom && `border-bottom: ${borderBottom}`};
    border-top: none;
    flex-wrap: nowrap;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${grey27};
        cursor: pointer;
    }
`;

interface HeaderRow {
    flexGrow?: string;
}

export const HeaderRow = styled(Row)<HeaderRow>`
    min-width: 130px;
    ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow}`}
`;
