import emptyStateImage from 'assets/icons/blacklist_empty_state_icon_white.svg';
import history from 'browserHistory';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import { CatalogContainerWrapper } from 'componentsNewDesign/layouts/containers/CatalogContainer/styles';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { black, grey23, grey27, grey29, grey32, white } from 'constants/styles/colors';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { emptyStateImageWrapperDiameter } from 'pages/Blacklisted/constants';
import { columns, columnSizes } from 'pages/Emitters/constants';
import React from 'react';
import { DataTable } from 'types/data';
import { Loader } from '../../components/common/dynamic/Loader';
import { EmittersFilterLayout } from '../../componentsNewDesign/layouts/filterLayouts/EmittersFilterLayout';
import { MainLayout } from '../../componentsNewDesign/layouts/MainLayout';
import { Section } from '../../componentsNewDesign/wrappers/grid/FlexWrapper';
import { emittersStores } from '../../stores/emitters/emitters';
import { EmittersTable } from './EmittersTable';
import { TableDataSpan, TableWrapper } from './styles';

export const Emitters = () => {
    const emittersList = useStore(emittersStores.emitters);
    const loading = useStore(emittersStores.loading);

    const onCreateButtonClick = () => history.push('/emitters/create_emitter');

    const dataTable: DataTable[] | undefined = emittersList.map(
        ({
            videoId,
            id,
            userId,
            utcCreated,
            utcUpdated,
            utcEmitStart,
            utcEmitEnd,
            isActive,
            isPast,
            viewsTotalTarget,
            viewsEmitted,
            viewsProgress,
            likesTotalTarget,
            likesEmitted,
            likesProgress,
            sharesTotalTarget,
            sharesEmitted,
            sharesProgress
        }: any) => ({
            cells: [
                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{id}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{videoId}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{userId}</TableDataSpan>
                </Section>,
                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{new Date(utcCreated).toLocaleString()}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{utcUpdated ? new Date(utcUpdated).toLocaleString() : '-'}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{new Date(utcEmitStart).toLocaleString()}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{new Date(utcEmitEnd).toLocaleString()}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{isActive ? 'Yes' : 'No'}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{isPast ? 'Yes' : 'No'}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{viewsTotalTarget}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{viewsEmitted}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{viewsProgress}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{likesTotalTarget}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{likesEmitted}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{likesProgress}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{sharesTotalTarget}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{sharesEmitted}</TableDataSpan>
                </Section>,

                <Section key={userId} alignCenter justifyCenter>
                    <TableDataSpan>{sharesProgress}</TableDataSpan>
                </Section>
            ],
            routeId: id
        })
    );

    return (
        <MainLayout>
            <EmittersFilterLayout>
                <CatalogContainerWrapper>
                    <Section alignCenter justifyBetween marginBottom={filterMargin}>
                        <MarginWrapper marginRight={'50px'}>
                            <Breadcrumb />
                        </MarginWrapper>
                        <SimpleButton
                            background={white}
                            backgroundHover={grey32}
                            borderRadius="4px"
                            color={black}
                            fontSize="10px"
                            fontWeight="400"
                            height="30px"
                            textHover={white}
                            width="95px"
                            onClick={onCreateButtonClick}
                        >
                            Create Emitter
                        </SimpleButton>
                    </Section>
                    <ContentWrapper backgroundColor={grey29} padding="9px 19px">
                        <MarginWrapper marginBottom="18px">
                            <Span fontSize="16px" fontWeight="bold" lineHeight="19px">
                                Emitters
                            </Span>
                        </MarginWrapper>
                        {loading ? (
                            <Section justifyCenter>
                                <Loader size="large" />
                            </Section>
                        ) : emittersList?.length !== 0 ? (
                            <TableWrapper>
                                <EmittersTable
                                    backgroundColor={grey27}
                                    columnSizes={columnSizes}
                                    columns={columns}
                                    data={dataTable}
                                    // sortState={sortConfig}
                                    // onSort={requestSort}
                                ></EmittersTable>
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
                </CatalogContainerWrapper>
            </EmittersFilterLayout>
        </MainLayout>
    );
};
