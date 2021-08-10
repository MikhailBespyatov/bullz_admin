import backArrowImg from 'assets/back_arrow.svg';
import history from 'browserHistory';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { AvatarImg } from 'componentsNewDesign/common/imgComponents/AvatarImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { BlockTitle, BlockWrapper } from 'componentsNewDesign/layouts/blocks/PropertyBlock/styles';
import {
    copyTeamIdMessage,
    copyTeamUrlMessage,
    propertyBlockFullWidth,
    propertyBlockHalfWidth
} from 'componentsNewDesign/layouts/cards/TeamCard/constants';
import { backArrowDiameter } from 'componentsNewDesign/layouts/descriptionLayouts/TeamDescription/constants';
import {
    SubtitleBlock,
    TeamPropertyWrapper
} from 'componentsNewDesign/layouts/descriptionLayouts/TeamDescription/styles';
import { TitleText } from 'componentsNewDesign/modals/AsyncModal/styles';
import { EditTeamInfoPopover } from 'componentsNewDesign/modals/popovers/teams/EditTeamInfoPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { noop } from 'constants/functions';
import React, { useMemo } from 'react';
import { removeOrBanUserModal } from 'stores/initialize/initialize.modal.store';
import { teamsEvents } from 'stores/team';
import { Title } from 'types/data';
import { MaxSizes, Sizes } from 'types/styles';

interface ScrollablePropertyBlockProps extends Title, MaxSizes, Sizes {
    // titleUppercase?: boolean;
}

export const ScrollablePropertyBlock = ({
    title,
    //titleUppercase
    subtitle,
    width,
    maxHeight
}: ScrollablePropertyBlockProps) => (
    <BlockWrapper width={width}>
        <MarginWrapper marginBottom="8px">
            <BlockTitle /*uppercase={titleUppercase}*/>{title}</BlockTitle>
        </MarginWrapper>
        <ScrollableWrapper maxHeight={maxHeight || '80px'} overflowY="scroll" paddingRight="5px" width="100%">
            <SubtitleBlock>{subtitle || ''}</SubtitleBlock>
        </ScrollableWrapper>
    </BlockWrapper>
);

interface TeamDescriptionProps extends YEAY.GetTeamInfoResponse {}

export const TeamDescription = ({
    id = '',
    urlName = '',
    name = '',
    owner,
    admins,
    members,
    banned,
    utcCreated
}: TeamDescriptionProps) => {
    const ownerImg = useMemo(() => owner?.profileImageUrl, [owner]);
    const ownerName = useMemo(() => owner?.username, [owner]);
    const ownerId = useMemo(() => owner?.userId, [owner]);
    const membersList = members?.map(item => item.username).join(', ');
    const bannedList = banned?.map(item => item.username).join(', ');
    const adminsList = admins?.map(item => item.username).join(', ');

    const onBackArrowClick = () => history.goBack();

    const onRemoveClick = (teamId: string) => {
        removeOrBanUserModal.openModal({ teamId });
    };

    // TODO Improve logic of the connection team store and editTeamInfo effect
    const changeEditableFieldsCallback = (fields: YEAY.UpdateTeamRequest) =>
        teamsEvents.updateItemById({ id, ...fields });

    return (
        <ContentWrapper padding="16px 32px" width="100%">
            <Column width="100%">
                <Section justifyBetween marginBottom="28px">
                    <Row alignCenter>
                        <Column marginRight="24px">
                            <CustomImg
                                pointer
                                height={backArrowDiameter}
                                src={backArrowImg}
                                width={backArrowDiameter}
                                onClick={onBackArrowClick}
                            />
                        </Column>
                        <TitleText>Team page ({name})</TitleText>
                    </Row>
                    <Row alignCenter>
                        <Column>
                            {/* <AdministratorLayout> */}
                            <EditTeamInfoPopover
                                id={id}
                                name={name || ''}
                                type="down"
                                urlName={urlName || ''}
                                onChange={changeEditableFieldsCallback}
                            >
                                <CardButton marginRight="8px" type="primary" onClick={noop}>
                                    Edit
                                </CardButton>
                            </EditTeamInfoPopover>
                            {/* </AdministratorLayout> */}
                        </Column>
                        <Column>
                            {/* <AdministratorLayout> */}
                            <CardButton type="danger" onClick={() => onRemoveClick(id)}>
                                Remove or Ban
                            </CardButton>
                            {/* </AdministratorLayout> */}
                        </Column>
                    </Row>
                </Section>
                <Section justifyBetween noWrap marginBottom="0">
                    <Column marginRight="24px">
                        <AvatarImg
                            // isAccountVerified={isAccountVerified}
                            // isDisabled={isDisabled}
                            // isTrusted={isTrusted}
                            src={ownerImg || ''}
                        />
                    </Column>

                    <Column marginRight="8px" width={propertyBlockHalfWidth}>
                        <TeamPropertyWrapper>
                            <PropertyBlock
                                copiable
                                // titleUppercase
                                subtitle={id || ''}
                                success={copyTeamIdMessage}
                                title="id"
                                width={propertyBlockHalfWidth}
                            />

                            <PropertyBlock
                                // titleUppercase
                                subtitle={name || undefined}
                                title="Name"
                                width={propertyBlockHalfWidth}
                            />
                        </TeamPropertyWrapper>
                        <TeamPropertyWrapper>
                            <PropertyBlock
                                copiable
                                //titleUppercase
                                subtitle={ownerId}
                                success={copyTeamIdMessage}
                                title="Owner id"
                                width={propertyBlockHalfWidth}
                            />

                            <PropertyBlock
                                // titleUppercase
                                subtitle={ownerName || undefined}
                                title="Owner name"
                                width={propertyBlockHalfWidth}
                            />
                        </TeamPropertyWrapper>
                        <TeamPropertyWrapper>
                            <ScrollablePropertyBlock
                                // titleUppercase
                                subtitle={membersList}
                                title="Members"
                                width={propertyBlockFullWidth}
                            />
                            {/* <PropertyBlock
                                //titleUppercase
                                subtitle={membersList}
                                title="Members"
                                width={propertyBlockFullWidth}
                            /> */}
                        </TeamPropertyWrapper>
                    </Column>
                    <Column width={propertyBlockHalfWidth}>
                        <TeamPropertyWrapper>
                            <PropertyBlock
                                copiable
                                //titleUppercase
                                subtitle={urlName || undefined}
                                success={copyTeamUrlMessage}
                                title="URL Name"
                                width={propertyBlockFullWidth}
                            />
                        </TeamPropertyWrapper>
                        <TeamPropertyWrapper>
                            <PropertyBlock
                                isDate
                                //titleUppercase
                                subtitle={utcCreated}
                                title="Created account"
                                width={propertyBlockHalfWidth}
                            />

                            <PropertyBlock
                                //titleUppercase
                                subtitle={adminsList}
                                title="Admins"
                                width={propertyBlockHalfWidth}
                            />
                        </TeamPropertyWrapper>
                        <TeamPropertyWrapper>
                            <ScrollablePropertyBlock
                                // titleUppercase
                                subtitle={bannedList}
                                title="Banned"
                                width={propertyBlockFullWidth}
                            />
                            {/* <PropertyBlock
                                //titleUppercase
                                subtitle={bannedList}
                                title="Banned"
                                width={propertyBlockFullWidth}
                            /> */}
                        </TeamPropertyWrapper>
                    </Column>
                </Section>
            </Column>
        </ContentWrapper>
    );
};
