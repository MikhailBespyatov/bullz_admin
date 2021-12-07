import backArrowImg from 'assets/back_arrow.svg';
import history from 'browserHistory';
import { Loader } from 'components/common/dynamic/Loader';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    copyEmailMessage,
    copyUserIdMessage,
    copyUsernameMessage
} from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { backImgDiameter } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription/constants';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultDeletedUsersValues, Roles } from 'constants/defaults/users';
import { grey29, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { statisticsEvents } from 'stores/statistics/statistics';
import { deletedUsersEffects, deletedUsersStores } from 'stores/users/deletedUsers';
import { userStores } from 'stores/users/user';
import {
    deletedUserMarginRight,
    deletedUserPrimaryMargin,
    deletedUserSinglePadding,
    propertyBackground,
    propertyHeight,
    propertyWidth
} from './constants';

export const Emitter = () => {
    const deletedUserIdArr = history.location.pathname.split('/');
    const deletedUserId = deletedUserIdArr[deletedUserIdArr.length - 1];

    const { items } = useStore(deletedUsersStores.deletedUsers);
    const user = items && items[0];
    const loading = useStore(deletedUsersStores.loading);
    const { access } = useStore(userStores.auth);
    const userId = user?.userId;
    const userName = `@${user?.userName}`;
    const email = user?.email;
    const deleterName = user?.deleterInfo?.userName;

    useEffect(() => {
        deletedUsersEffects.loadItems({ ...defaultDeletedUsersValues, deletedUserId });
    }, [deletedUserId]);

    const onBack = () => history.goBack();

    useEffect(() => {
        access < Roles.ContentManager &&
            statisticsEvents.overrideValues({
                userId: deletedUserId
            });
    }, [deletedUserId, access]);

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
                            <Section alignCenter marginBottom="28px">
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
                                    Emitter Info
                                </Span>
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
                                    backgroundColor={propertyBackground}
                                    marginRight={deletedUserPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={deleterName || '-'}
                                    title="deleted by"
                                    width={propertyWidth}
                                />
                            </Section>
                        </>
                    )}
                </ContentWrapper>
            </Section>
        </SingleMainLayout>
    );
};
