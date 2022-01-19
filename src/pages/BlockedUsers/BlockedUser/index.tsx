import backArrowImg from 'assets/back_arrow.svg';
import history from 'browserHistory';
import { Loader } from 'components/common/dynamic/Loader';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ClosableTag } from 'componentsNewDesign/common/tags/ClosableTag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    copyEmailMessage,
    copyPhoneMessage,
    copyUserIdMessage,
    copyUsernameMessage,
    parseDisableDescription,
    parseDisableTitle
} from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { backImgDiameter } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription/constants';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultDisabledUsersValues, ReasonDeletion } from 'constants/defaults/users';
import { errorColor, grey13, grey29, hoverGrey2, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import {
    deletedUserPrimaryMargin,
    deletedUserSinglePadding,
    largePropertyWidth,
    propertyBackground,
    propertyHeight,
    propertyWidth
} from 'pages/DeletedUsers/DeletedUser/constants';
import React, { useEffect } from 'react';
import { modalEvents } from 'stores/modals/asyncModal';
import { blockedUsersEffects, blockedUsersStores } from 'stores/users/disabledUsers';
import { usersEffects } from 'stores/users/users';
import { SubjectType } from 'types/types';
import { deletedUserMarginRight } from './constants';

export const BlockedUser = () => {
    const blockedUserIdArr = history.location.pathname.split('/');
    const blockedUserId = blockedUserIdArr[blockedUserIdArr.length - 1];

    const { items } = useStore(blockedUsersStores.blockedUsers);
    const user = items && items[0];
    const loading = useStore(blockedUsersStores.loading);
    const userId = user?.id;
    const userName = `@${user?.username}`;
    const isDisabled = user?.isDisabled;
    const comment = user?.disablingInfo?.length ? user?.disablingInfo[user.disablingInfo.length - 1].comment : '';
    const disablerId = user?.disablingInfo?.length ? user?.disablingInfo[user.disablingInfo.length - 1].disablerId : '';
    const reasons = user?.disablingInfo?.length ? user?.disablingInfo[user.disablingInfo.length - 1].reasons : [];
    const email = user?.email;
    const mobileNumber = user?.mobileNumber;

    const onBack = () => history.goBack();

    const disableOkHandler = async (id: SubjectType) => {
        if (typeof id !== 'string') return;

        await usersEffects.enableUsersById({ users: [id] });

        onBack();

        modalEvents.closeAsyncModal();
    };

    const callEnableModal = (id: SubjectType) =>
        modalEvents.openAsyncModal({
            visible: true,
            title: parseDisableTitle(false),
            content: parseDisableDescription(false, userName || ''),
            subject: id,
            onOk: disableOkHandler
        });

    useEffect(() => {
        blockedUsersEffects.loadItems({ ...defaultDisabledUsersValues, disabledUserId: blockedUserId });
    }, [blockedUserId]);

    return (
        <SingleMainLayout>
            <Section marginRight={deletedUserMarginRight}>
                <ContentWrapper
                    backgroundColor={grey29}
                    marginBottom={deletedUserPrimaryMargin}
                    marginRight={deletedUserMarginRight}
                    padding={deletedUserSinglePadding}
                    width="100%"
                >
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <>
                            <Section justifyBetween marginBottom="28px">
                                <Row>
                                    <MarginWrapper marginRight="24px">
                                        <CustomImg
                                            pointer
                                            height={backImgDiameter}
                                            src={backArrowImg}
                                            width={backImgDiameter}
                                            onClick={onBack}
                                        />
                                    </MarginWrapper>
                                    <Span color={white} fontSize="18px" fontWeight="600" lineHeight="21px">
                                        Blocked User info
                                    </Span>
                                </Row>
                                {isDisabled && (
                                    <CardButton
                                        background={errorColor}
                                        backgroundHover={hoverGrey2}
                                        color={white}
                                        marginRight="8px"
                                        type="danger"
                                        onClick={() => {
                                            callEnableModal(blockedUserId);
                                        }}
                                    >
                                        Unblock
                                    </CardButton>
                                )}
                            </Section>
                            <Section marginBottom="17px">
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginRight={deletedUserPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={userId}
                                    success={copyUserIdMessage}
                                    title="user id"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginRight={deletedUserPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={userName || '-'}
                                    success={copyUsernameMessage}
                                    title="user name"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginRight={deletedUserPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={email || '-'}
                                    success={copyEmailMessage}
                                    title="Email Address"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginRight={deletedUserPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={disablerId || '-'}
                                    title="Blocked by"
                                    width={propertyWidth}
                                />
                            </Section>
                            <Section marginBottom="16px">
                                <PropertyBlock
                                    notEllipsisSubtitle
                                    backgroundColor={propertyBackground}
                                    marginRight="16px"
                                    minHeight={propertyHeight}
                                    subtitle={comment || '-'}
                                    title="Comment"
                                    width={largePropertyWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    minHeight={propertyHeight}
                                    subtitle={mobileNumber || '-'}
                                    success={copyPhoneMessage}
                                    title="Phone Number"
                                    width={propertyWidth}
                                />
                            </Section>
                            <ContentText uppercase color={grey13} fontSize="10px" fontWeight="500" lineHeight="12px">
                                Reason
                            </ContentText>
                            <Section marginTop={deletedUserPrimaryMargin}>
                                {reasons?.map(reason => (
                                    <ClosableTag
                                        key={reason}
                                        untouchable
                                        marginRight="4px"
                                        subject={ReasonDeletion[reason]}
                                    />
                                ))}
                            </Section>
                        </>
                    )}
                </ContentWrapper>
            </Section>
            {/* <DropdownColumn>
                <DropdownSection title={`User Videos ${videos?.length || '0'}`}>
                    {loading ? (
                        <Section justifyCenter marginBottom="20px">
                            <Loader size="large" />
                        </Section>
                    ) : (
                        videos && videos?.map(it => <Column key={it}>{it}</Column>)

                        // <VideoCardFilterLayout totalRecords={userVideos.totalRecords}>
                        //     <UserVideos videos={userVideos?.items || undefined} />
                        // </VideoCardFilterLayout>
                    )}
                </DropdownSection>
            </DropdownColumn> */}
        </SingleMainLayout>
    );
};
