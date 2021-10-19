import noImageIcon from 'assets/no_product_icon.svg';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { cellPadding, promotionsTableColumnTitles } from 'componentsNewDesign/common/tables/PromotionsTable/constants';
import { Table } from 'componentsNewDesign/common/tables/Table';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { TableWrapper } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { errorColor } from 'constants/styles/colors';
import React from 'react';
import { DataTable } from 'types/data';

export interface PromotionsTableProps {
    items: BULLZ.GetAdminPromotionResponse[];
}

export const PromotionsTable = ({ items }: PromotionsTableProps) => {
    const dataTable: DataTable[] | undefined = items?.map(({ id, icon, pageLocation, isActive }) => ({
        cells: [
            <Row key={id} alignCenter noWrap margin={cellPadding}>
                <CustomImage src={icon || noImageIcon} width="30px" />
            </Row>,

            <Row key={id} margin={cellPadding}>
                <ContentText>Promotion Name</ContentText>
            </Row>,

            <Row key={id} margin={cellPadding}>
                <ContentText>{pageLocation}</ContentText>
            </Row>,

            <Row key={id} margin={cellPadding}>
                <ContentWrapper
                    backgroundColor={isActive ? '#29E20A' : errorColor}
                    borderRadius="50%"
                    height="10px"
                    minWidth="10px"
                />
            </Row>
        ],
        alignment: [...new Array(4).fill('center')]
    }));

    return (
        <TableWrapper>
            <Table columnSizes={[1, 2, 2, 1]} columns={promotionsTableColumnTitles} data={dataTable} />
        </TableWrapper>
    );
};
