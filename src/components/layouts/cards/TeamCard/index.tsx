import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import history from 'browserHistory';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { Title } from 'components/common/typography/titles/Title';
import { EllipsisRow } from 'components/grid/Card';
import {
    deleteTitle,
    parseDeleteModalContentTeam,
    parseDeleteSuccessMessageTeam
} from 'components/layouts/cards/products/ProductCard/constants';
import { nameAbsentMessage } from 'components/layouts/cards/TeamCard/constants';
import { TeamEditorModal } from 'components/modals/formModals/TeamEditorModal';
import { Tooltip } from 'components/modals/Tooltip';
import { DivClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { asyncError } from 'constants/notifications';
import { teamsLink } from 'constants/routes';
import { antdCardStyle, padding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { API } from 'services';
import { modalEvents } from 'stores/modals/asyncModal';
import { teamsEvents } from 'stores/team';
import { userStores } from 'stores/users/user';
import { ProductCardEditableFields } from 'types/form';
import { SubjectType } from 'types/types';
import { parseCalendarDate } from 'utils/usefulFunctions';
import { Roles } from 'constants/defaults/users';

const { updateAsyncModalLoading } = modalEvents;

const { Meta } = Card;

interface Props extends YEAY.GetTeamResponse {}

export const TeamCard = ({ id = '', name = '', urlName = '', utcCreated, ownerId }: Props) => {
    const { access } = useStore(userStores.auth);

    const deleteOkHandler = async (subject: SubjectType) => {
        try {
            const sub = subject.toString();
            updateAsyncModalLoading();
            await API.team.deleteTeam({
                teamId: sub
            });
            updateAsyncModalLoading();

            modalEvents.closeAsyncModal();
            message.success(parseDeleteSuccessMessageTeam(name || ''));
            teamsEvents.deleteItemById(sub);
        } catch {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
            message.error(asyncError);
        }
    };

    // const joinToTeamHandleClick = async (subject: SubjectType) => {
    //     try {
    //         modalEvents.updateLoading();
    //         await API.team.joinTeam({
    //             id: subject.toString()
    //         });
    //         modalEvents.updateLoading();
    //
    //         modalEvents.closeAsyncModal();
    //         message.success(parseDeleteSuccessMessageTeam(name || ''));
    //     } catch {
    //         modalEvents.updateLoading();
    //         modalEvents.closeAsyncModal();
    //         message.error(asyncError);
    //     }
    // };

    const moreInfoHandleClick = () => history.push(teamsLink + '/' + id);
    const changeEditableFieldsCallback = (fields: ProductCardEditableFields) =>
        teamsEvents.updateItemById({ id, ...fields });

    const deleteHandleClick = () =>
        modalEvents.openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContentTeam(name || ''),
            subject: id,
            onOk: deleteOkHandler
        });
    // const joinHandleClick = () =>
    //     modalEvents.openAsyncModal({
    //         visible: true,
    //         title: joinTitle,
    //         content: joinModalContentTeam(name || ''),
    //         subject: id,
    //         onOk: joinToTeamHandleClick
    //     });

    return (
        <>
            <Card
                hoverable
                actions={
                    access === Roles.Administrator || access === Roles.SuperAdministrator
                        ? [
                              <Tooltip key="ellipsis" title="More info">
                                  <EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />
                              </Tooltip>,
                              <TeamEditorModal
                                  key="edit"
                                  id={id}
                                  name={name}
                                  urlName={urlName}
                                  onChange={changeEditableFieldsCallback}
                              />,
                              <Tooltip key="blockUser" title="Delete this team">
                                  <DeleteOutlined onClick={deleteHandleClick} />
                              </Tooltip>
                          ]
                        : [
                              <Tooltip key="ellipsis" title="More info">
                                  <EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />
                              </Tooltip>
                          ]
                }
                style={antdCardStyle}
            >
                <Meta
                    title={
                        <DivClickableWrapper width="100%" onClick={moreInfoHandleClick}>
                            <EllipsisRow>{name ? name : <AbsentInfo>{nameAbsentMessage}</AbsentInfo>}</EllipsisRow>
                        </DivClickableWrapper>
                    }
                />
                <DivClickableWrapper onClick={moreInfoHandleClick}>
                    <Column>
                        <Row marginBottom="0" marginTop={padding}></Row>
                        <EllipsisRow>
                            <Title>Url name: </Title> {urlName || <AbsentInfo>no content</AbsentInfo>}
                        </EllipsisRow>
                        <Row>
                            <Title>Created at: </Title>
                            {utcCreated ? parseCalendarDate(new Date(utcCreated)) : <AbsentInfo>no content</AbsentInfo>}
                        </Row>
                    </Column>
                </DivClickableWrapper>

                <Row marginBottom="0">
                    <CopyButton removeMarginRight subject={id} success="you successfully copied team id">
                        Copy team id
                    </CopyButton>
                    <CopyButton
                        removeMarginRight
                        subject={urlName !== null ? urlName : ''}
                        success="you successfully copied team url"
                    >
                        Copy team url
                    </CopyButton>
                    <CopyButton
                        removeMarginBottom
                        removeMarginRight
                        subject={ownerId}
                        success="you successfully copied creator id"
                    >
                        Copy owner id
                    </CopyButton>
                </Row>
            </Card>
        </>
    );
};
