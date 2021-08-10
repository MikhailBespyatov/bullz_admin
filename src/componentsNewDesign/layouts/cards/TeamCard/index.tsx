import history from 'browserHistory';
import {
    deleteTitle,
    parseDeleteModalContentTeam,
    parseDeleteSuccessMessageTeam
} from 'components/layouts/cards/products/ProductCard/constants';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { StyledLink, TeamNameSpan } from 'componentsNewDesign/layouts/cards/TeamCard/styles';
import { EditTeamInfoPopover } from 'componentsNewDesign/modals/popovers/teams/EditTeamInfoPopover';
import { CardWrapper } from 'componentsNewDesign/wrappers/CardWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { Roles } from 'constants/defaults/users';
import { noop } from 'constants/functions';
import { asyncError } from 'constants/notifications';
import { teamsLink, usersLink } from 'constants/routes';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';
import { API } from 'services';
import { message } from 'stores/alerts';
import { copyEvents, copyStores } from 'stores/Copy';
import { modalEvents } from 'stores/modals/asyncModal';
import { teamsEvents } from 'stores/team';
import { userStores } from 'stores/users/user';
import { SubjectType } from 'types/types';
import {
    cardButtonWidth,
    copyOwnerIdMessage,
    copyTeamIdMessage,
    copyTeamUrlMessage,
    propertyBlockFullWidth,
    propertyBlockHalfWidth,
    propertyBlockHeight,
    propertyBlockMarginBottom
} from './constants';

const { updateAsyncModalLoading } = modalEvents;

export interface TeamCardProps extends YEAY.GetTeamResponse {}

export const TeamCard = ({ id = '', name = '', urlName = '', utcCreated, ownerId }: TeamCardProps) => {
    const { access } = useStore(userStores.auth);
    const isAdminAccess = access === Roles.Administrator || access === Roles.SuperAdministrator;

    const copiedDataId = useStore(copyStores.copiedDataId);
    const redirectTo = teamsLink + '/' + id;

    const onCardClick = (e: MouseEvent) => {
        e.stopPropagation();
        copyEvents.setCopiedId(id);
    };

    const moreInfoHandleClick = () => history.push(redirectTo);

    // TODO Improve logic of the connection team store and editTeamInfo effect

    const changeEditableFieldsCallback = (fields: YEAY.UpdateTeamRequest) =>
        teamsEvents.updateItemById({ id, ...fields });

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

    const deleteHandleClick = () =>
        modalEvents.openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContentTeam(name || ''),
            subject: id,
            onOk: deleteOkHandler
        });

    return (
        <CardWrapper isSelected={copiedDataId === id} onClick={onCardClick} /*width="287px"*/>
            <Column height="100%">
                <Row alignCenter noWrap margin="0 10px" minHeight="46px" width="300px">
                    <StyledLink to={teamsLink + '/' + id}>
                        <TeamNameSpan>{name}</TeamNameSpan>
                    </StyledLink>
                </Row>

                <HorizontalLine />
                <ContentWrapper padding="16px 20px 10px" width="100%">
                    <Section alignCenter justifyBetween height="100%">
                        <PropertyBlock
                            // titleUppercase
                            marginBottom={propertyBlockMarginBottom}
                            minHeight={propertyBlockHeight}
                            subtitle={urlName || undefined}
                            title="Url name"
                            width={propertyBlockFullWidth}
                        />
                        <PropertyBlock
                            copiable
                            // titleUppercase
                            marginBottom={propertyBlockMarginBottom}
                            minHeight={propertyBlockHeight}
                            subtitle={urlName || undefined}
                            success={copyTeamUrlMessage}
                            title="Team url"
                            width={propertyBlockHalfWidth}
                        />
                        <PropertyBlock
                            copiable
                            // titleUppercase
                            marginBottom={propertyBlockMarginBottom}
                            minHeight={propertyBlockHeight}
                            subtitle={id}
                            success={copyTeamIdMessage}
                            title="Team ID"
                            width={propertyBlockHalfWidth}
                        />

                        <PropertyBlock
                            isDate
                            // titleUppercase
                            marginBottom={propertyBlockMarginBottom}
                            minHeight={propertyBlockHeight}
                            subtitle={utcCreated}
                            title="Created At"
                            width={propertyBlockHalfWidth}
                        />
                        <PropertyBlock
                            copiable
                            // titleUppercase
                            linkRoute={usersLink}
                            marginBottom={propertyBlockMarginBottom}
                            minHeight={propertyBlockHeight}
                            subtitle={ownerId}
                            success={copyOwnerIdMessage}
                            title="Owner ID"
                            width={propertyBlockHalfWidth}
                        />
                    </Section>
                </ContentWrapper>

                <Column width="100%">
                    <ContentWrapper padding="10px 18px 0px" width="100%">
                        <Row alignCenter height="100%" justifyBetween={isAdminAccess} justifyCenter={!isAdminAccess}>
                            <CardButton width={cardButtonWidth} onClick={moreInfoHandleClick}>
                                More Info
                            </CardButton>
                            <Row width={cardButtonWidth}>
                                <AdministratorLayout>
                                    <EditTeamInfoPopover
                                        id={id}
                                        name={name || ''}
                                        urlName={urlName || ''}
                                        onChange={changeEditableFieldsCallback}
                                    >
                                        <CardButton width="100%" onClick={noop}>
                                            Edit Info
                                        </CardButton>
                                    </EditTeamInfoPopover>
                                </AdministratorLayout>
                            </Row>
                        </Row>
                    </ContentWrapper>
                    <AdministratorLayout>
                        <ContentWrapper height="40px" width="100%">
                            <Row alignCenter justifyCenter height="100%" width="100%">
                                <SimpleButton
                                    background="transparent"
                                    color="#ff3333"
                                    fontSize="14px"
                                    padding="6px 10px 16px"
                                    width="80px"
                                    onClick={deleteHandleClick}
                                >
                                    Delete
                                </SimpleButton>
                            </Row>
                        </ContentWrapper>
                    </AdministratorLayout>
                </Column>
            </Column>
        </CardWrapper>
    );
};
