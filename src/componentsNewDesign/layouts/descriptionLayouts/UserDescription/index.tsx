import backArrowImg from 'assets/back_arrow.svg';
import whiteCopyIcon from 'assets/copy_icon_white.svg';
import history from 'browserHistory';
import { AdministratorLayout, SuperAdministratorLayout } from 'components/layouts/RolesLayouts';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { GenerateReportButton } from 'componentsNewDesign/common/buttons/GenerateReportButton';
import { AvatarImg } from 'componentsNewDesign/common/imgComponents/AvatarImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { localeSelector } from 'componentsNewDesign/common/inputs/NestedSelect/constants';
import { ClosableTag } from 'componentsNewDesign/common/tags/ClosableTag';
import { ChangeablePropertyBlock, PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    assigningTitle,
    assignRoleTitle,
    copyEmailMessage,
    copyFacilitatorIdMessage,
    copyPhoneMessage,
    copyUserIdMessage,
    copyUsernameMessage,
    parseAssignSuccessMessage,
    parseDisableDescription,
    parseDisableSuccessMessage,
    parseDisableTitle,
    parseRemoveRoleDescription,
    parseRemoveRoleSuccessMessage,
    parseVerifyDescription,
    parseVerifySuccessMessage,
    parseVerifyTitle,
    propertyBlockHalfWidth,
    removeRoleTitle,
    rolesAbsentMessage
} from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { VideoCard } from 'componentsNewDesign/layouts/cards/VideoCard';
import {
    backImgDiameter,
    marginRightWrapperMobile,
    propertyBlockWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription/constants';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { TitleText } from 'componentsNewDesign/modals/AsyncModal/styles';
import { deleteReasonsList } from 'componentsNewDesign/modals/DeleteOrBlockUserModal/constants';
import { RolesPopover } from 'componentsNewDesign/modals/popovers/RolesPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { assignedUserRoles, assignedUserRolesForSuperAdmin, defaultUserRoles, Roles } from 'constants/defaults/users';
import { asyncError, videosNotFoundMessage } from 'constants/notifications';
import { usersLink } from 'constants/routes';
import { getRedirectUrlToWom } from 'constants/services';
import { blue, errorColor, grey27, grey29, hoverGrey2, lightBlack, white } from 'constants/styles/colors';
import { md } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { API } from 'services';
import { message } from 'stores/alerts';
import { userReportModal } from 'stores/initialize/initialize.modal.store';
import { modalEvents } from 'stores/modals/asyncModal';
import { userStores } from 'stores/users/user';
import { usersEffects, usersEvents } from 'stores/users/users';
import { SubjectType } from 'types/types';
import { parseAssignRoleDescription } from 'utils/usefulFunctions';
import { BlockInformationText, UserPropertyWrapper } from './styles';

const { removeRoleByUserId, addRoleByUserId, changeAbilityByUserId } = usersEvents;
const { updateAsyncModalLoading, closeAsyncModal, openAsyncModal, openDeleteOrBlockUserModal } = modalEvents;

interface Props extends BULLZ.AdminGetUserCommon {}

export const UserDescription = ({
    username,
    id = '',
    facilitatorId,
    freeStakingRemaining,
    locale,
    location,
    profileImageUrl,
    roles,
    utcCreated,
    utcUpdated,
    /*@ts-ignore - Removing from API Model*/
    email,
    /*@ts-ignore - Removing from API Model*/
    mobileNumber,
    isAccountVerified,
    utcLastAuthentication,
    isDisabled,
    isTrusted
}: Props) => {
    const { access } = useStore(userStores.auth);
    const isMobile = useMediaQuery({ query: `(max-width: ${md})` });

    const assignedRoles = useMemo(
        () =>
            access === Roles.SuperAdministrator
                ? assignedUserRolesForSuperAdmin.filter(i => !roles?.includes(i))
                : assignedUserRoles.filter(i => !roles?.includes(i)),
        [roles, access]
    );
    // const assignedRolesForSuperAdmin = useMemo(() => assignedUserRolesForSuperAdmin.filter(i => !roles?.includes(i)), [
    //     roles
    // ]);

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

    const assignRoleOkHandler = async (subject: SubjectType) => {
        const sub = subject.toString();
        try {
            updateAsyncModalLoading();
            const newRoles = roles ? [...roles, sub] : [sub];
            await API.adminUsers.updateUserById({
                id: id,
                roles: newRoles
            });
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success(parseAssignSuccessMessage(sub, username || ''));
            addRoleByUserId({ id, role: sub });
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

    const callRemoveRoleModal = (role: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: removeRoleTitle,
            content: parseRemoveRoleDescription(username || '', role.toString()),
            subject: role,
            onOk: removeRoleOkHandler
        });

    const callAssignModal = (role: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: assigningTitle,
            content: parseAssignRoleDescription(username || '', role.toString()),
            subject: role,
            onOk: assignRoleOkHandler
        });
    const callVerifyModal = (userVerified: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: parseVerifyTitle(!!userVerified),
            content: parseVerifyDescription(!!userVerified, username || ''),
            subject: userVerified,
            onOk: verifyOkHandler
        });
    const callDisableModal = (userDisabled: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: parseDisableTitle(!!userDisabled),
            content: parseDisableDescription(!!userDisabled, username || ''),
            subject: userDisabled,
            onOk: disableOkHandler
        });

    const deleteOkHandler = async (id: SubjectType) => {
        if (typeof id !== 'string') return;

        await usersEffects.loadSingleItemById(id);
    };

    const callDeleteUserModal = (userId: string) => {
        openDeleteOrBlockUserModal({
            userId,
            username: username || '',
            action: 'delete',
            reasonsList: deleteReasonsList,
            onOk: deleteOkHandler
        });
    };

    const callEnableModal = (id: SubjectType) =>
        openAsyncModal({
            visible: true,
            title: parseDisableTitle(false),
            content: parseDisableDescription(false, username || ''),
            subject: id,
            onOk: disableOkHandler
        });

    const callBlockUserModal = (userId: string) => {
        openDeleteOrBlockUserModal({
            userId,
            username: username || '',
            action: 'block',
            reasonsList: deleteReasonsList,
            onOk: deleteOkHandler
        });
    };

    const onBack = () => history.goBack();

    const localeOkHandler = async (subject: SubjectType) => {
        if (typeof subject !== 'string') return;

        try {
            updateAsyncModalLoading();
            await API.adminUsers.updateUserById({
                id: id,
                locale: subject
            });
            await usersEffects.loadSingleItemById(id);
            updateAsyncModalLoading();

            closeAsyncModal();
            message.success('Locale have been updated!');
            changeAbilityByUserId({ id, locale: subject });
        } catch {
            await usersEffects.loadSingleItemById(id);
            updateAsyncModalLoading();
            closeAsyncModal();
            message.error(asyncError);
        }
    };

    const onLocaleSave = (locale: string) => {
        openAsyncModal({
            visible: true,
            title: `Are you sure you want to change ${username} locale?`,
            content: '',
            subject: locale,
            onOk: localeOkHandler,
            modalHeight: '220px'
        });
    };

    const onFindInWOM = () => {
        window.open(getRedirectUrlToWom(id));
    };

    return !isMobile ? (
        <ContentWrapper backgroundColor={grey29} /*height="280px"*/ padding="16px 32px" /*width="1120px"*/>
            <Column width="100%">
                <Section justifyBetween marginBottom="28px">
                    <Row alignCenter>
                        <Column marginRight="24px">
                            <CustomImg
                                pointer
                                height={backImgDiameter}
                                src={backArrowImg}
                                width={backImgDiameter}
                                onClick={onBack}
                            />
                        </Column>
                        <TitleText>User info</TitleText>
                    </Row>
                    <Row alignCenter>
                        <SuperAdministratorLayout>
                            <MarginWrapper marginRight="8px">
                                <CardButton
                                    background={lightBlack}
                                    backgroundHover={hoverGrey2}
                                    color={blue}
                                    textHover={white}
                                    onClick={onFindInWOM}
                                >
                                    Find in WOM admin system
                                </CardButton>
                            </MarginWrapper>
                        </SuperAdministratorLayout>
                        <AdministratorLayout>
                            <Column marginRight="8px">
                                <GenerateReportButton onClick={() => userReportModal.openModal({ id })} />
                            </Column>
                        </AdministratorLayout>
                        {isDisabled ? (
                            <Row alignCenter>
                                <MarginWrapper marginRight="8px">
                                    <BlockInformationText>This User is Blocked or Deleted</BlockInformationText>
                                </MarginWrapper>
                                <CardButton
                                    marginRight="8px"
                                    type="danger"
                                    onClick={() => {
                                        callEnableModal(id);
                                    }}
                                >
                                    Unblock
                                </CardButton>
                            </Row>
                        ) : (
                            <AdministratorLayout>
                                <Column marginRight="8px">
                                    <CardButton onClick={() => callVerifyModal(!isTrusted)}>
                                        {isTrusted ? 'Unverify' : 'Verify'}
                                    </CardButton>
                                </Column>
                                <Column marginRight="8px">
                                    <RolesPopover
                                        disabled={!assignedRoles.length}
                                        setSubject={callAssignModal}
                                        subjects={assignedRoles}
                                        title={assignRoleTitle}
                                        type="down"
                                    >
                                        <CardButton disabled={!assignedRoles.length}>Assign Role</CardButton>
                                    </RolesPopover>
                                </Column>
                            </AdministratorLayout>
                        )}
                        {!isDisabled && (
                            <AdministratorLayout>
                                <CardButton
                                    background={errorColor}
                                    backgroundHover={hoverGrey2}
                                    color={white}
                                    marginRight="8px"
                                    type="danger"
                                    onClick={() => callBlockUserModal(id)}
                                >
                                    Block
                                </CardButton>
                                <CardButton
                                    background={errorColor}
                                    backgroundHover={hoverGrey2}
                                    color={white}
                                    type="danger"
                                    onClick={() => callDeleteUserModal(id)}
                                >
                                    Delete
                                </CardButton>
                            </AdministratorLayout>
                        )}
                    </Row>
                </Section>
                <Section noWrap marginBottom="0">
                    <Column marginRight="24px">
                        <AvatarImg
                            isAccountVerified={isAccountVerified}
                            isDisabled={isDisabled}
                            isTrusted={isTrusted}
                            src={profileImageUrl || ''}
                        />
                    </Column>
                    <Row>
                        <Column width="100%">
                            <Section>
                                <SuperAdministratorLayout>
                                    <UserPropertyWrapper>
                                        <PropertyBlock
                                            copiable
                                            notEllipsisSubtitle
                                            backgroundColor={grey27}
                                            customCopyIcon={whiteCopyIcon}
                                            notVerified={!isAccountVerified}
                                            subtitle={email}
                                            success={copyEmailMessage}
                                            title="EMAIL ADDRESS"
                                            width={propertyBlockWidth}
                                        />
                                    </UserPropertyWrapper>
                                </SuperAdministratorLayout>
                                <SuperAdministratorLayout>
                                    <UserPropertyWrapper>
                                        <PropertyBlock
                                            copiable
                                            notEllipsisSubtitle
                                            backgroundColor={grey27}
                                            customCopyIcon={whiteCopyIcon}
                                            subtitle={mobileNumber}
                                            success={copyPhoneMessage}
                                            title="Phone"
                                            width={propertyBlockWidth}
                                        />
                                    </UserPropertyWrapper>
                                </SuperAdministratorLayout>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        copiable
                                        notEllipsisSubtitle
                                        // titleUppercase
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteCopyIcon}
                                        subtitle={username || ''}
                                        success={copyUsernameMessage}
                                        title="User Name"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        copiable
                                        notEllipsisSubtitle
                                        // titleUppercase
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteCopyIcon}
                                        linkRoute={usersLink}
                                        subtitle={id}
                                        success={copyUserIdMessage}
                                        title="Id"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        // titleUppercase
                                        customCopyIcon={whiteCopyIcon}
                                        subtitle={facilitatorId}
                                        success={copyFacilitatorIdMessage}
                                        title="Facilitator ID"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        backgroundColor={grey27}
                                        // titleUppercase
                                        subtitle={freeStakingRemaining?.toString()}
                                        title="Free stakes remaining"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                {/*<UserPropertyWrapper>*/}
                                {/*    <PropertyBlock subtitle={locale || ''} title="LOCALE" width={propertyBlockWidth} />*/}
                                {/*</UserPropertyWrapper>*/}
                                <UserPropertyWrapper>
                                    <ChangeablePropertyBlock
                                        backgroundColor={grey27}
                                        disabled={access !== Roles.Administrator && access !== Roles.SuperAdministrator}
                                        searchPlaceholder="Input a locale"
                                        selector={localeSelector.nestedSelectors?.map(
                                            ({ selectorName }) => selectorName || ''
                                        )}
                                        subtitle={locale || ''}
                                        title="LOCALE"
                                        width={propertyBlockWidth}
                                        onSave={onLocaleSave}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        isDate
                                        backgroundColor={grey27}
                                        // titleUppercase
                                        subtitle={utcCreated}
                                        title="Created account"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        isDate
                                        backgroundColor={grey27}
                                        // titleUppercase
                                        subtitle={utcUpdated}
                                        title="Updated account"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        isDate
                                        backgroundColor={grey27}
                                        // titleUppercase
                                        subtitle={utcLastAuthentication}
                                        title="Last logged in"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        notEllipsisSubtitle
                                        // titleUppercase
                                        backgroundColor={grey27}
                                        subtitle={location?.countryName || ''}
                                        title="Country"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                                <UserPropertyWrapper>
                                    <PropertyBlock
                                        notEllipsisSubtitle
                                        // titleUppercase
                                        backgroundColor={grey27}
                                        subtitle={location?.area?.region || ''}
                                        title="Region"
                                        width={propertyBlockWidth}
                                    />
                                </UserPropertyWrapper>
                            </Section>
                            <Row>
                                {roles?.length
                                    ? roles.map((item: string) => (
                                          <MarginWrapper key={item} marginBottom="8px" marginRight="8px">
                                              <ClosableTag
                                                  subject={item}
                                                  untouchable={
                                                      defaultUserRoles.includes(item) || access > Roles.Administrator
                                                  }
                                                  onClose={callRemoveRoleModal}
                                              />
                                          </MarginWrapper>
                                      ))
                                    : rolesAbsentMessage}
                            </Row>
                        </Column>
                    </Row>
                </Section>
            </Column>
        </ContentWrapper>
    ) : (
        <ContentWrapper backgroundColor={grey29} /*height="280px"*/ padding="16px 9px" /*width="1120px"*/>
            <Column width="100%">
                <Column justifyBetween width="100%">
                    <Row alignCenter marginBottom="10px">
                        <Column marginRight="24px">
                            <CustomImg
                                pointer
                                height={backImgDiameter}
                                src={backArrowImg}
                                width={backImgDiameter}
                                onClick={onBack}
                            />
                        </Column>
                        <TitleText>User info</TitleText>
                    </Row>
                    <SuperAdministratorLayout>
                        <MarginWrapper marginRight={marginRightWrapperMobile}>
                            <CardButton
                                background={lightBlack}
                                backgroundHover={hoverGrey2}
                                color={blue}
                                textHover={white}
                                onClick={onFindInWOM}
                            >
                                Find in WOM admin system
                            </CardButton>
                        </MarginWrapper>
                    </SuperAdministratorLayout>
                    <Row alignCenter justifyAround width="100%">
                        <AdministratorLayout>
                            <Column marginRight={marginRightWrapperMobile}>
                                <GenerateReportButton onClick={() => userReportModal.openModal({ id })} />
                            </Column>
                        </AdministratorLayout>
                        {isDisabled ? (
                            <MarginWrapper marginRight={marginRightWrapperMobile}>
                                <BlockInformationText>This User is Blocked or Deleted</BlockInformationText>
                            </MarginWrapper>
                        ) : (
                            <AdministratorLayout>
                                <Column marginRight={marginRightWrapperMobile}>
                                    <CardButton
                                        background={lightBlack}
                                        backgroundHover={hoverGrey2}
                                        color={blue}
                                        fontSize="10px"
                                        height="28px"
                                        padding="6px"
                                        textHover={white}
                                        width="35px"
                                        onClick={() => callVerifyModal(!isTrusted)}
                                    >
                                        {isTrusted ? 'Unverify' : 'Verify'}
                                    </CardButton>
                                </Column>
                                <Column marginRight={marginRightWrapperMobile}>
                                    <RolesPopover
                                        disabled={!assignedRoles.length}
                                        setSubject={callAssignModal}
                                        subjects={assignedRoles}
                                        title={assignRoleTitle}
                                        type="down"
                                    >
                                        <CardButton
                                            background={lightBlack}
                                            backgroundHover={hoverGrey2}
                                            color={blue}
                                            disabled={!assignedRoles.length}
                                            fontSize="10px"
                                            height="28px"
                                            padding="6px"
                                            textHover={white}
                                            width="66px"
                                        >
                                            Assign Role
                                        </CardButton>
                                    </RolesPopover>
                                </Column>
                            </AdministratorLayout>
                        )}
                        <AdministratorLayout>
                            <CardButton
                                background={errorColor}
                                backgroundHover={hoverGrey2}
                                color={white}
                                fontSize="10px"
                                height="28px"
                                marginRight={marginRightWrapperMobile}
                                padding="6px"
                                textHover={white}
                                type="danger"
                                width="42px"
                                onClick={() => callDisableModal(!isDisabled)}
                            >
                                {isDisabled ? 'Unblock' : 'Block'}
                            </CardButton>
                        </AdministratorLayout>
                        {!isDisabled && (
                            <AdministratorLayout>
                                <CardButton
                                    background={errorColor}
                                    backgroundHover={hoverGrey2}
                                    color={white}
                                    fontSize="10px"
                                    height="28px"
                                    padding="6px"
                                    textHover={white}
                                    type="danger"
                                    width="44px"
                                    onClick={() => callDeleteUserModal(id)}
                                >
                                    Delete
                                </CardButton>
                            </AdministratorLayout>
                        )}
                    </Row>
                </Column>
                <FlexGrow alignCenter noWrap marginBottom="0">
                    <Column marginBottom="30px" marginTop="16px">
                        <AvatarImg
                            isAccountVerified={isAccountVerified}
                            isDisabled={isDisabled}
                            isTrusted={isTrusted}
                            src={profileImageUrl || ''}
                        />
                    </Column>
                    <Row>
                        <Column width="100%">
                            <Section alignCenter justifyBetween>
                                <SuperAdministratorLayout>
                                    <PropertyBlock
                                        copiable
                                        notEllipsisSubtitle
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteCopyIcon}
                                        fontSize="10px"
                                        marginBottom="8px"
                                        notVerified={!isAccountVerified}
                                        subtitle={email}
                                        success={copyEmailMessage}
                                        title="EMAIL ADDRESS"
                                        width={propertyBlockHalfWidth}
                                    />
                                </SuperAdministratorLayout>
                                <SuperAdministratorLayout>
                                    <PropertyBlock
                                        copiable
                                        backgroundColor={grey27}
                                        customCopyIcon={whiteCopyIcon}
                                        marginBottom="8px"
                                        subtitle={mobileNumber}
                                        success={copyPhoneMessage}
                                        title="Phone"
                                        width={propertyBlockHalfWidth}
                                    />
                                </SuperAdministratorLayout>
                                <PropertyBlock
                                    copiable
                                    notEllipsisSubtitle
                                    // titleUppercase
                                    backgroundColor={grey27}
                                    customCopyIcon={whiteCopyIcon}
                                    marginBottom="8px"
                                    subtitle={username || ''}
                                    success={copyUsernameMessage}
                                    title="User Name"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    notEllipsisSubtitle
                                    // titleUppercase
                                    backgroundColor={grey27}
                                    customCopyIcon={whiteCopyIcon}
                                    linkRoute={usersLink}
                                    marginBottom="8px"
                                    subtitle={id}
                                    success={copyUserIdMessage}
                                    title="Id"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    notEllipsisSubtitle
                                    // titleUppercase
                                    backgroundColor={grey27}
                                    customCopyIcon={whiteCopyIcon}
                                    marginBottom="8px"
                                    subtitle={facilitatorId}
                                    success={copyFacilitatorIdMessage}
                                    title="Facilitator ID"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={grey27}
                                    // titleUppercase
                                    marginBottom="8px"
                                    subtitle={freeStakingRemaining?.toString()}
                                    title="Free stakes remaining"
                                    width={propertyBlockHalfWidth}
                                />
                                {/*<UserPropertyWrapper>*/}
                                {/*    <PropertyBlock subtitle={locale || ''} title="LOCALE" width={propertyBlockWidth} />*/}
                                {/*</UserPropertyWrapper>*/}
                                <ChangeablePropertyBlock
                                    backgroundColor={grey27}
                                    disabled={access !== Roles.Administrator && access !== Roles.SuperAdministrator}
                                    searchPlaceholder="Input a locale"
                                    selector={localeSelector.nestedSelectors?.map(
                                        ({ selectorName }) => selectorName || ''
                                    )}
                                    subtitle={locale || ''}
                                    title="LOCALE"
                                    width={propertyBlockHalfWidth}
                                    onSave={onLocaleSave}
                                />
                                <PropertyBlock
                                    isDate
                                    backgroundColor={grey27}
                                    // titleUppercase
                                    marginBottom="8px"
                                    subtitle={utcCreated}
                                    title="Created account"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    isDate
                                    backgroundColor={grey27}
                                    // titleUppercase
                                    marginBottom="8px"
                                    subtitle={utcUpdated}
                                    title="Updated account"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    isDate
                                    backgroundColor={grey27}
                                    // titleUppercase
                                    marginBottom="8px"
                                    subtitle={utcLastAuthentication}
                                    title="Last logged in"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    notEllipsisSubtitle
                                    // titleUppercase

                                    backgroundColor={grey27}
                                    subtitle={location?.countryName || ''}
                                    title="Country"
                                    width={propertyBlockHalfWidth}
                                />
                                <PropertyBlock
                                    notEllipsisSubtitle
                                    // titleUppercase
                                    backgroundColor={grey27}
                                    subtitle={location?.area?.region || ''}
                                    title="Region"
                                    width={propertyBlockHalfWidth}
                                />
                            </Section>
                            <Row marginTop="16px">
                                {roles?.length
                                    ? roles.map((item: string) => (
                                          <MarginWrapper key={item} marginBottom="8px" marginRight="8px">
                                              <ClosableTag
                                                  subject={item}
                                                  untouchable={
                                                      defaultUserRoles.includes(item) || access > Roles.Administrator
                                                  }
                                                  onClose={callRemoveRoleModal}
                                              />
                                          </MarginWrapper>
                                      ))
                                    : rolesAbsentMessage}
                            </Row>
                        </Column>
                    </Row>
                </FlexGrow>
            </Column>
        </ContentWrapper>
    );
};

interface UserVideosProps {
    videos?: BULLZ.AdminGetVideoResponse[];
    isUserVideos?: boolean;
}

export const UserVideos = ({ videos = [], isUserVideos }: UserVideosProps) => (
    <>
        <Section>
            {videos.length ? (
                videos.map(item => <VideoCard key={item.id} isUserVideos={isUserVideos} {...item} />)
            ) : (
                <Empty title={videosNotFoundMessage} />
            )}
        </Section>
    </>
);
