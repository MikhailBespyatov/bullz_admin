import { useMediaQuery } from '@material-ui/core';
import { Loader } from 'components/common/dynamic/Loader';
import { Empty } from 'components/layouts/resultLayouts/Empty';
import { CreateTrendingVideoCard } from 'componentsNewDesign/layouts/cards/CreateVideoUserCard';
import { VideosFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout';
import { Title } from 'componentsNewDesign/modals/filterModals/CreateTrendingUserFilterModal/styles';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { TrendingsModalWrapper } from 'componentsNewDesign/wrappers/TrendingsModalWrapper';
import { grey29 } from 'constants/styles/colors';
import { filterMargin, xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Users/constants';
import React, { useEffect } from 'react';
import { createTrendingVideoModal } from 'stores/initialize/initialize.modal.store';
import { videosEvents, videosStores } from 'stores/videos/videos';
import { Title as ITitle } from 'types/data';

interface Props extends ITitle {}

export const CreateTrendingVideoFilterModal = ({ title = 'Create trending video' }: Props) => {
    const { items, totalRecords } = useStore(videosStores.videos);
    const isFirst = useStore(videosStores.isFirst);
    const [visible, { definedPosition }] = useStore(createTrendingVideoModal.modal);
    const loading = useStore(videosStores.initialLoading);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const { closeModal } = createTrendingVideoModal;

    useEffect(() => {
        !isFirst && videosEvents.setIsFirstToTrue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TrendingsModalWrapper
                expanded
                background={grey29}
                visible={visible}
                width="100%"
                onClose={() => closeModal()}
                //onOk={() => closeModal()}
            >
                <VideosFilterLayout withoutFooter totalRecords={totalRecords}>
                    <Section marginBottom={filterMargin}>
                        <Title>{title}</Title>
                    </Section>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <Section justifyAround={isMobile} marginBottom="81px">
                            {items?.length ? (
                                items.map(item => (
                                    <CreateTrendingVideoCard
                                        key={item.id}
                                        {...item}
                                        definedPosition={definedPosition}
                                        //selectHandleClick={selectHandleClick}
                                    />
                                ))
                            ) : (
                                <Empty description={notFoundMessage} />
                            )}
                        </Section>
                    )}
                </VideosFilterLayout>
            </TrendingsModalWrapper>
        </>
    );
};
