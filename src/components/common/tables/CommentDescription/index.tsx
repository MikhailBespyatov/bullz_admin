import { Descriptions } from 'antd';
import avatarImg from 'assets/avatar.svg';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { noContentMessage } from 'components/common/tables/ProductDescription/constants';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import {
    copyIdMessage,
    copyParentIdMessage,
    copyUserIdMessage,
    copyUsernameMessage
} from 'components/layouts/cards/comments/CommentCard/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { MagnifyImage } from 'componentsNewDesign/modals/MagnifyImage';
import { commentsLink, usersLink } from 'constants/routes';
import { antdCardAvatarWidth } from 'constants/styles/sizes';
import React from 'react';
import { Link } from 'react-router-dom';
import { parseCalendarDate } from 'utils/usefulFunctions';

const { Item } = Descriptions;

interface Props extends BULLZ.GetPostResponse {
    isBlocked?: boolean;
}

export const CommentsDescription = ({
    body,
    id,
    isBlocked,
    parentId,
    profileImageUrl,
    userId,
    username,
    utcCreated,
    utcUpdated
}: Props) => (
    <Descriptions bordered extra={<></>} size="small" title="Comment info">
        <Item label="ID">
            {id ? <Link to={commentsLink + '/' + id}>{id}</Link> : <AbsentInfo>{noContentMessage}</AbsentInfo>}
        </Item>
        <Item label="Parent id">{parentId || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
        <Item label="Comment">{body || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
        <Item label="Username">{username || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
        <Item label="User id">
            {userId ? <Link to={usersLink + '/' + userId}>{userId}</Link> : <AbsentInfo>{noContentMessage}</AbsentInfo>}
        </Item>
        <Item label="Image user">
            {profileImageUrl ? (
                <MagnifyImage
                    src={profileImageUrl}
                    title={username || ''}
                    viewHeight={antdCardAvatarWidth}
                    viewWidth={antdCardAvatarWidth}
                />
            ) : (
                <CustomImg center alt="avatar" height={antdCardAvatarWidth} src={avatarImg} />
            )}
        </Item>
        <Item label="Is blocked?">{'User ' + (isBlocked ? '' : 'non') + ' blocked'}</Item>
        <Item label="Created at">
            {utcCreated ? parseCalendarDate(new Date(utcCreated)) : <AbsentInfo>{noContentMessage}</AbsentInfo>}
        </Item>
        <Item label="Updated at">
            {utcUpdated ? parseCalendarDate(new Date(utcUpdated)) : <AbsentInfo>{noContentMessage}</AbsentInfo>}
        </Item>
        <Item label="Actions">
            <CopyButton removeMarginBottom subject={id} success={copyIdMessage}>
                Copy comments id
            </CopyButton>
            <CopyButton removeMarginBottom subject={userId} success={copyUserIdMessage}>
                Copy user id
            </CopyButton>
            <CopyButton removeMarginBottom subject={parentId} success={copyParentIdMessage}>
                Copy parent id
            </CopyButton>
            <CopyButton removeMarginBottom subject={username} success={copyUsernameMessage}>
                Copy username
            </CopyButton>
        </Item>
    </Descriptions>
);
