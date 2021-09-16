import blackCopyIcon from 'assets/copy_icon_black.svg';
import { ManagerLayout } from 'components/layouts/RolesLayouts';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { ExternalLink } from 'componentsNewDesign/common/links/ExternalLink';
import {
    buttonsBorderRadius,
    buttonsFontSize,
    buttonsFontWeight,
    buttonsHeight,
    tableHeaderBackgroundColor,
    tableHeaderBorderRadius,
    tablePadding,
    tableTitles,
    urlBackgroundColor,
    urlColor,
    widthArray
} from 'componentsNewDesign/common/tables/AffiliateLinksTable/constants';
import {
    Cell,
    EllipsisTableText,
    Table,
    TableBody,
    TableRow,
    TableTitle
} from 'componentsNewDesign/common/tables/AffiliateLinksTable/styles';
import { TableData, TableProps } from 'componentsNewDesign/common/tables/AffiliateLinksTable/types';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { ChangeAffiliateLinkPopover } from 'componentsNewDesign/modals/popovers/products/ChangeAffiliateLinkPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import { black, white } from 'constants/styles/colors';
import React from 'react';

interface Props extends YEAY.GetAffiliateLinkResponse {
    empty?: boolean;
}

export const AffiliateLinksTable = ({ entries, productId = '', empty }: Props) => {
    const tableData: TableData[] =
        !empty && entries?.length
            ? entries.map(({ cultureInfo, url = '' }, i) => ({
                  cells: [
                      <Row key={i.toString()} alignCenter justifyCenter width="55px">
                          <EllipsisTableText>{cultureInfo || 'No Content'}</EllipsisTableText>
                      </Row>,

                      <ContentWrapper
                          key={i.toString()}
                          backgroundColor={url && urlBackgroundColor}
                          borderRadius="4px"
                          padding="0px 4px"
                      >
                          <Row alignCenter justifyBetween>
                              <EllipsisTableText
                                  alignTextCenter={!url}
                                  color={url && urlColor}
                                  // width={(url && '275px') || '100%'}
                              >
                                  {(url && <ExternalLink href={url} />) || 'No Content'}
                              </EllipsisTableText>
                              {url && (
                                  <MarginWrapper marginLeft="5px">
                                      <CopyButton
                                          customCopyIcon={blackCopyIcon}
                                          subject={url}
                                          success={'Link was copied'}
                                      />
                                  </MarginWrapper>
                              )}
                          </Row>
                      </ContentWrapper>,
                      <Section key={i.toString()} alignCenter justifyCenter>
                          <Row>
                              <ManagerLayout>
                                  <ChangeAffiliateLinkPopover
                                      disabledSelector
                                      cultureInfo={cultureInfo}
                                      i={i}
                                      id={productId}
                                      url={url}
                                  >
                                      <SimpleButton
                                          background={black}
                                          borderRadius={buttonsBorderRadius}
                                          color={white}
                                          fontSize={buttonsFontSize}
                                          fontWeight={buttonsFontWeight}
                                          height={buttonsHeight}
                                          padding="8px"
                                          onClick={noop}
                                      >
                                          Update Affiliate Link
                                      </SimpleButton>
                                  </ChangeAffiliateLinkPopover>
                              </ManagerLayout>
                          </Row>
                      </Section>
                  ]
              }))
            : [];

    return <TableConstructor cellsWidth={widthArray} data={tableData} tableTitles={tableTitles} />;
};

const TableConstructor = ({ tableTitles, data, cellsWidth, tableWidth }: TableProps) =>
    data?.length ? (
        <>
            <ContentWrapper borderRadius="0px" padding={tablePadding} width={tableWidth}>
                <Table background={tableHeaderBackgroundColor} borderRadius={tableHeaderBorderRadius}>
                    <TableRow>
                        {tableTitles.map((title, index) => (
                            <TableTitle key={title} height="35px" width={cellsWidth[index]}>
                                {title}
                            </TableTitle>
                        ))}
                    </TableRow>
                </Table>
                {/* <ScrollableWrapper height="165px"> */}
                <Row height="fit-content">
                    <Table>
                        <TableBody>
                            {data.map(({ cells }, i) => (
                                <TableRow key={i.toString()}>
                                    {cells.map((cell, i) => (
                                        <Cell key={i.toString()} height="55px" width={cellsWidth[i]}>
                                            {cell}
                                        </Cell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Row>
            </ContentWrapper>
        </>
    ) : (
        <Empty title="No affiliate links" />
    );
