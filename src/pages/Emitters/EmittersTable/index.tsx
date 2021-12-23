import InfoIcon from 'assets/icons/info.svg';
import history from 'browserHistory';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { tableDataBorder } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import { Tooltip } from 'componentsNewDesign/modals/Tooltip';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
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
                        {index === 8 && (
                            <MarginWrapper marginRight="5px">
                                <Tooltip
                                    background="white"
                                    color="black"
                                    title="The total number of views emitted out of the total targeted views"
                                >
                                    <CustomImg height="12px" src={InfoIcon} width="12px" />
                                </Tooltip>
                            </MarginWrapper>
                        )}
                        {index === 9 && (
                            <MarginWrapper marginRight="5px">
                                <Tooltip
                                    background="white"
                                    color="black"
                                    title="The total number of shares emitted out of the total targeted shares"
                                >
                                    <CustomImg height="12px" src={InfoIcon} width="12px" />
                                </Tooltip>
                            </MarginWrapper>
                        )}
                        {index === 10 && (
                            <MarginWrapper marginRight="5px">
                                <Tooltip
                                    background="white"
                                    color="black"
                                    title="The total number of likes emitted out of the total targeted likes"
                                >
                                    <CustomImg height="12px" src={InfoIcon} width="12px" />
                                </Tooltip>
                            </MarginWrapper>
                        )}

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
                const onClick = (e: any) => {
                    if (e.target.classList.contains('copyButton') || e.target.classList.contains('link')) return;
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
