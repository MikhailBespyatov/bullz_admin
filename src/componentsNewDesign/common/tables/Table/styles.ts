import { Column, FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey4 } from 'constants/styles/colors';
import styled from 'styled-components';
import { ColumnAlignment } from 'types/data';
import { BackgroundColor, BorderProperties, Color } from 'types/styles';

export const TableHeaderColumnSpan = styled.span<Color>`
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: ${({ color }) => color || grey4};
`;

export const Cell = styled(FlexGrow)<ColumnAlignment>`
    flex-direction: row;
    ${({ columnAlignment }) =>
        columnAlignment === 'start'
            ? 'justify-content: flex-start;'
            : columnAlignment === 'end'
            ? 'justify-content: flex-end;'
            : 'justify-content: center;'}
`;

interface TableHeaderProps extends BorderProperties, BackgroundColor {}

export const TableHeader = styled(Section)<TableHeaderProps>`
    box-sizing: border-box;
    ${({ height }) => height && `height: ${height}`};
    ${({ border }) => border && `border: ${border}`};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    border-radius: 4px 4px 0px 0px;
`;

export const TableBody = styled(Column)`
    width: 100%;
`;

interface RowWrapperProps extends Pick<BorderProperties, 'border'> {}

export const RowWrapper = styled(Section)<RowWrapperProps>`
    height: 70px;
    ${({ border }) => border && `border: ${border}`};
    box-sizing: border-box;
    flex-wrap: nowrap;
`;
