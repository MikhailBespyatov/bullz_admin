import emptyStateImage from 'assets/icons/blacklist_empty_state_icon_white.svg';
import history from 'browserHistory';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { ToggleButton } from 'componentsNewDesign/common/buttons/ToggleButton';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import { StyledLink } from 'componentsNewDesign/layouts/blocks/PropertyBlock/styles';
import { copyUserIdMessage } from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { CatalogContainerWrapper } from 'componentsNewDesign/layouts/containers/CatalogContainer/styles';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Tooltip } from 'componentsNewDesign/modals/Tooltip';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { black, errorColor, green2, grey23, grey27, grey29, grey32, white } from 'constants/styles/colors';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useSortableData } from 'hooks/useSortableData';
import { emptyStateImageWrapperDiameter } from 'pages/Blacklisted/constants';
import { columns, columnSizes } from 'pages/Emitters/constants';
import { copyEmitIdMessage, copyVideoIdMessage } from 'pages/Emitters/Emitter/constants';
import React, { useEffect } from 'react';
import { DataTable } from 'types/data';
import { formatDateISOString, getEllipsisStartAndEnd } from 'utils/usefulFunctions';
import { Loader } from '../../components/common/dynamic/Loader';
import { EmittersFilterLayout } from '../../componentsNewDesign/layouts/filterLayouts/EmittersFilterLayout';
import { MainLayout } from '../../componentsNewDesign/layouts/MainLayout';
import { Flex, Row, Section } from '../../componentsNewDesign/wrappers/grid/FlexWrapper';
import { emittersEffects, emittersStores } from '../../stores/emitters/emitters';
import { EmittersTable } from './EmittersTable';
import { TableDataImg, TableDataSpan, TableWrapper } from './styles';

