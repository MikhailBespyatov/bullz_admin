import noImageIcon from 'assets/no_product_icon.svg';
import history from 'browserHistory';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { cellPadding, promotionsTableColumnTitles } from 'componentsNewDesign/common/tables/PromotionsTable/constants';
import { Table } from 'componentsNewDesign/common/tables/Table';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { TableWrapper } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { marketingToolsLink } from 'constants/routes';
import { errorColor } from 'constants/styles/colors';
import React from 'react';
import { DataTable } from 'types/data';

export interface PromotionsTableProps {
    items: BULLZ.GetAdminPromotionResponse[];
}

export const PromotionsTable = ({ items }: PromotionsTableProps) => {
    const dataTable: DataTable[] | undefined = items?.map(({ id, icon, pageLocation, isActive }) => {
        const onPromotionClick = (id: string) => history.push(marketingToolsLink + '/' + id);

        return {
            cells: [
                <Row key={id} alignCenter noWrap margin={cellPadding}>
                    <ClickableWrapper
                        onClick={() => {
                            id && onPromotionClick(id);
                        }}
                    >
                        <CustomImage src={icon || noImageIcon} width="30px" />
                    </ClickableWrapper>
                </Row>,
                <Row key={id} alignCenter noWrap margin={cellPadding}>
                    <ClickableWrapper
                        onClick={() => {
                            id && onPromotionClick(id);
                        }}
                    >
                        <ContentText>{id} </ContentText>
                    </ClickableWrapper>
                </Row>,

                <Row key={id} margin={cellPadding}>
                    <ClickableWrapper
                        onClick={() => {
                            id && onPromotionClick(id);
                        }}
                    >
                        <ContentText>Promotion Name</ContentText>
                    </ClickableWrapper>
                </Row>,

                <Row key={id} margin={cellPadding}>
                    <ClickableWrapper
                        onClick={() => {
                            id && onPromotionClick(id);
                        }}
                    >
                        <ContentText>{pageLocation}</ContentText>
                    </ClickableWrapper>
                </Row>,

                <Row key={id} margin={cellPadding}>
                    <ClickableWrapper
                        onClick={() => {
                            id && onPromotionClick(id);
                        }}
                    >
                        <ContentWrapper
                            backgroundColor={isActive ? '#29E20A' : errorColor}
                            borderRadius="50%"
                            height="10px"
                            minWidth="10px"
                        />
                    </ClickableWrapper>
                </Row>
            ],
            alignment: [...new Array(5).fill('center')]
        };
    });
    return (
        <TableWrapper>
            <Table columnSizes={[1, 2, 2, 2, 1]} columns={promotionsTableColumnTitles} data={dataTable} />
        </TableWrapper>
    );
};
