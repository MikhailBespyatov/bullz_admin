import { Loader } from 'components/common/dynamic/Loader';
import { CreateTrendingTagModal } from 'components/modals/formModals/CreateTrendingTagModal';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { TrendingUserCard } from 'componentsNewDesign/layouts/cards/TrendingUserCard';
import { TrendingVideoCard } from 'componentsNewDesign/layouts/cards/TrendingVideoCard';
import { CatalogContainer } from 'componentsNewDesign/layouts/containers/CatalogContainer';
import { TrendingContainer } from 'componentsNewDesign/layouts/containers/TrendingContainer';
import { DraggableItems, DraggableTrendingVideos } from 'componentsNewDesign/layouts/DraggableLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { AsyncDeleteTrendingModal } from 'componentsNewDesign/modals/AsyncDeleteTrendingModal';
import { CreateTrendingUserFilterModal } from 'componentsNewDesign/modals/filterModals/CreateTrendingUserFilterModal';
import { CreateTrendingVideoFilterModal } from 'componentsNewDesign/modals/filterModals/CreateTrendingVideoFilterModal';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { trendingVideoLimit } from 'constants/defaults/trendings';
import { black, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { trendingFeaturesHeight } from 'pages/Trendings/constants';
import React, { FC, useEffect, useState } from 'react';
import {
    createTrendingVideoModal,
    createUserTrendingModal,
    removeTrendingModal,
    subjectType
} from 'stores/initialize/initialize.modal.store';
import { trendingsEffects, trendingsStores } from 'stores/trendings';
import { Disabled } from 'types/form';
import { NoopClick } from 'types/global';

interface ButtonProps extends Disabled, NoopClick {}

const TrendingButton: FC<ButtonProps> = ({ children, onClick, disabled }) => (
    <SimpleButton
        background={black}
        color={white}
        disabled={disabled}
        fontSize="10px"
        height={trendingFeaturesHeight}
        lineHeight="12px"
        onClick={onClick}
    >
        {children}
    </SimpleButton>
);

const { getTags, getVideos, getUsers, swapAndUpdateVideos, swapAndUpdateTags, swapAndUpdateUsers } = trendingsEffects;

const onTagsDragEnded = (i: number, j: number) => swapAndUpdateTags({ i, j });
const onUsersDragEnded = (i: number, j: number) => swapAndUpdateUsers({ i, j });
const onVideosDragEnded = (i: number, j: number) => swapAndUpdateVideos({ i, j });

export const Trendings = () => {
    const [loadingTags, tags] = useStore(trendingsStores.tagsStore);
    const [loadingVideos, videos] = useStore(trendingsStores.videosStore);
    const [loadingUsers, users] = useStore(trendingsStores.usersStore);

    const [newTag, setNewTag] = useState('');

    const onTagChange = (value: string) => setNewTag(value);
    const onAddTag = () => {
        trendingsEffects.createItem({ text: newTag });
        setNewTag('');
    };

    const onRemove = (subject: subjectType, subjectName: string, id: string) =>
        removeTrendingModal.openModal({
            subject,
            subjectName,
            id
        });

    useEffect(() => {
        getTags();
        getVideos();
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainLayout>
            <CreateTrendingTagModal />
            <CreateTrendingUserFilterModal />
            <CreateTrendingVideoFilterModal />
            <AsyncDeleteTrendingModal />
            <CatalogContainer>
                {/* <Section>
                <Title>TAGS</Title>
            </Section>
            <Section>
                <InfoTitle title={infoTitle}>
                    {tags?.totalRecords && tags?.totalRecords !== -1 ? tags?.totalRecords : 0}
                </InfoTitle>
            </Section> */}
                <TrendingContainer
                    features={
                        <>
                            <MarginWrapper marginRight="8px">
                                <StyledTextInput
                                    disableEnterKeyDown
                                    defaultValue={newTag}
                                    height={trendingFeaturesHeight}
                                    width="295px"
                                    onChange={onTagChange}
                                />
                            </MarginWrapper>
                            <TrendingButton disabled={!newTag} onClick={onAddTag}>
                                Add tag
                            </TrendingButton>
                        </>
                    }
                    title="Tags"
                    totalRecords={tags?.totalRecords}
                >
                    {loadingTags ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <>
                            <Section>
                                {!!tags?.items?.length && (
                                    <DraggableItems
                                        items={tags.items.map(({ id = '', tag }) => (
                                            <RemovableHashtag
                                                key={id}
                                                subject={tag || ''}
                                                onRemove={() => onRemove('tag', tag || '', id)}
                                            />
                                        ))}
                                        onDragEnded={onTagsDragEnded}
                                    />
                                )}
                                {/* {(tags?.items?.length || 0) < trendingsLimit && (
                                    <AddableTag onClick={() => createTagTrendingModal.openModal()}>add tag</AddableTag>
                                )} */}
                            </Section>
                        </>
                    )}
                </TrendingContainer>
                {/* <Section>
                <Title>USERS</Title>
            </Section>
            <Section>
                <InfoTitle title={infoTitle}>
                    {users?.totalRecords && users?.totalRecords !== -1 ? users?.totalRecords : 0}
                </InfoTitle>
            </Section> */}
                <TrendingContainer
                    features={
                        <TrendingButton
                            disabled={(users?.items?.length || 0) >= 15}
                            onClick={() => createUserTrendingModal.openModal()}
                        >
                            Add user
                        </TrendingButton>
                    }
                    title="Users"
                    totalRecords={users?.totalRecords}
                >
                    {loadingUsers ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <>
                            <Section>
                                {!!users?.items?.length && (
                                    <DraggableItems
                                        items={users.items.map(({ id = '', user }) => (
                                            <TrendingUserCard
                                                key={id}
                                                {...user}
                                                onRemove={() => onRemove('user', user?.username || '', id)}
                                            />
                                        ))}
                                        onDragEnded={onUsersDragEnded}
                                    />
                                )}
                                {/* {(users?.items?.length || 0) < 15 && (
                                    <AddTrendingButton
                                        height="135px"
                                        onClick={() => createUserTrendingModal.openModal()}
                                    />
                                )} */}
                            </Section>
                        </>
                    )}
                </TrendingContainer>
                {/* <Section>
                <Title>VIDEOS</Title>
            </Section>
            <Section>
                <InfoTitle title={infoTitle}>
                    {videos?.totalRecords && videos?.totalRecords !== -1 ? videos?.totalRecords : 0}
                </InfoTitle>
            </Section>
            <Section> */}
                <TrendingContainer
                    features={
                        <TrendingButton
                            disabled={(videos?.items?.length || 0) >= trendingVideoLimit}
                            onClick={() => createTrendingVideoModal.openModal({})}
                        >
                            Add video
                        </TrendingButton>
                    }
                    title="Videos"
                    totalRecords={videos?.totalRecords}
                >
                    {!!videos?.items?.length && (
                        <DraggableTrendingVideos
                            items={videos.items.map(({ id = '', video, position = 0 }) => {
                                console.log(position, 'position');
                                return {
                                    item: (
                                        <TrendingVideoCard
                                            key={id}
                                            position={position}
                                            {...video}
                                            onRemove={() => onRemove('video', (position + 1).toString(), id)}
                                        />
                                    ),
                                    position
                                };
                            })}
                            loading={loadingVideos}
                            onDragEnded={onVideosDragEnded}
                        />
                    )}
                    {/* {(videos?.items?.length || 0) < trendingVideoLimit && (
                        <AddTrendingButton onClick={() => createTrendingVideoModal.openModal({})} />
                    )} */}
                </TrendingContainer>
                {/* </Section> */}
            </CatalogContainer>
        </MainLayout>
    );
};