export const Emitters = () => {
    const { isEnabled } = useStore(emittersStores.emittersState);
    const emittersList = useStore(emittersStores.emitters);
    const sortableItems = emittersList.items ? emittersList.items.map((item: any) => ({ ...item })) : [];

    const { sortedItems, requestSort, sortConfig } = useSortableData(sortableItems);

    const loading = useStore(emittersStores.loading);

    const onCreateButtonClick = () => history.push('/emitters/create_emitter');

    const onToggleClick = () => {
        emittersEffects.switchEmitterState({ enabled: !isEnabled });
    };

    useEffect(() => {
        emittersEffects.getEmittersState();
    }, []);

    const dataTable: DataTable[] | undefined = sortedItems?.map(
        ({
            videoId,
            id,
            userId,
            utcCreated,
            utcEmitStart,
            utcEmitEnd,
            isActive,
            viewsTotalTarget,
            viewsEmitted,
            viewsProgress,
            likesTotalTarget,
            likesEmitted,
            likesProgress,
            sharesTotalTarget,
            sharesEmitted,
            sharesProgress,
            video,
            user
        }: any) => ({
            cells: [
                <Section key={id} alignCenter justifyCenter>
                    <TableDataImg src={video.thumbnailUrl} />
                </Section>,
                <Section key={id} alignCenter justifyCenter>
                    <Tooltip background="white" color="black" title={videoId} width="initial">
                        <StyledLink className="link" to={`videos/${videoId}`}>
                            <TableDataSpan className="link">{getEllipsisStartAndEnd(videoId)}</TableDataSpan>
                        </StyledLink>
                    </Tooltip>
                    <ContentWrapper marginLeft="16px" minWidth="18px">
                        <CopyButton subject={videoId} success={copyVideoIdMessage} />
                    </ContentWrapper>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{user.userName}</TableDataSpan>
                    {user.isTrusted && (
                        <MarginWrapper marginLeft="8px">
                            <Tooltip title="Account is trusted">
                                <TrustedIcon />
                            </Tooltip>
                        </MarginWrapper>
                    )}
                </Section>,
                <Section key={id} alignCenter justifyCenter>
                    <Tooltip background="white" color="black" title={userId} width="initial">
                        <StyledLink className="link" to={`users/${userId}`}>
                            <TableDataSpan className="link">{getEllipsisStartAndEnd(userId)}</TableDataSpan>
                        </StyledLink>
                    </Tooltip>
                    <ContentWrapper marginLeft="16px" minWidth="18px">
                        <CopyButton subject={userId} success={copyUserIdMessage} />
                    </ContentWrapper>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <ContentWrapper
                        backgroundColor={isActive ? green2 : errorColor}
                        borderRadius="50%"
                        height="8px"
                        marginRight="16px"
                        minWidth="8px"
                    ></ContentWrapper>
                    <Tooltip background="white" color="black" title={id} width="initial">
                        <TableDataSpan>{getEllipsisStartAndEnd(id)}</TableDataSpan>
                    </Tooltip>
                    <ContentWrapper marginLeft="16px" minWidth="18px">
                        <CopyButton subject={id} success={copyEmitIdMessage} />
                    </ContentWrapper>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{formatDateISOString(utcCreated)}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{formatDateISOString(utcEmitStart)}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <TableDataSpan>{formatDateISOString(utcEmitEnd)}</TableDataSpan>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <Section justifyBetween marginBottom="10px" marginLeft="30px" marginRight="30px">
                        <TableDataSpan>{viewsEmitted}</TableDataSpan>
                        <TableDataSpan color="#919195">{viewsTotalTarget}</TableDataSpan>
                    </Section>
                    <ContentWrapper backgroundColor="black" height="4px">
                        <ContentWrapper
                            backgroundColor="white"
                            height="4px"
                            minWidth={`${viewsProgress * 100}%`}
                            width={`${viewsProgress * 100}%`}
                        ></ContentWrapper>
                    </ContentWrapper>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <Section justifyBetween marginBottom="10px" marginLeft="30px" marginRight="30px">
                        <TableDataSpan>{sharesEmitted}</TableDataSpan>
                        <TableDataSpan color="#919195">{sharesTotalTarget}</TableDataSpan>
                    </Section>
                    <ContentWrapper backgroundColor="black" height="4px">
                        <ContentWrapper
                            backgroundColor="white"
                            height="4px"
                            minWidth={`${sharesProgress * 100}%`}
                            width={`${sharesProgress * 100}%`}
                        ></ContentWrapper>
                    </ContentWrapper>
                </Section>,

                <Section key={id} alignCenter justifyCenter>
                    <Section justifyBetween marginBottom="10px" marginLeft="30px" marginRight="30px">
                        <TableDataSpan>{likesEmitted}</TableDataSpan>
                        <TableDataSpan color="#919195">{likesTotalTarget}</TableDataSpan>
                    </Section>
                    <ContentWrapper backgroundColor="black" height="4px">
                        <ContentWrapper
                            backgroundColor="white"
                            height="4px"
                            minWidth={`${likesProgress * 100}%`}
                            width={`${likesProgress * 100}%`}
                        ></ContentWrapper>
                    </ContentWrapper>
                </Section>
            ],
            routeId: id
        })
    );

    return (
        <MainLayout>
            <EmittersFilterLayout totalRecords={emittersList.totalRecords}>
                <CatalogContainerWrapper>
                    <Section alignCenter justifyBetween marginBottom={filterMargin}>
                        <Flex alignCenter>
                            <MarginWrapper>
                                <Breadcrumb />
                            </MarginWrapper>
                            {emittersList.totalRecords !== undefined && (
                                <TotalBadge quantity={emittersList.totalRecords} />
                            )}
                        </Flex>
                        <Row alignCenter>
                            <Span>{isEnabled ? 'Disable' : 'Enable'}</Span>
                            <Row alignCenter marginLeft="10px" marginRight="20px">
                                <ToggleButton value={!isEnabled} onChange={onToggleClick} />
                            </Row>
                            <SimpleButton
                                background={white}
                                backgroundHover={grey32}
                                borderRadius="4px"
                                color={black}
                                disabled={!isEnabled}
                                fontSize="10px"
                                fontWeight="400"
                                height="30px"
                                textHover={white}
                                width="95px"
                                onClick={onCreateButtonClick}
                            >
                                Create Emitter
                            </SimpleButton>
                        </Row>
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
                                    sortState={sortConfig}
                                    onSort={requestSort}
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
