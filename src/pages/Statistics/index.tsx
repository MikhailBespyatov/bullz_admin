import { useStore } from 'effector-react';
import React from 'react';
import { statisticsNotFoundMessage } from 'pages/Statistics/constants';
import { statisticsStores } from 'stores/statistics/statistics';
import { StatisticsFilterLayout } from 'components/layouts/filterLayouts/StatisticsFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Section } from 'components/grid/Section';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { StatisticsTable } from 'components/common/tables/StatisticsTable';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';

export const Statistics = () => {
    const { totalRecords, items } = useStore(statisticsStores.statistics);
    const loading = useStore(statisticsStores.initialLoading);

    return (
        <MainLayout>
            <StatisticsFilterLayout totalRecords={totalRecords}>
                {loading ? (
                    <Section justifyCenter>
                        <Loader size="large" />
                    </Section>
                ) : (
                    <>
                        <Section>
                            {items?.length ? (
                                <StatisticsTable items={items} />
                            ) : (
                                <Empty title={statisticsNotFoundMessage} />
                            )}
                        </Section>
                    </>
                )}
            </StatisticsFilterLayout>
        </MainLayout>
    );
};
