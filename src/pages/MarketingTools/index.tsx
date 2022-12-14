import history from 'browserHistory';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { PromotionsTable } from 'componentsNewDesign/common/tables/PromotionsTable';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { MarketingToolsFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/MarketingToolsFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { promotionCreateLink } from 'constants/routes';
import { black, grey32, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
// import { defaultMessage } from 'pages/MarketingTools/constants';
import { LayoutContentWrapper, TableWrapper } from 'pages/MarketingTools/styles';
import React, { useEffect } from 'react';
import { promotionsEvents, promotionsStores } from 'stores/promotions/promotions';

const { invokeGetItems, setIsFirstToFalse } = promotionsEvents;
const { isFirst } = promotionsStores;

export const MarketingTools = () => {
    const { items, totalRecords } = useStore(promotionsStores.promotions);
    const isPageLoading = useStore(promotionsStores.loading);
    const onCreateButtonClick = () => history.push(promotionCreateLink);

    useEffect(() => {
        if (isFirst) {
            invokeGetItems();
            setIsFirstToFalse();
        }
    }, []);

    return (
        <MainLayout>
            <MarketingToolsFilterLayout>
                <LayoutContentWrapper>
                    <MarginWrapper marginBottom="10px">
                        <TotalBadge quantity={totalRecords} />
                    </MarginWrapper>
                    <TableWrapper>
                        <Section alignCenter justifyBetween marginBottom="12px">
                            <Span fontSize="16px" fontWeight="700" lineHeight="18px">
                                Current Promotions
                            </Span>
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
                                Create Promotion
                            </SimpleButton>
                        </Section>

                        <Section>
                            {isPageLoading ? (
                                <Section justifyCenter>
                                    <Loader size="large" />
                                </Section>
                            ) : (
                                <Section>
                                    {!!items?.length ? (
                                        <PromotionsTable items={items} />
                                    ) : (
                                        <Empty
                                            emptyLayoutMarginTop="100px"
                                            //title={defaultMessage}
                                            titleFontSize="16px"
                                            titleFontWeight="500"
                                            titleLineHeight="26px"
                                            titleWidth="390px"
                                        />
                                    )}
                                </Section>
                            )}
                        </Section>
                    </TableWrapper>
                </LayoutContentWrapper>
            </MarketingToolsFilterLayout>
        </MainLayout>
    );
};
