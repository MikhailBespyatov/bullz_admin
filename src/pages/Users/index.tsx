import { Loader } from 'components/common/dynamic/Loader';
import { CatalogGrid } from 'componentsNewDesign/grid/CatalogGrid/styles';
import { UserCard } from 'componentsNewDesign/layouts/cards/UserCard';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { UsersFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/UsersFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Users/constants';
import React from 'react';
import { usersStores } from 'stores/users/users';

export const Users = () => {
    const { items, totalRecords } = useStore(usersStores.users);
    const loading = useStore(usersStores.loading);

    return (
        <MainLayout>
            <UsersFilterLayout totalRecords={totalRecords}>
                <CatalogContainer totalRecords={totalRecords}>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <CatalogGrid>
                            {items?.length ? (
                                items.map(item => <UserCard key={item.id} {...item} />)
                            ) : (
                                <Empty title={notFoundMessage} />
                            )}
                        </CatalogGrid>
                    )}
                </CatalogContainer>
            </UsersFilterLayout>
        </MainLayout>
    );
};
