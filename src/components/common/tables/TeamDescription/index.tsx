import { Descriptions } from 'antd';
import avatarImg from 'assets/product_avatar.svg';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { noContentMessage } from 'components/common/tables/ProductDescription/constants';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { BlockUserInTeamModal } from 'components/modals/formModals/BlockUserInTeamModal';
import { TeamEditorModal } from 'components/modals/formModals/TeamEditorModal';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { MagnifyImage } from 'componentsNewDesign/modals/MagnifyImage';
import { teamsLink, usersLink } from 'constants/routes';
import { antdCardAvatarWidth } from 'constants/styles/sizes';
import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { teamsEvents } from 'stores/team';
import { ProductCardEditableFields } from 'types/form';
import { parseCalendarDate } from 'utils/usefulFunctions';

const { Item } = Descriptions;

interface Props extends YEAY.GetTeamInfoResponse {}

export const TeamDescription = ({ urlName, name = '', owner, admins, members, id = '', banned, utcCreated }: Props) => {
    const ownerImg = useMemo(() => owner?.profileImageUrl, [owner]);
    const ownerName = useMemo(() => owner?.username, [owner]);
    const ownerId = useMemo(() => owner?.userId, [owner]);
    const changeEditableFieldsCallback = (fields: ProductCardEditableFields) =>
        teamsEvents.updateItemById({ id, ...fields });

    return (
        <Descriptions bordered extra={<></>} size="small" title="Team Info">
            <Item label="ID">
                {id ? <Link to={teamsLink + '/' + id}>{id}</Link> : <AbsentInfo>{noContentMessage}</AbsentInfo>}
            </Item>
            <Item label="Name">{name || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
            <Item label="Url name">{urlName || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
            <Item label="Owner image">
                {ownerImg ? (
                    <MagnifyImage
                        src={ownerImg}
                        title={name || ''}
                        viewHeight={antdCardAvatarWidth}
                        viewWidth={antdCardAvatarWidth}
                    />
                ) : (
                    <CustomImg center alt="avatar" height={antdCardAvatarWidth} src={avatarImg} />
                )}
            </Item>
            <Item label="Owner id">
                {ownerId ? (
                    <Link to={usersLink + '/' + ownerId}>{ownerId}</Link>
                ) : (
                    <AbsentInfo>{noContentMessage}</AbsentInfo>
                )}
            </Item>
            <Item label="Owner name">{ownerName || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
            <Item label="Admins">
                {admins?.length ? (
                    admins.map(({ userId, username }) => (
                        <Fragment key={userId}>
                            <Link to={usersLink + '/' + userId}>{username}</Link>
                            &emsp;
                        </Fragment>
                    ))
                ) : (
                    <AbsentInfo>{noContentMessage}</AbsentInfo>
                )}
            </Item>
            <Item label="Members">
                {members?.length ? (
                    members.map(({ userId, username }) => (
                        <Fragment key={userId}>
                            <Link to={usersLink + '/' + userId}>{username}</Link>
                            &emsp;
                        </Fragment>
                    ))
                ) : (
                    <AbsentInfo>{noContentMessage}</AbsentInfo>
                )}
            </Item>
            <Item label="Banned">
                {banned?.length ? (
                    banned.map(({ userId, username }) => (
                        <Fragment key={userId}>
                            <Link to={usersLink + '/' + userId}>{username}</Link>
                            &emsp;
                        </Fragment>
                    ))
                ) : (
                    <AbsentInfo>{noContentMessage}</AbsentInfo>
                )}
            </Item>
            <Item label="Created at">
                {utcCreated ? parseCalendarDate(new Date(utcCreated)) : <AbsentInfo>{noContentMessage}</AbsentInfo>}
            </Item>
            <Item label="Actions" span={2}>
                <CopyButton subject={id} success="You successfully copied team id!">
                    Copy team id
                </CopyButton>
                <CopyButton subject={urlName || ''} success="you successfully copied team url">
                    Copy team url
                </CopyButton>
                <CopyButton subject={id} success="You successfully copied owner id!">
                    Copy owner id
                </CopyButton>
                <TeamEditorModal
                    key="edit"
                    id={id}
                    name={name}
                    title="Edit"
                    urlName={urlName}
                    onChange={changeEditableFieldsCallback}
                />
                <BlockUserInTeamModal key="blockUser" id={id} title="Remove or Ban" />
            </Item>
        </Descriptions>
    );
};
