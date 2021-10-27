import { Loader } from 'components/common/dynamic/Loader';
import { CreateTrendingUserCard } from 'componentsNewDesign/layouts/cards/CreateTrendingUserCard';
import { UsersFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/UsersFilterLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Title } from 'componentsNewDesign/modals/filterModals/CreateTrendingUserFilterModal/styles';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { grey29 } from 'constants/styles/colors';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Users/constants';
import React, { useEffect } from 'react';
import { createUserTrendingModal } from 'stores/initialize/initialize.modal.store';
import { usersEvents, usersStores } from 'stores/users/users';
import { Title as ITitle } from 'types/data';

interface Props extends ITitle {}

export const CreateTrendingUserFilterModal = ({ title = 'Create trending user' }: Props) => {
    const { items, totalRecords } = useStore(usersStores.users);
    const isFirst = useStore(usersStores.isFirst);
    const { visible } = useStore(createUserTrendingModal.modal);
    const loading = useStore(usersStores.loading);

    const { closeModal } = createUserTrendingModal;

    useEffect(() => {
        !isFirst && usersEvents.setIsFirstToTrue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ModalWrapper
                expanded
                background={grey29}
                visible={visible}
                width="100%"
                onClose={() => closeModal()}
                //onOk={() => closeModal()}
            >
                <UsersFilterLayout withoutFooter totalRecords={totalRecords}>
                    <Section marginBottom={filterMargin}>
                        <Title>{title}</Title>
                    </Section>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <Section marginBottom="42px">
                            {items?.length ? (
                                items.map(item => <CreateTrendingUserCard key={item.id} {...item} />)
                            ) : (
                                <Empty title={notFoundMessage} />
                            )}
                        </Section>
                    )}
                </UsersFilterLayout>
            </ModalWrapper>
        </>
    );
};
