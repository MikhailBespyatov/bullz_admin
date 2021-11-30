import emptyStateImage from 'assets/icons/blacklist_empty_state_icon_white.svg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { DeletedUsersFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/DeletedUsersFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ReasonDeletion } from 'constants/defaults/users';
import { grey23, grey27, grey29 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { useSortableData } from 'hooks/useSortableData';
import { emptyStateImageWrapperDiameter } from 'pages/Blacklisted/constants';
import { DeletedUsersTable } from 'pages/DeletedUsers/DeteledUsersTable';
import React from 'react';
import { deletedUsersStores } from 'stores/users/deletedUsers';
import { DataTable } from 'types/data';
import { columns, columnSizes } from './constants';
import { Reason, TableDataSpan, TableWrapper } from './styles';
import { ReasonTypes } from './types';

export const DeletedUsers = () => {
    const { items, totalRecords } = useStore(deletedUsersStores.deletedUsers);
    const loading = useStore(deletedUsersStores.loading);
    const sortableItems = items ? items : [];
    const { sortedItems, requestSort, sortConfig } = useSortableData(sortableItems);

    const dataTable: DataTable[] | undefined = sortedItems?.map(
        ({ userId, email, mobileNumber, deleterInfo, comment, reasons }) => ({
            cells: [
                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{userId}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{email}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{mobileNumber}</TableDataSpan>
                </Section>,
                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{deleterInfo?.userName}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{comment}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter noWrap>
                    {reasons?.map((reason: ReasonTypes) => (
                        <Reason key={reason}>{ReasonDeletion[reason]} </Reason>
                    ))}
                </Section>
            ]
        })
    );

    return (
        <MainLayout>
            <DeletedUsersFilterLayout>
                <CatalogContainer marginRight="10px" totalRecords={totalRecords}>
                    <ContentWrapper backgroundColor={grey29} padding="9px 19px">
                        <MarginWrapper marginBottom="18px">
                            <Span fontSize="16px" fontWeight="bold" lineHeight="19px">
                                Deleted Users
                            </Span>
                        </MarginWrapper>
                        {loading ? (
                            <Section justifyCenter>
                                <Loader size="large" />
                            </Section>
                        ) : items?.length !== 0 ? (
                            <TableWrapper>
                                <DeletedUsersTable
                                    backgroundColor={grey27}
                                    columnSizes={columnSizes}
                                    columns={columns}
                                    data={dataTable}
                                    sortState={sortConfig}
                                    onSort={requestSort}
                                ></DeletedUsersTable>
                            </TableWrapper>
                        ) : (
                            <Empty
                                emptyLayoutMarginTop="100px"
                                imageHeight="18px"
                                imageSrc={emptyStateImage}
                                imageWidth="22px"
                                imageWrapperBackgroundColor={grey23}
                                imageWrapperBorderRadius="50%"
                                imageWrapperHeight={emptyStateImageWrapperDiameter}
                                imageWrapperWidth={emptyStateImageWrapperDiameter}
                                title="Nothing Found"
                                titleFontSize="16px"
                                titleFontWeight="500"
                                titleLineHeight="26px"
                                titleWidth="390px"
                            />
                        )}
                    </ContentWrapper>
                </CatalogContainer>
            </DeletedUsersFilterLayout>
        </MainLayout>
    );
};
