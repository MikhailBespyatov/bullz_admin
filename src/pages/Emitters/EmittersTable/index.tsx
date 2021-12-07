import history from 'browserHistory';
import { tableDataBorder } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { emittersLink } from 'constants/routes';
import { grey23 } from 'constants/styles/colors';
import React from 'react';
import { TableProps } from '../types';
import { HeaderRow, RowWrapper, TableBody, TableHeader, TableHeaderColumnSpan } from './styles';

export const EmittersTable = ({
    columns,
    columnSizes = new Array<string>(columns.length).fill('200px'),
    data,
    backgroundColor,
    onSort,
    sortState
}: TableProps) => (
    <ContentWrapper border={tableDataBorder} minWidth="100%" width="fit-content">
        <TableHeader alignCenter noWrap backgroundColor={backgroundColor || grey23} height="32px">
            {columns.map(({ title, isSorted, field }, index) => {
                const lastItemGrow = index === columns.length - 1 ? '1' : '0';
                const ascending = sortState?.key === field && sortState?.direction === 'ascending';
                const descending = sortState?.key === field && sortState?.direction === 'descending';
                const onClick = () => {
                    if (field && onSort) onSort(field);
                };

                return (
                    <HeaderRow key={title} justifyCenter flexGrow={lastItemGrow} width={columnSizes[index]}>
                        <TableHeaderColumnSpan
                            ascending={ascending}
                            descending={descending}
                            isSorted={isSorted}
                            onClick={onClick}
                        >
                            {title}
                        </TableHeaderColumnSpan>
                    </HeaderRow>
                );
            })}
        </TableHeader>
        <TableBody>
            {data?.map(({ cells, routeId }, index) => {
                const onClick = () => {
                    history.push(`${emittersLink}/${routeId}`);
                };

                return (
                    <RowWrapper
                        key={index.toString()}
                        alignCenter
                        noWrap
                        borderBottom={tableDataBorder}
                        onClick={onClick}
                    >
                        {cells.map((cell, index) => (
                            <Row key={index.toString()} justifyCenter width={columnSizes[index]}>
                                {cell}
                            </Row>
                        ))}
                    </RowWrapper>
                );
            })}
        </TableBody>
    </ContentWrapper>
);
