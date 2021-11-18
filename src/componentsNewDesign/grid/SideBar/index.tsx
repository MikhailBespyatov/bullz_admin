import { useMediaQuery } from '@material-ui/core';
import closeSidebarIcon from 'assets/icons/sideBarIcons/close_sidebar_icon.svg';
import menuImg from 'assets/icons/sideBarIcons/menu_icon.svg';
import { DateBadge } from 'componentsNewDesign/common/badges/DateBadge';
import { TimeBadge } from 'componentsNewDesign/common/badges/TimeBadge';
import { LogoutIcon } from 'componentsNewDesign/common/icons/sideBarIcons';
import { AvatarImg } from 'componentsNewDesign/common/imgComponents/AvatarImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { LogoImg } from 'componentsNewDesign/common/imgComponents/LogoImg';
import { OpacityActiveEffect } from 'componentsNewDesign/dynamic/effects';
import { pageLinkLineHeight } from 'componentsNewDesign/grid/SideBar/constants';
import {
    AdaptiveAbsoluteWrapper,
    AdaptiveRow,
    BlackoutBackground,
    EmailText,
    FixedLogoutWrapper,
    LogoutButton,
    MenuRow,
    PageName,
    PagesWrapper,
    SubPageLink,
    UsernameText,
    Wrapper
} from 'componentsNewDesign/grid/SideBar/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { routesArray } from 'constants/routes';
import { blue2, grey23 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useToggle } from 'hooks/toggle';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { mobileHeaderEvents, mobileHeaderStores } from 'stores/mobileHeader';
import { userEvents, userStores } from 'stores/users/user';
import { parseKeyWithoutId } from 'utils/usefulFunctions';

// interface SideBarProps extends Pick<BULLZ.AdminGetUserCommon, 'isTrusted' | 'isDisabled' | 'isAccountVerified'> {}

