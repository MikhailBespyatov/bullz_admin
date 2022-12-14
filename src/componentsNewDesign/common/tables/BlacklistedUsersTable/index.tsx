import {
    blacklistedTableColumnTitles,
    defaultTitles,
    SearchType
} from 'componentsNewDesign/common/tables/BlacklistedUsersTable/constants';
import { Table } from 'componentsNewDesign/common/tables/Table';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { tableBorderRadius } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import { TableWrapper } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/styles';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey27 } from 'constants/styles/colors';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'types/data';

export interface BlacklistedUsersTableProps {
    items: BULLZ.GetBlacklistedUsersResponse[];
    type: SearchType;
}

export const BlacklistedUsersTable = ({ items, type = 1 }: BlacklistedUsersTableProps) => {
    const [tableColumnTitles, setTableColumns] = useState<string[]>(defaultTitles);
    //const [tableColumnSizes, setTableColumnSizes] = useState<number[]>();

    const dataTable: DataTable[] | undefined = items?.map(({ id = '', searchTextValue }) => ({
        cells: [
            <Row key={id} alignCenter noWrap>
                <ContentText>{id}</ContentText>
            </Row>,

            <Row key={id}>
                <ContentText>{searchTextValue}</ContentText>
            </Row>
        ],
        alignment: [...new Array(2).fill('center')]
    }));

    useEffect(() => {
        const newColumTitles = blacklistedTableColumnTitles.filter((_, index) => index === 0 || index === type);
        setTableColumns(newColumTitles);

        // const newColumSizes = blacklistedTableColumnSizes.filter((_, index) => index === 0 || index === type);
        // setTableColumnSizes(newColumSizes);
    }, [type]);

    return (
        <TableWrapper backgroundColor={grey27} borderRadius={tableBorderRadius}>
            <Table backgroundColor={grey27} columns={tableColumnTitles} data={dataTable} />
        </TableWrapper>
    );
};
