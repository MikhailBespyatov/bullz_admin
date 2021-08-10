import { Loader } from 'components/common/dynamic/Loader';
import { Section } from 'components/grid/Section';
import { TeamsFilterLayout } from 'components/layouts/filterLayouts/TeamsFilterLayout';
import { TeamCard } from 'componentsNewDesign/layouts/cards/TeamCard';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { useStore } from 'effector-react';
import { teamsNotFoundMessage } from 'pages/Teams/constants';
import React from 'react';
import { teamsStores } from 'stores/team';

export const Teams = () => {
    const { items, totalRecords } = useStore(teamsStores.items);
    const loading = useStore(teamsStores.initialLoading);

    return (
        <MainLayout>
            <TeamsFilterLayout totalRecords={totalRecords}>
                <CatalogContainer totalRecords={totalRecords}>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <>
                            <Section removeMarginRight>
                                {items?.length ? (
                                    items.map(item => <TeamCard key={item.id} {...item} />)
                                ) : (
                                    <Empty title={teamsNotFoundMessage} />
                                )}
                            </Section>
                        </>
                    )}
                </CatalogContainer>
            </TeamsFilterLayout>
        </MainLayout>
    );
};
