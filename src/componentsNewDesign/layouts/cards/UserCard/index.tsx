import defaultUserImg from 'assets/bullz_logo_white.svg';
import whiteCopyIcon from 'assets/copy_icon_white.svg';
import history from 'browserHistory';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { BannedIcon } from 'componentsNewDesign/common/icons/BannedIcon';
import { NotVerifiedIcon } from 'componentsNewDesign/common/icons/NotVerifiedIcon';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { ClosableTag } from 'componentsNewDesign/common/tags/ClosableTag';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { NickNameSpan, StyledLink } from 'componentsNewDesign/layouts/cards/UserCard/styles';
import { PosterLayout } from 'componentsNewDesign/layouts/PosterLayout';
import { Tooltip } from 'componentsNewDesign/modals/Tooltip';
import { CardWrapper } from 'componentsNewDesign/wrappers/CardWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { defaultUserRoles, Roles } from 'constants/defaults/users';
import { asyncError } from 'constants/notifications';
import { usersLink } from 'constants/routes';
import { darkError, grey27, grey29, grey7, hoverGrey2 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { MouseEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import { API } from 'services';
import { message } from 'stores/alerts';
import { copyEvents, copyStores } from 'stores/Copy';
import { modalEvents } from 'stores/modals/asyncModal';
import { userStores } from 'stores/users/user';
import { usersEvents } from 'stores/users/users';
import { SubjectType } from 'types/types';
import {
    cardButtonWidth,
    copyFacilitatorIdMessage,
    copyUserIdMessage,
    parseDisableDescription,
    parseDisableSuccessMessage,
    parseDisableTitle,
    parseRemoveRoleDescription,
    parseRemoveRoleSuccessMessage,
    parseVerifyDescription,
    parseVerifySuccessMessage,
    parseVerifyTitle,
    propertyBlockHalfWidth,
    propertyBlockHalfWidthMobile,
    propertyBlockMarginBottom,
    propertyBlockMarginBottomMobile,
    removeRoleTitle,
    rolesAbsentMessage
} from './constants';

const { /*addRoleByUserId,*/ removeRoleByUserId, changeAbilityByUserId } = usersEvents;
const { updateAsyncModalLoading, closeAsyncModal, openAsyncModal } = modalEvents;

export interface UserCardProps extends BULLZ.AdminGetUserCommon {}

export const UserCard = ({
    id = '',
    facilitatorId,
    username = '',
    utcCreated,
    utcLastAuthentication,
    roles,
    isAccountVerified,
    profileImageUrl,
    //email,
    isDisabled,
    isTrusted,
    location,
    locale
}: UserCardProps) => {
    const { access } = useStore(userStores.auth);
    const copiedDataId = useStore(copyStores.copiedDataId);
    const isMobile = useMediaQuery({ query: `(max-width: ${xs})` });
    const propertyMarginBottomMobile = isMobile ? propertyBlockMarginBottomMobile : propertyBlockMarginBottom;
    const propertyHalfWidth = isMobile ? propertyBlockHalfWidthMobile : propertyBlockHalfWidth;
    const propertyBlockWrapper = isMobile ? '16px 8px 0' : '18px 18px 10px';
    const propertyBlockTagsWrapper = isMobile ? '10px 8px 10px' : '10px 18px 10px';

    //const assignedRoles = useMemo(() => assignedUserRoles.filter(i => !roles?.includes(i)), [roles]);

    // const assignRoleOkHandler = async (subject: SubjectType) => {
    //     const sub = subject.toString();
    //     try {
    //         updateAsyncModalLoading();
    //         const newRoles = roles ? [...roles, sub] : [sub];
    //         await API.adminUsers.updateUserById({
    //             id: id,
    //             roles: newRoles
    //         });
    //         updateAsyncModalLoading();

    //         closeAsyncModal();
    //         message.success(parseAssignSuccessMessage(sub, username || ''));
    //         addRoleByUserId({ id, role: sub });
    //     } catch {
    //         updateAsyncModalLoading();
    //         closeAsyncModal();
    //         message.error(asyncError);
    //     }
    // };

    const removeRoleOkHandler = async (subject: SubjectType) => {
        const sub = subject.toString();
        try {
            updateAsyncModalLoading();
            const newRoles = roles?.filter(i => i !== sub);
            await API.adminUsers.updateUserById({
                id: id,
                roles: newRoles
            });
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success(parseRemoveRoleSuccessMessage(sub, username || ''));
            removeRoleByUserId({ id, role: sub });
        } catch {
            updateAsyncModalLoading();
            closeAsyncModal();
            message.error(asyncError);
        }
    };

    const disableOkHandler = async (subject: SubjectType) => {
        const sub = !!subject;
        try {
            updateAsyncModalLoading();
            await API.adminUsers.updateUserById({
                id: id,
                isDisabled: sub
            });
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success(parseDisableSuccessMessage(sub, username || ''));
            changeAbilityByUserId({ id, isDisabled: sub });
        } catch {
            updateAsyncModalLoading();
            closeAsyncModal();
            message.error(asyncError);
        }
    };

    const verifyOkHandler = async (subject: SubjectType) => {
        const sub = !!subject;
        try {
            updateAsyncModalLoading();
            const {
                facilitatorId,
                firstName,
                lastName,
                country,
                gender,
                dateOfBirth,
                primaryLanguage,
                locale,
                freeStakingRemaining,
                isFreeStakingEligible,
                roles,
                isDisabled
            } = await API.adminUsers.getUserById({ id });
            await API.adminUsers.updateUserById({
                id,
                facilitatorId,
                firstName,
                lastName,
                country,
                gender,
                dateOfBirth,
                primaryLanguage,
                locale,
                freeStakingRemaining,
                isFreeStakingEligible,
                roles,
                isDisabled,
                isTrusted: sub
            });
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success(parseVerifySuccessMessage(sub, username || ''));
            changeAbilityByUserId({ id, isTrusted: sub });
        } catch {
            updateAsyncModalLoading();
            closeAsyncModal();
            message.error(asyncError);
        }
    };

    const redirectTo = usersLink + '/' + id;
    const moreInfoHandleClick = () => history.push(redirectTo);
    // const callAssignModal = (role: SubjectType) =>
    //     openAsyncModal({
    //         visible: true,
    //         title: assigningTitle,
    //         content: parseAssignRoleDescription(username || '', role.toString()),
    //         subject: role,
    //         onOk: assignRoleOkHandler
    //     });
    const callRemoveRoleModal = (role: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: removeRoleTitle,
            content: parseRemoveRoleDescription(username || '', role.toString()),
            subject: role,
            onOk: removeRoleOkHandler
        });
    const callDisableModal = (userDisabled: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: parseDisableTitle(!!userDisabled),
            content: parseDisableDescription(!!userDisabled, username || ''),
            subject: userDisabled,
            onOk: disableOkHandler
        });
    const callVerifyModal = (userVerified: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: parseVerifyTitle(!!userVerified),
            content: parseVerifyDescription(!!userVerified, username || ''),
            subject: userVerified,
            onOk: verifyOkHandler
        });

    const onCardClick = (e: MouseEvent) => {
        e.stopPropagation();
        copyEvents.setCopiedId(id);
    };

    return (
        <CardWrapper
            backgroundColor={grey29}
            disabled={isDisabled}
            isSelected={copiedDataId === id}
            onClick={onCardClick} /*width="287px"*/
        >
            <Column height="100%">
                <ContentWrapper minHeight="46px" padding="6px 16px" width="100%">
                    <Row alignCenter justifyBetween height="100%" width="100%">
                        <Row alignCenter noWrap width="100px">
                            <PosterLayout
                                borderRadius="50%"
                                defaultPoster={defaultUserImg}
                                redirectTo={redirectTo}
                                src={profileImageUrl || ''}
                                width={'34px'}
                            />

                            {/* <UserNickName to={usersLink + '/' + id}>{username}</UserNickName> */}
                            <StyledLink to={usersLink + '/' + id}>
                                <NickNameSpan>{`@${username}`}</NickNameSpan>
                            </StyledLink>

                            {locale && (
                                <MarginWrapper margin="0 10px">
                                    <Span noWrap fontSize="12px" fontWeight="500" lineHeight="14px" opacity={0.6}>
                                        {locale}
                                    </Span>
                                </MarginWrapper>
                            )}
                        </Row>

                        <ContentWrapper minWidth="78px" /*paddingRight="11px"*/>
                            <Row justifyEnd height="100%" width="100%">
                                {isTrusted && (
                                    <MarginWrapper marginLeft="8px">
                                        <Tooltip title="Account is trusted">
                                            <TrustedIcon />
                                        </Tooltip>
                                    </MarginWrapper>
                                )}

                                {!isAccountVerified && (
                                    <MarginWrapper marginLeft="8px">
                                        <Tooltip title="Account is not verified">
                                            <NotVerifiedIcon />
                                        </Tooltip>
                                    </MarginWrapper>
                                )}

                                {isDisabled && (
                                    <MarginWrapper marginLeft="8px">
                                        <Tooltip title="Account is banned">
                                            <BannedIcon />
                                        </Tooltip>
                                    </MarginWrapper>
                                )}
                            </Row>
                        </ContentWrapper>
                    </Row>
                </ContentWrapper>

                <HorizontalLine />
                <ContentWrapper /*height="179px"*/ padding={propertyBlockWrapper} width="100%">
                    <Section alignCenter justifyBetween height="100%">
                        <PropertyBlock
                            copiable
                            backgroundColor={grey27}
                            // titleUppercase
                            customCopyIcon={whiteCopyIcon}
                            linkRoute={usersLink}
                            marginBottom={propertyMarginBottomMobile}
                            subtitle={id}
                            success={copyUserIdMessage}
                            title="User ID"
                            width={propertyHalfWidth}
                        />
                        <PropertyBlock
                            copiable
                            backgroundColor={grey27}
                            // titleUppercase
                            customCopyIcon={whiteCopyIcon}
                            marginBottom={propertyMarginBottomMobile}
                            subtitle={facilitatorId}
                            success={copyFacilitatorIdMessage}
                            title="Facilitator ID"
                            width={propertyHalfWidth}
                        />
                        <PropertyBlock
                            isDate
                            backgroundColor={grey27}
                            // titleUppercase
                            marginBottom={propertyMarginBottomMobile}
                            subtitle={utcCreated}
                            title="Created Account"
                            width={propertyHalfWidth}
                        />
                        <PropertyBlock
                            isDate
                            backgroundColor={grey27}
                            // titleUppercase
                            marginBottom={propertyMarginBottomMobile}
                            subtitle={utcLastAuthentication}
                            title="Last Logged In"
                            width={propertyHalfWidth}
                        />
                        <PropertyBlock
                            backgroundColor={grey27}
                            // titleUppercase
                            marginBottom={propertyMarginBottomMobile}
                            subtitle={location?.countryName || ''}
                            title="Country"
                            width={propertyHalfWidth}
                        />
                        <PropertyBlock
                            backgroundColor={grey27}
                            // titleUppercase
                            marginBottom={propertyMarginBottomMobile}
                            subtitle={location?.area?.region || ''}
                            title="Region"
                            width={propertyHalfWidth}
                        />
                        {/* <PropertyBlock
                            copiable
                            // titleUppercase
                            notVerified={!isAccountVerified}
                            subtitle={email}

                            success={copyEmailMessage}
                            title="Email Address"
                            width={propertyBlockFullWidth}
                        /> */}
                    </Section>
                </ContentWrapper>

                <ContentWrapper height="65px" padding={propertyBlockTagsWrapper} width="100%">
                    <ScrollableWrapper alignCenter noWrap paddingBottom="10px" width="100%">
                        {roles?.length
                            ? roles.map((item: string) => (
                                  <ClosableTag
                                      key={item}
                                      marginRight="8px"
                                      subject={item}
                                      untouchable={defaultUserRoles.includes(item)}
                                      onClose={callRemoveRoleModal}
                                  />
                              ))
                            : rolesAbsentMessage}
                    </ScrollableWrapper>
                </ContentWrapper>

                <>
                    <Column width="100%">
                        <ContentWrapper padding="10px 18px 0px" width="100%">
                            <Row
                                alignCenter
                                height="100%"
                                justifyBetween={access === Roles.Administrator || access === Roles.SuperAdministrator}
                                justifyCenter={access !== Roles.Administrator && access !== Roles.SuperAdministrator}
                            >
                                <CardButton
                                    background={grey27}
                                    backgroundHover={hoverGrey2}
                                    color={grey7}
                                    width={cardButtonWidth}
                                    onClick={moreInfoHandleClick}
                                >
                                    More Info
                                </CardButton>
                                {/* <RolesPopover
                                        disabled={!assignedRoles.length}
                                        setSubject={callAssignModal}
                                        subjects={assignedRoles}
                                        title={assignRoleTitle}
                                    >
                                        <CardButton disabled={!assignedRoles.length}>Assign Role</CardButton>
                                    </RolesPopover> */}
                                <AdministratorLayout>
                                    <CardButton
                                        background={grey27}
                                        backgroundHover={hoverGrey2}
                                        color={grey7}
                                        width={cardButtonWidth}
                                        onClick={() => callVerifyModal(!isTrusted)}
                                    >
                                        {isTrusted ? 'Unverify' : 'Verify'}
                                    </CardButton>
                                </AdministratorLayout>
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
                                        textHover={darkError}
                                        width="80px"
                                        onClick={() => callDisableModal(!isDisabled)}
                                    >
                                        {isDisabled ? 'Activate' : 'Disable'}
                                    </SimpleButton>
                                </Row>
                            </ContentWrapper>
                        </AdministratorLayout>
                    </Column>
                </>
            </Column>
        </CardWrapper>
    );
};
