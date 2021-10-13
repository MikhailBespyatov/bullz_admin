import { Loader } from 'components/common/dynamic/Loader';
import { StatisticsTable } from 'components/common/tables/StatisticsTable';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { DropdownColumn, DropdownSection } from 'componentsNewDesign/common/dropdowns/SectionDropdown';
import { UserDescription, UserVideos } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription';
import { VideoCardFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/VideoCardFilterLayout';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { defaultUserVideosValuesWithoutDate, Roles } from 'constants/defaults/users';
import { filterMargin, padding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Users/User/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { statisticsEvents, statisticsStores } from 'stores/statistics/statistics';
import { userStores } from 'stores/users/user';
import { usersEffects, usersStores } from 'stores/users/users';
import { userVideosEffects, userVideosEvents, userVideosStores } from 'stores/users/userVideos';
//import { videosEvents } from 'stores/videos/videos';

//const { updateValues, setIsFirstToTrue } = videosEvents;
const { updateValues, setIsFirstToTrue } = userVideosEvents;

interface ParamsProps {
    userId: string;
}

export const User = () => {
    const { userId } = useParams<ParamsProps>();
    const user = useStore(usersStores.user);
    const loading = useStore(usersStores.loading);
    const [checked, setChecked] = useState(false);

    // const videos = useStore(videosStores.videos);
    // const videosLoading = useStore(videosEffects.loadItems.pending);
    const userVideos = useStore(userVideosStores.userVideos);
    const userVideosLoading = useStore(userVideosStores.initialLoading);

    const loadingStatistics = useStore(statisticsStores.initialLoading);
    const { items: itemsStatistics, totalRecords: totalRecordsStatistics } = useStore(statisticsStores.statistics);
    const { pageIndex: statisticsPageIndex, limit: statisticsLimit } = useStore(statisticsStores.values);
    const { access } = useStore(userStores.auth);

    const userVideosTitle = userVideosLoading ? `User's Videos` : `User's Videos (${userVideos.totalRecords || 0})`;

    const onStatisticsCurrentPageChange = (page: number, pageSize: number | undefined) =>
        statisticsEvents.updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        usersEffects.loadSingleItemById(userId);
        updateValues({
            ...defaultUserVideosValuesWithoutDate,
            creatorId: userId
        });
        setIsFirstToTrue();
        access < Roles.ContentManager &&
            statisticsEvents.overrideValues({
                userId: userId
            });
    }, [userId, access]);

    useEffect(() => {
        if (checked) {
            userVideosEffects.loadItems({
                creatorId: userId,
                limit: 20,
                pageIndex: 0,
                returnQueryCount: true
            });
        } else {
            userVideosEffects.loadItems({
                creatorId: userId,
                hasHlsStream: true,
                isDeleted: false,
                isReported: false,
                limit: 20,
                pageIndex: 0,
                returnQueryCount: true
            });
        }
    }, [userId, checked]);

    const onChangeCheckbox = () => {
        setChecked(!checked);
    };

    return (
        <SingleMainLayout>
            {loading ? (
                <Section justifyCenter>
                    <Loader size="large" />
                </Section>
            ) : (
                <>
                    <Section marginBottom={filterMargin}>
                        {user?.id ? (
                            <>
                                <Column marginRight={padding}>
                                    <UserDescription {...user} />
                                </Column>
                            </>
                        ) : (
                            <Empty title={notFoundMessage} />
                        )}
                    </Section>
                    <Section marginBottom="8px">
                        <AdministratorLayout>
                            <DropdownColumn>
                                <DropdownSection title="User statistics">
                                    {loadingStatistics ? (
                                        <Section justifyCenter>
                                            <Loader size="large" />
                                        </Section>
                                    ) : (
                                        <>
                                            <Section marginBottom="20px">
                                                <StatisticsTable items={itemsStatistics} removeItem="userId" />
                                            </Section>
                                            <Pagination
                                                currentIndex={statisticsPageIndex + 1}
                                                defaultSize={statisticsLimit}
                                                totalItems={totalRecordsStatistics}
                                                onSizeChange={onStatisticsCurrentPageChange}
                                            />
                                        </>
                                    )}
                                </DropdownSection>
                            </DropdownColumn>
                        </AdministratorLayout>
                    </Section>
                    <DropdownColumn>
                        <DropdownSection title={userVideosTitle}>
                            {loading || userVideosLoading ? (
                                <Section justifyCenter marginBottom="20px">
                                    <Loader size="large" />
                                </Section>
                            ) : (
                                <VideoCardFilterLayout
                                    checkboxShowAll
                                    defaultChecked={checked}
                                    totalRecords={userVideos.totalRecords}
                                    onChangeCheckbox={onChangeCheckbox}
                                >
                                    <UserVideos videos={userVideos?.items || undefined} />
                                </VideoCardFilterLayout>
                            )}
                        </DropdownSection>
                    </DropdownColumn>
                </>
            )}
        </SingleMainLayout>
    );
};
