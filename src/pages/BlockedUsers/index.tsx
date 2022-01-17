import emptyStateImage from 'assets/icons/blacklist_empty_state_icon.svg';
import { SortableUsersTable } from 'components/common/tables/SortableUsersTable';
import { BlockedUsersFilterLayout } from 'components/layouts/filterLayouts/BlockedUsersFilterLayout';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ReasonDeletion } from 'constants/defaults/users';
import { blockedUsersLink } from 'constants/routes';
import { grey27, grey29, selectHover } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { useSortableData } from 'hooks/useSortableData';
import { columns, columnSizes, defaultMessage, emptyStateImageWrapperDiameter } from 'pages/BlockedUsers/constants';
import React from 'react';
import { blockedUsersStores } from 'stores/users/disabledUsers';
import { DataTable } from 'types/data';
import { Reason, TableDataSpan, TableWrapper } from './styles';

type ReasonTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const BlockedUsers = () => {
    const { items, totalRecords } = useStore(blockedUsersStores.blockedUsers);
    const loading = useStore(blockedUsersStores.loading);
    const sortableItems = items ? items : [];
    const { sortedItems, requestSort, sortConfig } = useSortableData(sortableItems);

    const dataTable: DataTable[] | undefined = sortedItems?.map(({ id, email, mobileNumber, disablingInfo }) => {
        const comment = disablingInfo.length ? disablingInfo[disablingInfo.length - 1].comment : '';
        const disablerId = disablingInfo.length ? disablingInfo[disablingInfo.length - 1].disablerId : '';
        const reasons = disablingInfo.length ? disablingInfo[disablingInfo.length - 1].reasons : [];

        return {
            cells: [
                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{id}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{email}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{mobileNumber}</TableDataSpan>
                </Section>,
                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{disablerId}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{comment}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter noWrap>
                    {reasons.map((reason: ReasonTypes) => (
                        <Reason key={reason}>{ReasonDeletion[reason]} </Reason>
                    ))}
                </Section>
            ],
            route: `${blockedUsersLink}/${id}`
        };
    });

    return (
        <MainLayout>
            <BlockedUsersFilterLayout totalRecords={totalRecords}>
                <CatalogContainer totalRecords={totalRecords}>
                    <ContentWrapper backgroundColor={grey29} padding="9px 19px">
                        <MarginWrapper marginBottom="18px">
                            <Span fontSize="16px" fontWeight="bold" lineHeight="19px">
                                Blocked Users
                            </Span>
                        </MarginWrapper>
                        {loading ? (
                            <Section justifyCenter>
                                <Loader size="large" />
                            </Section>
                        ) : items?.length !== 0 ? (
                            <TableWrapper>
                                <SortableUsersTable
                                    backgroundColor={grey27}
                                    columnSizes={columnSizes}
                                    columns={columns}
                                    data={dataTable}
                                    sortState={sortConfig}
                                    onSort={requestSort}
                                ></SortableUsersTable>
                            </TableWrapper>
                        ) : (
                            <Empty
                                emptyLayoutMarginTop="100px"
                                imageHeight="18px"
                                imageSrc={emptyStateImage}
                                imageWidth="22px"
                                imageWrapperBackgroundColor={selectHover}
                                imageWrapperBorderRadius="50%"
                                imageWrapperHeight={emptyStateImageWrapperDiameter}
                                imageWrapperWidth={emptyStateImageWrapperDiameter}
                                title={defaultMessage}
                                titleFontSize="16px"
                                titleFontWeight="500"
                                titleLineHeight="26px"
                                titleWidth="390px"
                            />
                        )}
                    </ContentWrapper>
                </CatalogContainer>
            </BlockedUsersFilterLayout>
        </MainLayout>
    );
};
