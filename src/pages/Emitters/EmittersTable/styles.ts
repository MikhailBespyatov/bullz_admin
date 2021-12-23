import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey13, grey27, grey28, white } from 'constants/styles/colors';
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
    &:hover > div {
        background-color: ${grey27} !important;
        cursor: pointer;
    }

    & > div:first-child {
        background-color: ${grey28};
        padding-bottom: 7px;
        padding-top: 7px;
    }

    & > div:nth-child(even) {
        background-color: ${grey28};
        padding-bottom: 19px;
        padding-top: 19px;
    }

    & > div:nth-child(2),
    & > div:nth-child(4),
    & > div:nth-child(5) {
        padding-bottom: 17px;
        padding-top: 17px;
    }

    & > div:nth-child(9),
    & > div:nth-child(10),
    & > div:nth-child(11) {
        padding-bottom: 12px;
        padding-top: 12px;
    }
`;

interface HeaderRow {
    flexGrow?: string;
}

export const HeaderRow = styled(Row)<HeaderRow>`
    min-width: 100px;
    ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow}`}
`;
