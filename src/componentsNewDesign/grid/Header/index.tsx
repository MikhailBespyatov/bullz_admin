import { useMediaQuery } from '@material-ui/core';
import bullzMobileLogo from 'assets/bullz_logo_white.svg';
import burgerMenuIcon from 'assets/icons/burger_menu.svg';
import filterMobileIcon from 'assets/icons/filter_icon_mobile.svg';
import searchMobileIcon from 'assets/icons/search_mobile_icon.svg';
import history from 'browserHistory';
import { GroupedButton, GroupedButtons } from 'components/common/buttons/GroupedButton';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { mobileIconsSize } from 'componentsNewDesign/grid/Header/constants';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { AbsoluteCenterAlignment } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import {
    createProductLink,
    createProductLinkName,
    createUserLink,
    createUserLinkName,
    deleteUserLink,
    deleteUserLinkName
} from 'constants/routes';
import { appVersion, environmentBASY } from 'constants/services';
import { errorColor } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { mobileHeaderEvents, mobileHeaderStores } from 'stores/mobileHeader';
import { HeaderWrapper, MobileHeaderWrapper, VersionSpan } from './styles';

export const Header = () => {
    const sidebarVisible = useStore(mobileHeaderStores.sidebarVisible);
    const filterVisible = useStore(mobileHeaderStores.filterVisible);
    const searchVisible = useStore(mobileHeaderStores.searchVisible);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const onBurger = () => {
        if (filterVisible) mobileHeaderEvents.showFilter();
        if (searchVisible) mobileHeaderEvents.showSearch();
        mobileHeaderEvents.showSidebar();
    };

    const onSearch = () => {
        if (filterVisible) mobileHeaderEvents.showFilter();
        if (sidebarVisible) mobileHeaderEvents.showSidebar();
        mobileHeaderEvents.showSearch();
    };

    const onFilter = () => {
        if (searchVisible) mobileHeaderEvents.showSearch();
        if (sidebarVisible) mobileHeaderEvents.showSidebar();
        mobileHeaderEvents.showFilter();
    };

    const handleCreateUser = () => history.push(createUserLink);
    const handleDeleteUser = () => history.push(deleteUserLink);
    const handleCreateProduct = () => history.push(createProductLink);

    return !isMobile ? (
        <HeaderWrapper>
            <Row alignCenter>
                <VersionSpan>
                    {appVersion} BASY: {environmentBASY}
                    {/*{appVersion} BULLZ: {environmentBULLZ}*/}
                </VersionSpan>
                <AdministratorLayout>
                    <Row marginRight="20px">
                        <GroupedButtons>
                            <GroupedButton onClick={handleCreateProduct}>{createProductLinkName}</GroupedButton>
                            <GroupedButton onClick={handleCreateUser}>{createUserLinkName}</GroupedButton>
                            <GroupedButton color={errorColor} onClick={handleDeleteUser}>
                                {deleteUserLinkName}
                            </GroupedButton>
                        </GroupedButtons>
                    </Row>
                </AdministratorLayout>
            </Row>
        </HeaderWrapper>
    ) : (
        <MobileHeaderWrapper>
            {!sidebarVisible ? (
                <ClickableWrapper onClick={onBurger}>
                    <CustomImage alt="menu" height={mobileIconsSize} src={burgerMenuIcon} width={mobileIconsSize} />
                </ClickableWrapper>
            ) : (
                <div />
            )}
            <AbsoluteCenterAlignment>
                <CustomImage alt="yeay logo" height="auto" src={bullzMobileLogo} width="66px" />
            </AbsoluteCenterAlignment>

            <Row alignCenter>
                <MarginWrapper marginRight="16px">
                    <ClickableWrapper onClick={onSearch}>
                        <CustomImage alt="search" height="16px" src={searchMobileIcon} width="16px" />
                    </ClickableWrapper>
                </MarginWrapper>
                <MarginWrapper marginRight="16px">
                    <ClickableWrapper onClick={onFilter}>
                        <CustomImage
                            alt="filter"
                            height={mobileIconsSize}
                            src={filterMobileIcon}
                            width={mobileIconsSize}
                        />
                    </ClickableWrapper>
                </MarginWrapper>
                <AdministratorLayout>
                    <Row>
                        <GroupedButtons>
                            <GroupedButton onClick={handleCreateProduct}>{createProductLinkName}</GroupedButton>
                            <GroupedButton onClick={handleCreateUser}>{createUserLinkName}</GroupedButton>
                            <GroupedButton color={errorColor} onClick={handleDeleteUser}>
                                {deleteUserLinkName}
                            </GroupedButton>
                        </GroupedButtons>
                    </Row>
                </AdministratorLayout>
            </Row>

            <VersionSpan>
                {appVersion} BASY: {environmentBASY}
            </VersionSpan>
        </MobileHeaderWrapper>
    );
};
