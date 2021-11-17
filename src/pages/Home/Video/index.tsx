import { VideoStatisticsChartMemo } from 'components/common/charts/VideoStatisticsChart';
import { Loader } from 'components/common/dynamic/Loader';
import { StatisticsTable } from 'components/common/tables/StatisticsTable';
import { ProductVideosFilterLayout } from 'components/layouts/filterLayouts/ProductVideosFilterLayout';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { VideoCardButton } from 'componentsNewDesign/common/buttons/VideoCardButton';
import { DropdownColumn, DropdownSection } from 'componentsNewDesign/common/dropdowns/SectionDropdown';
import {
    buttonsBorderRadius,
    buttonsFontSize,
    buttonsFontWeight
} from 'componentsNewDesign/common/tables/AffiliateLinksTable/constants';
import { Footer } from 'componentsNewDesign/grid/Footer';
import { TopBar } from 'componentsNewDesign/grid/TopBar';
import { parseDeleteProductSuccessMessage } from 'componentsNewDesign/layouts/cards/ProductCard/constants';
import { VideoCard } from 'componentsNewDesign/layouts/cards/VideoCard';
import {
    deleteTitle,
    parseDeleteModalContent,
    parseDeleteSuccessMessage
} from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { ProductDescription } from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription';
import { UserDescription, UserVideos } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription';
import {
    VideoDescription,
    VideoEngagementBlock
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription';
import {
    buttonsPadding,
    curateButtonWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import { WOMVideoDescription } from 'componentsNewDesign/layouts/descriptionLayouts/WomVideoDescription';
import { VideoCardFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/VideoCardFilterLayout';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { CreatePrimaryProductFilterModal } from 'componentsNewDesign/modals/filterModals/CreatePrimaryProductFilterModal';
import { CuratePopoverLayout } from 'componentsNewDesign/modals/popovers/CuratePopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { Roles } from 'constants/defaults/users';
import { defaultVideosValuesWithoutDate } from 'constants/defaults/videos';
import { asyncError, videosNotFoundMessage } from 'constants/notifications';
import { black, errorColor, grey29, hoverGrey2, white } from 'constants/styles/colors';
import { descriptionPadding, filterMargin } from 'constants/styles/sizes';
import { addDays } from 'date-fns';
import { useStore } from 'effector-react';
import {
    administratorsTabs,
    curatorTabs,
    deleteButtonText,
    InfoTabs,
    notFoundMessage,
    otherTabs,
    productNotFoundMessage,
    userNotFoundMessage
} from 'pages/Home/Video/constants';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { API } from 'services';
import { message } from 'stores/alerts';
import { createDescriptionVideoCardModal } from 'stores/initialize/initialize.modal.store';
import { modalEvents } from 'stores/modals/asyncModal';
import { affiliateLinksEffects, affiliateLinksStores } from 'stores/products/affiliateLinks';
import { productsEffects, productsEvents, productsStores } from 'stores/products/products';
import { statisticsEvents, statisticsStores } from 'stores/statistics/statistics';
import { userStores } from 'stores/users/user';
import { usersEffects, usersStores } from 'stores/users/users';
import { userVideosEffects, userVideosEvents, userVideosStores } from 'stores/users/userVideos';
import { productVideosEvents, productVideosStores } from 'stores/videos/productVideos';
import { videosEffects, videosStores } from 'stores/videos/videos';
import { SubjectType } from 'types/types';
import { AdministratorLayout, ManagerLayout } from '../../../components/layouts/RolesLayouts';
import { UserInfoWrapper } from './styles';

interface ParamsProps {
    videoId: string;
}

// interface Props extends BULLZ.YeayValidationInfo, BULLZ.AdminGetVideoResponse {}

// const Product = ({ id }: Props) => {
//     const product = useStore(productsStores.product);
//     const primaryProductLoading = useStore(productsStores.loading);

//     useEffect(() => {
//         id && productsEffects.loadSingleItemById(id);
//     }, [id]);

//     return (
//         <>
//             {primaryProductLoading ? (
//                 <Loader size="large" />
//             ) : !id || id === absentPrimaryTemplate ? (
//                 <Empty title="Video has no primary product" />
//             ) : (
//                 <ProductDescription {...product} />
//             )}
//         </>
//     );
// };

const { updateAsyncModalLoading, openAsyncModal, closeAsyncModal } = modalEvents;

export const Video = () => {
    const { videoId } = useParams<ParamsProps>();
    const video = useStore(videosStores.video);
    // const videos = useStore(videosStores.videos);
    //const userVideosLoading = useStore(videosStores.initialLoading);
    const userVideos = useStore(userVideosStores.userVideos);
    //console.log(userVideos);
    const userVideosLoading = useStore(userVideosEffects.loadItems.pending);

    const user = useStore(usersStores.user);
    const product = useStore(productsStores.product);
    const affiliateLinks = useStore(affiliateLinksStores.items);
    const { items, totalRecords } = useStore(productVideosStores.items);
    const loading = useStore(videosStores.loading);

    const primaryProductLoading = useStore(productsStores.loading);
    const userLoading = useStore(usersStores.loading);
    // const linksLoading = useStore(affiliateLinksStores.loading);
    const productVideosLoading = useStore(productVideosStores.initialLoading);
    const { pathname } = useLocation();
    const { items: itemsStatistics, totalRecords: totalRecordsStatistics } = useStore(statisticsStores.statistics);
    const [filteredItemsStatistics, setFilteredItemsStatistics] = useState(itemsStatistics);
    const loadingStatistics = useStore(statisticsStores.initialLoading);
    const { pageIndex: statisticsPageIndex, limit: statisticsLimit, videoId: statisticsVideoId } = useStore(
        statisticsStores.values
    );
    const { womContentId } = useStore(videosStores.videoWOMData);
    const { womContentId: storedWomContentId } = useStore(videosStores.validationState);

    const { access } = useStore(userStores.auth);
    const tabs =
        access < Roles.ContentManager ? administratorsTabs : access === Roles.Curator ? curatorTabs : otherTabs;

    const [tab, setTab] = useState(tabs[0]);

    const isVideoTab = tab === tabs[0];
    const isTabs = (infoTab: InfoTabs) => tab === tabs[infoTab];

    const curationState = video.validation?.yeay?.curationState;

    const deleteOkProductHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await API.manageProducts.deleteProductById({
                id: subject.toString()
            });
            updateAsyncModalLoading();

            modalEvents.closeAsyncModal();
            message.success(parseDeleteProductSuccessMessage(product.name || ''));
            productsEvents.deleteItemById(subject.toString());
        } catch {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
            message.error(asyncError);
        }
    };

    const deleteProductHandler = () =>
        openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContent(product.name || ''),
            subject: product.id || '',
            onOk: deleteOkProductHandler
        });

    const deleteOkVideoHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await videosEffects.removeItemById(subject.toString());
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success(parseDeleteSuccessMessage(videoId));
        } catch {
            updateAsyncModalLoading();
            closeAsyncModal();
        }
    };

    const deleteVideoHandler = async () => {
        openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContent(videoId),
            subject: videoId,
            onOk: deleteOkVideoHandler
        });
        try {
            updateAsyncModalLoading();
            await videosEffects.loadEditInfoItemById(videoId);
            updateAsyncModalLoading();
        } catch (error) {
            updateAsyncModalLoading();
            closeAsyncModal();
        }
    };

    const onStatisticsCurrentPageChange = (page: number, pageSize: number | undefined) =>
        statisticsEvents.updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        videosEffects.loadSingleItemById(videoId);
        videosEffects.getWOMVideoDataById(videoId);
    }, [videoId]);

    useEffect(() => {
        video?.primaryProductId && productsEffects.loadSingleItemById(video.primaryProductId);
    }, [video]);

    useEffect(() => {
        const { ownerId } = video;
        // const { id } = user;
        if (isTabs(InfoTabs.User) && ownerId) {
            usersEffects.loadSingleItemById(ownerId);
            userVideosEvents.updateValues({
                ...defaultVideosValuesWithoutDate,
                creatorId: ownerId
            });
        }
        if (isTabs(InfoTabs.Statistics) && videoId !== statisticsVideoId) {
            if (video.utcUploaded) {
                statisticsEvents.overrideValues({
                    videoId: videoId,
                    utcStart: video.utcUploaded,
                    utcEnd: addDays(new Date(video.utcUploaded), 60).toISOString(),
                    isUserDisabled: user.isDisabled,
                    isVideoDeleted: video.isDeleted
                });
            } else {
                statisticsEvents.overrideValues({
                    videoId: videoId,
                    isUserDisabled: user.isDisabled,
                    isVideoDeleted: video.isDeleted
                });
            }
        }

        if (isTabs(InfoTabs.WomVideo) && videoId === video.id) {
            videosEffects.getVideoDetailsByIds({ videoId });
            storedWomContentId !== womContentId &&
                videosEffects.getValidationStateByContentIds({ contentId: womContentId });

            // console.log('womContentId', womContentId);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);

    useEffect(() => {
        const id = product.id || '';
        if (id === video?.primaryProductId) {
            productsEffects.loadSingleItemById(id);
            productVideosEvents.updateValues({
                productId: id
            });
            affiliateLinksEffects.getItemsByProductId(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.id, video?.primaryProductId]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setTab(tabs[0]), [pathname]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setFilteredItemsStatistics(itemsStatistics), [itemsStatistics]);

    const onStatisticsFilter = (filteredUserId: string) => {
        const filteredItems = itemsStatistics ? itemsStatistics.filter(({ userId }) => userId === filteredUserId) : [];

        setFilteredItemsStatistics(filteredItems.length > 0 ? filteredItems : itemsStatistics);
    };

    return (
        <>
            <CreatePrimaryProductFilterModal />
            <SingleMainLayout>
                <Section alignCenter justifyBetween>
                    <Row>
                        <TopBar content={tabs} defaultActiveItem={tab} onChange={setTab} />
                    </Row>
                    <Row marginRight="22px">
                        {!isTabs(InfoTabs.User) && !isTabs(InfoTabs.Statistics) && !isTabs(InfoTabs.WomVideo) && (
                            <ManagerLayout>
                                <SimpleButton
                                    background={black}
                                    backgroundHover={hoverGrey2}
                                    borderRadius={buttonsBorderRadius}
                                    color={white}
                                    fontSize={buttonsFontSize}
                                    fontWeight={buttonsFontWeight}
                                    marginRight={descriptionPadding}
                                    padding={buttonsPadding}
                                    onClick={() => createDescriptionVideoCardModal.openModal()}
                                >
                                    Change primary product
                                </SimpleButton>
                            </ManagerLayout>
                        )}
                        {!isTabs(InfoTabs.User) && !isTabs(InfoTabs.Statistics) && !isTabs(InfoTabs.WomVideo) && (
                            <AdministratorLayout>
                                <SimpleButton
                                    background={errorColor}
                                    backgroundHover={hoverGrey2}
                                    borderRadius={buttonsBorderRadius}
                                    color={white}
                                    fontSize={buttonsFontSize}
                                    fontWeight={buttonsFontWeight}
                                    marginRight={descriptionPadding}
                                    padding={buttonsPadding}
                                    onClick={isVideoTab ? deleteVideoHandler : deleteProductHandler}
                                >
                                    {deleteButtonText(isVideoTab)}
                                </SimpleButton>
                            </AdministratorLayout>
                        )}
                        <CuratePopoverLayout disabled={curationState !== 1} id={videoId} type="down">
                            <VideoCardButton
                                backgroundColor={black}
                                backgroundHover={hoverGrey2}
                                borderRadius={buttonsBorderRadius}
                                color={white}
                                disabled={curationState !== 1}
                                fontSize={buttonsFontSize}
                                fontWeight={buttonsFontWeight}
                                padding={buttonsPadding}
                                width={curateButtonWidth}
                            >
                                Curate
                            </VideoCardButton>
                        </CuratePopoverLayout>
                    </Row>
                </Section>
                {loading ? (
                    <Section justifyCenter>
                        <Loader size="large" />
                    </Section>
                ) : isTabs(InfoTabs.Video) ? (
                    videoId === video.id ? (
                        <VideoDescription {...video} />
                    ) : (
                        <Empty title={notFoundMessage} />
                    )
                ) : isTabs(InfoTabs.Product) ? (
                    primaryProductLoading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : video?.primaryProductId === product.id ? (
                        <Column marginRight={filterMargin} width="100%">
                            <ProductDescription {...product} {...affiliateLinks.defaultEntry} />
                            {/* * wrapper for dropdown sections (first-child) */}
                            <DropdownColumn>
                                {/* <DropdownSection title="Affiliate links">
                                    {linksLoading ? (
                                        <Section justifyCenter>
                                            <Loader size="large" />
                                        </Section>
                                    ) : (
                                        <OverflowAutoLayout>
                                            <AffiliateLinksTable
                                                {...affiliateLinks}
                                                empty={product.id !== affiliateLinks.productId}
                                            />
                                        </OverflowAutoLayout>
                                    )}
                                </DropdownSection> */}
                                <DropdownSection title="Topic Videos">
                                    <ProductVideosFilterLayout totalRecords={totalRecords}>
                                        {productVideosLoading ? (
                                            <Section justifyCenter>
                                                <Loader size="large" />
                                            </Section>
                                        ) : (
                                            <>
                                                <Section>
                                                    {items?.length ? (
                                                        items.map(item => <VideoCard key={item.id} {...item} />)
                                                    ) : (
                                                        <Empty title={videosNotFoundMessage} />
                                                    )}
                                                </Section>
                                            </>
                                        )}
                                    </ProductVideosFilterLayout>
                                </DropdownSection>
                            </DropdownColumn>
                        </Column>
                    ) : (
                        <Empty title={productNotFoundMessage} />
                    )
                ) : isTabs(InfoTabs.User) ? (
                    userLoading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : user.id && video.ownerId === user.id ? (
                        <UserInfoWrapper>
                            <UserDescription {...user} />
                            <Section marginTop="20px">
                                <DropdownColumn>
                                    <DropdownSection title={`User's Videos (${userVideos.totalRecords || 0})`}>
                                        {userVideosLoading ? (
                                            <Section justifyCenter marginBottom="20px">
                                                <Loader size="large" />
                                            </Section>
                                        ) : (
                                            <VideoCardFilterLayout totalRecords={userVideos.totalRecords}>
                                                <UserVideos videos={userVideos?.items || undefined} />
                                            </VideoCardFilterLayout>
                                        )}
                                    </DropdownSection>
                                </DropdownColumn>
                            </Section>
                        </UserInfoWrapper>
                    ) : (
                        <Empty title={userNotFoundMessage} />
                    )
                ) : isTabs(InfoTabs.Statistics) ? (
                    loadingStatistics ? (
                        <ContentWrapper marginRight={filterMargin} minHeight="300px" padding="20px">
                            <Section justifyCenter>
                                <Loader size="large" />
                            </Section>
                        </ContentWrapper>
                    ) : (
                        <ContentWrapper
                            backgroundColor={grey29}
                            marginRight={filterMargin}
                            minHeight="300px"
                            padding="20px"
                        >
                            <Section marginBottom="20px">
                                <VideoEngagementBlock
                                    engagementStatistics={video.engagementStatistics}
                                    title="Engagements BULLZ"
                                    width="300px"
                                />
                            </Section>
                            <VideoStatisticsChartMemo items={itemsStatistics} onFilter={onStatisticsFilter} />
                            <StatisticsTable items={filteredItemsStatistics} removeItem="videoId" />
                            <Footer>
                                <Pagination
                                    currentIndex={statisticsPageIndex + 1}
                                    defaultSize={statisticsLimit}
                                    totalItems={totalRecordsStatistics}
                                    onSizeChange={onStatisticsCurrentPageChange}
                                />
                            </Footer>
                        </ContentWrapper>
                    )
                ) : isTabs(InfoTabs.WomVideo) ? (
                    userLoading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : videoId === video.id ? (
                        <WOMVideoDescription {...video} />
                    ) : (
                        <Empty title={userNotFoundMessage} />
                    )
                ) : (
                    <Empty title={notFoundMessage} />
                )}
            </SingleMainLayout>
        </>
    );
};
