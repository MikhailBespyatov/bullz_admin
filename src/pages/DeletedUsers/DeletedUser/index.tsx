import backArrowImg from 'assets/back_arrow.svg';
import history from 'browserHistory';
import { Loader } from 'components/common/dynamic/Loader';
import { StatisticsTable } from 'components/common/tables/StatisticsTable';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { DropdownColumn, DropdownSection } from 'componentsNewDesign/common/dropdowns/SectionDropdown';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    copyEmailMessage,
    copyPhoneMessage,
    copyUserIdMessage,
    copyUsernameMessage
} from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { backImgDiameter } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription/constants';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { defaultDeletedUsersValues, ReasonDeletion, Roles } from 'constants/defaults/users';
import { grey13, grey29, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { Reason } from 'pages/DeletedUsers/styles';
import React, { useEffect } from 'react';
import { statisticsEvents, statisticsStores } from 'stores/statistics/statistics';
import { deletedUsersEffects, deletedUsersStores } from 'stores/users/deletedUsers';
import { userStores } from 'stores/users/user';
import {
    deletedUserMarginRight,
    deletedUserPrimaryMargin,
    deletedUserSinglePadding,
    largePropertyWidth,
    propertyBackground,
    propertyHeight,
    propertyWidth
} from './constants';

export const DeletedUser = () => {
    const deletedUserIdArr = history.location.pathname.split('/');
    const deletedUserId = deletedUserIdArr[deletedUserIdArr.length - 1];

    const { items } = useStore(deletedUsersStores.deletedUsers);
    const user = items && items[0];
    const loading = useStore(deletedUsersStores.loading);
    const loadingStatistics = useStore(statisticsStores.initialLoading);
    const { items: itemsStatistics, totalRecords: totalRecordsStatistics } = useStore(statisticsStores.statistics);
    const { pageIndex: statisticsPageIndex, limit: statisticsLimit } = useStore(statisticsStores.values);
    const { access } = useStore(userStores.auth);
    const userId = user?.userId;
    const userName = `@${user?.userName}`;
    const email = user?.email;
    const deleterName = user?.deleterInfo?.userName;
    const comment = user?.comment;
    const mobileNumber = user?.mobileNumber;
    const reasons = user?.reasons;

    useEffect(() => {
        deletedUsersEffects.loadItems({ ...defaultDeletedUsersValues, deletedUserId });
    }, [deletedUserId]);

    const onBack = () => history.goBack();

    const onStatisticsCurrentPageChange = (page: number, pageSize: number | undefined) =>
        statisticsEvents.updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

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
                                    Deleted User info
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
                            <Section marginBottom="16px">
                                <PropertyBlock
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
                                    <Reason key={reason}>{ReasonDeletion[reason]}</Reason>
                                ))}
                            </Section>
                        </>
                    )}
                </ContentWrapper>
            </Section>
            <Section marginBottom={deletedUserPrimaryMargin}>
                <AdministratorLayout>
                    <DropdownColumn>
                        <DropdownSection title="User statistics">
                            {loadingStatistics ? (
                                <Section justifyCenter>
                                    <Loader size="large" />
                                </Section>
                            ) : (
                                <>
                                    <Section marginBottom="20px">
                                        <StatisticsTable items={itemsStatistics} removeItem="userId" />
                                    </Section>
                                    <Pagination
                                        currentIndex={statisticsPageIndex + 1}
                                        defaultSize={statisticsLimit}
                                        totalItems={totalRecordsStatistics}
                                        onSizeChange={onStatisticsCurrentPageChange}
                                    />
                                </>
                            )}
                        </DropdownSection>
                    </DropdownColumn>
                </AdministratorLayout>
            </Section>
            <DropdownColumn>
                <DropdownSection title="User Videos">
                    {loading ? (
                        <Section justifyCenter marginBottom="20px">
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <Column>{items?.map(item => item.videoIds)}</Column>
                    )}
                </DropdownSection>
            </DropdownColumn>
        </SingleMainLayout>
    );
};
