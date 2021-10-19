import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { CommentCard, CommentCardProps } from 'componentsNewDesign/layouts/cards/CommentCard';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { defaultVideoCommentRepliesValues } from 'constants/defaults/comments';
import { useStore } from 'effector-react';
import { useToggle } from 'hooks/toggle';
import React, { useEffect, useState } from 'react';
import {
    clearVideoCommentReplies,
    commentPaginationState,
    loadVideoCommentReplies,
    updateCommentPaginationState,
    videoCommentsEvents
} from 'stores/comments/videoComments';

const { updateCommentRepliesValues } = videoCommentsEvents;

const { limit: defaultLimit, pageIndex: defaultPageIndex } = defaultVideoCommentRepliesValues;

export interface ThreadCommentsProps
    extends Pick<BULLZ.GetPostResponse, 'profileImageUrl' | 'username' | 'body' | 'utcCreated' | 'utcUpdated'> {
    userId?: string;
    isBlocked?: boolean;
}

export interface CommentBlockProps extends BULLZ.GetPostResponse, CommentCardProps {
    body?: string | null;
    threadComments?: ThreadCommentsProps[];
    //onBlockButtonClick: noop;
}

export const CommentBlock = ({
    body,
    repliesCount = 0,
    profileImageUrl,
    username,
    userId,
    utcCreated,
    utcUpdated,
    isBlocked = false,
    parentId,
    threadComments
}: //...commentCardProps
CommentBlockProps) => {
    //const { threadComments } = commentCardProps;
    const paginationUpdated = useStore(commentPaginationState);
    const repliesLoadingIsPending = useStore(loadVideoCommentReplies.pending);
    const [repliesPageCount, setRepliesPageCount] = useState(defaultPageIndex);
    const [repliesIsShown, toggleRepliesIsShown] = useToggle(false);

    const toggleRepliesTread = () => {
        toggleRepliesIsShown();

        if (!repliesIsShown) {
            updateCommentRepliesValues({
                postId: parentId,
                pageIndex: repliesPageCount,
                limit: defaultLimit
            });

            setRepliesPageCount(state => ++state);
        } else {
            // setDefaultCommentRepliesValues();
            setRepliesPageCount(defaultPageIndex);
            //console.log(parentId, 'parentId');
            parentId && clearVideoCommentReplies(parentId);
        }
    };

    const onLoadMoreClick = async () => {
        await updateCommentRepliesValues({
            postId: parentId,
            pageIndex: repliesPageCount,
            limit: defaultLimit
        });

        //console.log('clicked load more');
    };

    useEffect(() => {
        if (repliesIsShown) {
            toggleRepliesIsShown();
            setRepliesPageCount(defaultPageIndex);
            updateCommentPaginationState();
            //console.log('pagination updated+ hide replies');
        }
        // console.log('paginationUpdated', paginationUpdated);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationUpdated]);

    return (
        <ContentWrapper>
            <CommentCard
                // {...commentCardProps}
                body={body}
                isBlocked={isBlocked}
                profileImageUrl={profileImageUrl}
                repliesCount={repliesCount}
                repliesIsLoading={repliesLoadingIsPending}
                repliesIsShown={repliesIsShown}
                toggleRepliesTread={toggleRepliesTread}
                userId={userId}
                username={username}
                utcCreated={utcCreated}
                utcUpdated={utcUpdated}
                //onBlockButtonClick={onBlockButtonClick}
            />

            {repliesIsShown &&
                threadComments?.map(comment => (
                    <CommentCard
                        {...comment}
                        key={comment.body || undefined}
                        isThreadComment
                        body={comment.body}
                        isBlocked={comment.isBlocked}
                        profileImageUrl={comment.profileImageUrl}
                        userId={comment.userId}
                        username={comment.username}
                        utcCreated={comment.utcCreated}
                        utcUpdated={comment.utcUpdated}
                        //onBlockButtonClick={onBlockButtonClick}
                    />
                ))}

            {repliesIsShown && repliesCount > (threadComments !== undefined && threadComments.length) && (
                <SimpleButton
                    background="rgba(0,0,0, 0.05)"
                    margin="10px 50px 5px"
                    padding="0px 20px"
                    onClick={onLoadMoreClick}
                >
                    Load more
                </SimpleButton>
            )}
        </ContentWrapper>
    );
};
