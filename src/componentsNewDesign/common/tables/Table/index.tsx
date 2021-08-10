import { tableDataBorder } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import { black, grey12 } from 'constants/styles/colors';
import React from 'react';
import { DataTable } from 'types/data';
import { AlignmentType } from 'types/types';
import { Cell, RowWrapper, TableBody, TableHeader, TableHeaderColumnSpan } from './styles';

export interface TableProps {
    columns: string[];
    columnSizes?: number[];
    data?: DataTable[];
}

export const Table = ({ columns, columnSizes = new Array<number>(columns.length).fill(1), data }: TableProps) => {
    const flexBasisValues = columnSizes?.map(value => (100 * value) / columnSizes?.reduce((a, b) => a + b) + '%');

    return (
        <>
            <TableHeader alignCenter backgroundColor={grey12} height="45px">
                {columns.map((title, index) => (
                    <Cell key={title} justifyCenter flexBasis={flexBasisValues[index]}>
                        <TableHeaderColumnSpan color={black}>{title}</TableHeaderColumnSpan>
                    </Cell>
                ))}
            </TableHeader>
            <TableBody>
                {data?.map(({ cells, alignment = new Array<AlignmentType>(columns.length).fill('start') }, index) => (
                    <RowWrapper key={index.toString()} alignCenter justifyAround border={tableDataBorder}>
                        {cells.map((cell, index) => (
                            <Cell
                                key={index.toString()}
                                columnAlignment={alignment[index]}
                                flexBasis={flexBasisValues[index]}
                            >
                                {cell}
                            </Cell>
                        ))}
                    </RowWrapper>
                ))}
            </TableBody>
        </>
    );
};
