import avatarImg from 'assets/avatar.svg';
import errorImg from 'assets/error.svg';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { H3 } from 'components/common/typography/titles/H3';
import { Card, CardRow, CardRowFeatures, EllipsisRow, FeatureCell } from 'components/grid/Card';
import {
    DataCardCell,
    DataCardRow,
    DataCellSpan,
    DescriptionCellWithAvatar,
    DescriptionWithAvatar,
    ImageWrapper
} from 'components/layouts/cards/users/UserCard/styles';
import { Tooltip } from 'components/modals/Tooltip';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { commentsLink } from 'constants/routes';
import { atPrefix } from 'constants/styles/others';
import { avatarDiameter } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { parseCalendarDate } from 'utils/usefulFunctions';
import {
    copyIdMessage,
    copyParentIdMessage,
    copyUserIdMessage,
    copyUsernameMessage,
    errorImageDiameter
} from './constants';

interface Props extends YEAY.GetPostResponse {
    isBlocked?: boolean;
}

export const CommentCard: FC<Props> = ({
    body,
    bodyType,
    deep,
    id,
    isBlocked,
    isFollowed,
    parentId,
    profileImageUrl,
    reportedState,
    userId,
    username,
    utcCreated,
    utcUpdated
}) => {
    const history = useHistory();

    return (
        <>
            <Card>
                <CardRow marginTop>
                    <CustomImg
                        alt="avatar"
                        height={avatarDiameter}
                        src={profileImageUrl ? profileImageUrl : avatarImg}
                        width={avatarDiameter}
                    />
                    <DescriptionWithAvatar>
                        <DescriptionCellWithAvatar>
                            <Tooltip title="Username">
                                <H3 ellipsis removeMarginBottom>
                                    {atPrefix}
                                    {username}
                                </H3>
                            </Tooltip>
                        </DescriptionCellWithAvatar>
                        {isBlocked && (
                            <Tooltip title="Account is blocked">
                                <ImageWrapper>
                                    <CustomImg
                                        alt="error"
                                        height={errorImageDiameter}
                                        src={errorImg}
                                        width={errorImageDiameter}
                                    />
                                </ImageWrapper>
                            </Tooltip>
                        )}
                    </DescriptionWithAvatar>
                </CardRow>
                <DataCardRow>
                    {utcCreated && (
                        <DataCardCell>
                            <Span>Created comment</Span>
                            <Tooltip title="Date">
                                <DataCellSpan>{parseCalendarDate(new Date(utcCreated))}</DataCellSpan>
                            </Tooltip>
                        </DataCardCell>
                    )}
                    {utcUpdated && (
                        <DataCardCell>
                            <Span>Last updates</Span>
                            <Tooltip title="Date">
                                <DataCellSpan>{parseCalendarDate(new Date(utcUpdated))}</DataCellSpan>
                            </Tooltip>
                        </DataCardCell>
                    )}
                </DataCardRow>
                <DataCardRow>
                    <DataCardCell>
                        <EllipsisRow>
                            <H3>{body}</H3>
                        </EllipsisRow>
                    </DataCardCell>
                </DataCardRow>
                <CardRow removeMarginBottom removePaddingRight>
                    <CopyButton subject={id} success={copyIdMessage}>
                        Copy comments id
                    </CopyButton>
                    <CopyButton subject={userId} success={copyUserIdMessage}>
                        Copy user id
                    </CopyButton>
                    <CopyButton subject={parentId} success={copyParentIdMessage}>
                        Copy parent id
                    </CopyButton>
                    <CopyButton subject={username} success={copyUsernameMessage}>
                        Copy username
                    </CopyButton>
                </CardRow>
                <CardRowFeatures quantity={1}>
                    <FeatureCell onClick={() => history.push(commentsLink + '/' + id)}>More info</FeatureCell>
                </CardRowFeatures>
            </Card>
            {/*{modal.visible && (*/}
            {/*    <AsyncDeleteVideoModal*/}
            {/*        {...modal}*/}
            {/*        loading={modalLoading}*/}
            {/*        setVisible={setModalVisible}*/}
            {/*        subject={{*/}
            {/*            id,*/}
            {/*            ownerId,*/}
            {/*            primaryProductId*/}
            {/*        }}*/}
            {/*        onOk={deleteOkHandler}*/}
            {/*    />*/}
            {/*)}*/}
        </>
    );
};
