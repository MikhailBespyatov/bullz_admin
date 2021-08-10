import { Loader } from 'components/common/dynamic/Loader';
import { CommentsDescription } from 'components/common/tables/CommentDescription';
import { H2 } from 'components/common/typography/titles/H';
import { Section } from 'components/grid/Section';
import { MainLayout } from 'components/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { useStoreMap } from 'effector-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { commentsEvents, commentsStores } from 'stores/comments/comments';
import { notFoundMessage, title } from './constants';

interface ParamsProps {
    commentId: string;
}

export const Comment = () => {
    const { commentId } = useParams<ParamsProps>();

    const [loading, comment] = useStoreMap({
        store: commentsStores.commentsStore,
        keys: [commentId],
        fn: (state, [commentId]) => {
            const [loading, store] = state;
            if (store?.items) {
                const comment = store.items.find(({ id }) => id === commentId);
                return [loading, comment];
            } else return [loading, {}];
        }
    });

    useEffect(() => {
        commentsEvents.invokeGetComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainLayout>
            <Section>
                <H2>
                    {title}&nbsp;<small>({comment?.username || '...'})</small>
                </H2>
            </Section>
            {loading ? (
                <Section justifyCenter>
                    <Loader size="large" />
                </Section>
            ) : (
                <Section removeMarginRight>
                    {comment?.id ? (
                        <>
                            <Column>
                                <CommentsDescription {...comment} />
                            </Column>
                        </>
                    ) : (
                        <Empty title={notFoundMessage} />
                    )}
                </Section>
            )}
            {/*<Footer>*/}
            {/*    <Pagination current={current + 1} total={videos.totalRecords} onChange={onCurrentPageChange} />*/}
            {/*</Footer>*/}
        </MainLayout>
    );
};
