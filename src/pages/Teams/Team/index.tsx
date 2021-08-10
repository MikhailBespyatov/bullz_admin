import { Loader } from 'components/common/dynamic/Loader';
import { TeamVideoCard } from 'componentsNewDesign/layouts/cards/TeamVideoCard';
import { TeamDescription } from 'componentsNewDesign/layouts/descriptionLayouts/TeamDescription';
import { TeamVideosFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/TeamVideosFilterLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { videosNotFoundMessage } from 'constants/notifications';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { notFoundMessage, teamVideosWrapperPadding } from 'pages/Teams/Team/constants';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { teamsEffects, teamsStores } from 'stores/team';
import { playlistEvents, playlistStores } from 'stores/videos/playlist';

interface ParamsProps {
    teamId: string;
}

export const Team = () => {
    const { teamId } = useParams<ParamsProps>();
    const item = useStore(teamsStores.item);
    const loading = useStore(teamsStores.loading);
    const { items, totalRecords } = useStore(playlistStores.items);
    const playlistLoading = useStore(playlistStores.initialLoading);

    useEffect(() => {
        teamsEffects.getItemById(teamId);
    }, [teamId]);

    useEffect(() => {
        if (teamId === item.id)
            playlistEvents.updateValues({
                byTeamId: teamId
            });
    }, [item, teamId]);

    return (
        <SingleMainLayout>
            {loading ? (
                <Section justifyCenter>
                    <Loader size="large" />
                </Section>
            ) : (
                <>
                    <Section marginBottom={filterMargin}>
                        {item?.id === teamId ? <TeamDescription {...item} /> : <Empty title={notFoundMessage} />}
                    </Section>

                    {item?.id === teamId && (
                        <ContentWrapper padding={teamVideosWrapperPadding}>
                            <TeamVideosFilterLayout totalRecords={totalRecords}>
                                {playlistLoading ? (
                                    <Section justifyCenter>
                                        <Loader size="large" />
                                    </Section>
                                ) : (
                                    <Section>
                                        {items?.length ? (
                                            items.map(item => <TeamVideoCard key={item.id} {...item} />)
                                        ) : (
                                            <Empty title={videosNotFoundMessage} />
                                        )}
                                    </Section>
                                )}
                            </TeamVideosFilterLayout>
                        </ContentWrapper>
                    )}
                </>
            )}
        </SingleMainLayout>
    );
};
