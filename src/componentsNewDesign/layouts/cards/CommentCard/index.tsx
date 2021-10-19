import blockIconBlack from 'assets/block_icon_black.svg';
import blockIconRed from 'assets/block_icon_red.svg';
import noImageIcon from 'assets/no_product_icon.svg';
import {
    avatarDiameter,
    commentMargin,
    usernamePadding
} from 'componentsNewDesign/layouts/cards/CommentCard/constants';
import {
    BlockButtonSpan,
    BlockIconBlack,
    BlockIconRed,
    Button,
    CommentCardWrapper,
    CommentSpan,
    ShowHideRepliesButton,
    StyledSection,
    StyledSectionProps,
    SupplementarySpan,
    UserNameSpan
} from 'componentsNewDesign/layouts/cards/CommentCard/styles';
import { differenceFromCurrentDate } from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { Column, FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { usersLink } from 'constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';
//import { blockVideoCommentsForUser } from 'stores/comments/videoComments';
import { noop } from 'types/types';

export interface CommentCardProps extends BULLZ.GetPostResponse, StyledSectionProps {
    // profileImageUrl?: string;
    repliesQuantity?: number;
    isBlocked?: boolean;
    toggleRepliesTread?: noop;
    repliesIsShown?: boolean;
    repliesIsLoading?: boolean;
    //onBlockButtonClick: (blockedUserId: string, isBlock: boolean) => void;
}

export interface BlockButtonProps {
    buttonText?: 'Unblock' | 'Block';
    isBlocked?: boolean;
    className?: string;
    onClick: noop;
}

export const BlockButton = ({ buttonText, isBlocked, onClick }: BlockButtonProps) => (
    <Button isBlocked={isBlocked} onClick={onClick}>
        <BlockIconBlack src={blockIconBlack} />
        <BlockIconRed src={blockIconRed} />

        <MarginWrapper marginLeft="3px">
            <BlockButtonSpan>{buttonText}</BlockButtonSpan>
        </MarginWrapper>
    </Button>
);

export const CommentCard = ({
    repliesCount,
    repliesIsLoading,
    profileImageUrl,
    username,
    userId = '',
    body,
    repliesIsShown = false,
    toggleRepliesTread,
    isThreadComment,
    utcCreated,
    utcUpdated,
    isBlocked = false
}: //onBlockButtonClick
CommentCardProps) => {
    // const [commentIsBlocked, setCommentIsBlocked] = useToggle(isBlocked);
    //const commentCreationDate = `${getFormattedDate(utcCreated)}`;
    //const commentUpdateDate = `${getFormattedDate(utcUpdated)}`;

    const utcDate = utcUpdated || utcCreated || '';
    const commentDate = utcDate && differenceFromCurrentDate(utcDate);

    const repliesText = repliesIsShown ? 'Hide replies' : `View replies (${repliesCount})`;

    // const buttonText = commentIsBlocked ? 'Unblock' : 'Block';
    // const onButtonClick = () => {
    //     setCommentIsBlocked();
    //     blockVideoCommentsForUser({ blockedUserId: userId, isBlock: !commentIsBlocked });
    // };

    return (
        <>
            {body && (
                <CommentCardWrapper isBlocked={isBlocked /*commentIsBlocked*/}>
                    <StyledSection isThreadComment={isThreadComment}>
                        <Link to={usersLink + '/' + userId}>
                            <PosterLayout
                                height={avatarDiameter}
                                src={profileImageUrl || noImageIcon}
                                width={avatarDiameter}
                            />
                        </Link>

                        <Section justifyBetween noWrap>
                            <FlexGrow height="100%">
                                <Section marginLeft="10px">
                                    <Link to={usersLink + '/' + userId}>
                                        <UserNameSpan padding={usernamePadding}>{username}</UserNameSpan>
                                    </Link>
                                    <SupplementarySpan>{commentDate}</SupplementarySpan>
                                </Section>

                                <Section justifyBetween noWrap margin={commentMargin}>
                                    <Column>
                                        <CommentSpan>{body}</CommentSpan>
                                    </Column>
                                </Section>
                                {repliesCount ? (
                                    <Section /*marginBottom="8px"*/>
                                        <ShowHideRepliesButton onClick={toggleRepliesTread}>
                                            <SupplementarySpan>
                                                {repliesIsLoading ? 'Loading ...' : repliesText}
                                            </SupplementarySpan>
                                        </ShowHideRepliesButton>
                                    </Section>
                                ) : (
                                    ''
                                )}
                            </FlexGrow>

                            {/* <BlockButton buttonText={buttonText} isBlocked={commentIsBlocked} onClick={onButtonClick} /> */}
                        </Section>
                    </StyledSection>
                </CommentCardWrapper>
            )}
        </>
    );
};