export const SideBar = () => {
    const location = useLocation();
    const { user } = useStore(userStores.user);
    const { access } = useStore(userStores.auth);
    const sidebarVisible = useStore(mobileHeaderStores.sidebarVisible);

    const [isExpanded, toggleIsExpanded] = useToggle();
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const avatar = useMemo(() => user?.profile?.profileImageUrl, [user]);
    const username = useMemo(() => user?.username, [user]);
    const email = useMemo(() => user?.email, [user]);

    const currentKey = parseKeyWithoutId(location.pathname);

    //const goTo = (path: string) => () => history.push(path);
    const logout = () => userEvents.logout();

    const onClose = () => {
        mobileHeaderEvents.showSidebar();
    };

    return !isMobile ? (
        <>
            <Wrapper isExpanded={isExpanded}>
                <MarginWrapper marginBottom="35px">
                    <LogoImg />
                </MarginWrapper>

                <ContentWrapper backgroundColor={grey23} borderRadius="4px" padding="5px 10px">
                    <DateBadge color={blue2} />
                    <Section justifyCenter>
                        <TimeBadge color={blue2} />
                    </Section>
                </ContentWrapper>

                <Column alignCenter marginBottom="50px">
                    <MenuRow marginBottom="25px">
                        <ClickableWrapper height="20px" width="20px" onClick={toggleIsExpanded}>
                            <OpacityActiveEffect active={!isExpanded}>
                                <CustomImg height="14px" src={menuImg} width="16px" />
                            </OpacityActiveEffect>
                        </ClickableWrapper>
                    </MenuRow>
                    <Row marginBottom="12px">
                        <AvatarImg
                            // isAccountVerified={isAccountVerified}
                            // isDisabled={isDisabled}
                            // isTrusted={isTrusted}
                            src={avatar || ''}
                        />
                    </Row>
                    <Row marginBottom="8px">
                        <UsernameText isExpanded={isExpanded}>{username}</UsernameText>
                    </Row>
                    <EmailText isExpanded={isExpanded}>{email}</EmailText>
                </Column>
                <PagesWrapper>
                    {routesArray
                        .filter(({ accessList }) => accessList.includes(access))
                        .map(({ path, name, renderIcon }) => (
                            <AdaptiveRow key={path} isExpanded={isExpanded} to={path}>
                                {renderIcon(location.pathname === path, isExpanded)}

                                <RelativeWrapper height="auto" width="fit-content">
                                    <PageName active={location.pathname === path} isExpanded={isExpanded}>
                                        {name}
                                    </PageName>
                                    <AdaptiveAbsoluteWrapper isExpanded={isExpanded} left="0" top={pageLinkLineHeight}>
                                        <Row alignEnd noWrap marginLeft="7px" marginTop="16px">
                                            {/* <SubPageIndicator active={path + '/' === currentKey} isExpanded={isExpanded} /> */}
                                            <SubPageLink>{path + '/' === currentKey && 'Single'}</SubPageLink>
                                        </Row>
                                    </AdaptiveAbsoluteWrapper>
                                </RelativeWrapper>
                            </AdaptiveRow>
                        ))}
                </PagesWrapper>
                {/* <PageLink active={location.pathname === createUserLink} to={createUserLink}>
                {createUserLinkName}
            </PageLink>
            <PageLink active={location.pathname === createProductLink} to={createProductLink}>
                {createProductLinkName}
            </PageLink> */}
                <FixedLogoutWrapper alignCenter justifyCenter isExpanded={isExpanded}>
                    <ClickableWrapper onClick={logout}>
                        <LogoutIcon />
                    </ClickableWrapper>
                    <LogoutButton isExpanded={isExpanded} onClick={logout}>
                        Log Out
                    </LogoutButton>
                </FixedLogoutWrapper>
            </Wrapper>
            {isExpanded && <BlackoutBackground onClick={toggleIsExpanded} />}
        </>
    ) : (
        <>
            <BlackoutBackground isClosed={!sidebarVisible} onClick={onClose}>
                <AbsoluteWrapper right="16px" top="94px">
                    <CustomImg alt="close" height="28px" src={closeSidebarIcon} width="28px" />
                </AbsoluteWrapper>
            </BlackoutBackground>
            <Wrapper isClosed={!sidebarVisible}>
                <ContentWrapper backgroundColor={grey23} borderRadius="4px" marginBottom="8px" padding="5px 10px">
                    <DateBadge color={blue2} />
                    <Section justifyCenter>
                        <TimeBadge color={blue2} />
                    </Section>
                </ContentWrapper>

                <Column alignCenter marginBottom="32px">
                    <Row marginBottom="12px">
                        <AvatarImg
                            // isAccountVerified={isAccountVerified}
                            // isDisabled={isDisabled}
                            // isTrusted={isTrusted}
                            src={avatar || ''}
                        />
                    </Row>
                    <Row marginBottom="8px">
                        <UsernameText>{username}</UsernameText>
                    </Row>
                    <EmailText>{email}</EmailText>
                </Column>
                <PagesWrapper>
                    {routesArray
                        .filter(({ accessList }) => accessList.includes(access))
                        .map(({ path, name, renderIcon }) => (
                            <AdaptiveRow key={path} to={path} onClick={onClose}>
                                {renderIcon(location.pathname === path, isExpanded)}

                                <RelativeWrapper height="auto" width="fit-content">
                                    <PageName active={location.pathname === path}>{name}</PageName>
                                    <AdaptiveAbsoluteWrapper left="0" top={pageLinkLineHeight}>
                                        <Row alignEnd noWrap marginLeft="7px" marginTop="16px">
                                            {/* <SubPageIndicator active={path + '/' === currentKey} isExpanded={isExpanded} /> */}
                                            <SubPageLink>{path + '/' === currentKey && 'Single'}</SubPageLink>
                                        </Row>
                                    </AdaptiveAbsoluteWrapper>
                                </RelativeWrapper>
                            </AdaptiveRow>
                        ))}
                </PagesWrapper>

                <FixedLogoutWrapper alignCenter>
                    <ClickableWrapper onClick={logout}>
                        <LogoutIcon />
                    </ClickableWrapper>
                    <LogoutButton onClick={logout}>Log Out</LogoutButton>
                </FixedLogoutWrapper>
            </Wrapper>
        </>
    );
};

// const { SubMenu } = Menu;

// export const SideBar = ({ isClosed }: SideBarProps) => {
//     const location = useLocation();

//     const currentKey = parseKeyWithoutId(location.pathname);

//     // TODO: [any]
//     const onItemSelect = (item: any) => history.push(item.key);

//     return (
//         <SideBarLayout className="site-layout-background" isClosed={isClosed}>
//             <Menu
//                 mode="inline"
//                 openKeys={[currentKey.slice(0, -1)]}
//                 selectedKeys={[currentKey]}
//                 style={{ height: '100%' }}
//                 onSelect={onItemSelect}
//             >
//                 {routesArray.map(i =>
//                     i.path + '/' !== currentKey ? (
//                         <Menu.Item key={i.path}>{i.name}</Menu.Item>
//                     ) : (
//                         <SubMenu key={i.path} title={i.name} onTitleClick={onItemSelect}>
//                             <Menu.Item key={currentKey} disabled>
//                                 Single
//                             </Menu.Item>
//                         </SubMenu>
//                     )
//                 )}
//             </Menu>
//         </SideBarLayout>
//     );
// };
