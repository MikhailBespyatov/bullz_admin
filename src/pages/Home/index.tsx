import { Loader } from 'components/common/dynamic/Loader';
import { CatalogGrid } from 'componentsNewDesign/grid/CatalogGrid/styles';
import { VideoCard } from 'componentsNewDesign/layouts/cards/VideoCard';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { VideosFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { videosNotFoundMessage } from 'constants/notifications';
import { useStore } from 'effector-react';
import React from 'react';
import { videosStores } from 'stores/videos/videos';

export const Home = () => {
    const { totalRecords, items } = useStore(videosStores.videos);
    const loading = useStore(videosStores.initialLoading);

    return (
        <MainLayout>
            {/* <VideoHashtagsEditorModal /> */}
            <VideosFilterLayout totalRecords={totalRecords}>
                <CatalogContainer totalRecords={totalRecords}>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <CatalogGrid>
                            {items?.length ? (
                                items.map(item => <VideoCard key={item.id} {...item} />)
                            ) : (
                                <Empty title={videosNotFoundMessage} />
                            )}
                        </CatalogGrid>
                    )}
                </CatalogContainer>
            </VideosFilterLayout>
        </MainLayout>
    );
};
