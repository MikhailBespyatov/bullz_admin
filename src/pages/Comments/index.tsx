import { Loader } from 'components/common/dynamic/Loader';
import { Section } from 'components/grid/Section';
import { CommentCard } from 'components/layouts/cards/comments/CommentCard';
import { CommentsFilterLayout } from 'components/layouts/filterLayouts/CommentsFilterLayout';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { useStore } from 'effector-react';
import React from 'react';
import { commentsStores } from 'stores/comments/comments';
import { commentsNotFoundMessage } from './constants';

export const Comments = () => {
    const [loading, { totalRecords, items }] = useStore(commentsStores.commentsStore);
    // console.log(items);

    return (
        <MainLayout>
            <CommentsFilterLayout totalRecords={totalRecords}>
                {loading ? (
                    <Section justifyCenter>
                        <Loader size="large" />
                    </Section>
                ) : (
                    <Section removeMarginRight>
                        {items?.length ? (
                            items.map(item => <CommentCard key={item.id} {...item} />)
                        ) : (
                            <Empty title={commentsNotFoundMessage} />
                        )}
                    </Section>
                )}
            </CommentsFilterLayout>
        </MainLayout>
    );
};
