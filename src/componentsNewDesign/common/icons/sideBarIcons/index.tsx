import blacklistedIconImg from 'assets/icons/sideBarIcons/blacklisted_icon.svg';
import commentsIconImg from 'assets/icons/sideBarIcons/comments_icon.svg';
import dashboardIconImg from 'assets/icons/sideBarIcons/dashboard_icon.svg';
import logoutIconImg from 'assets/icons/sideBarIcons/logout_icon.svg';
import marketingToolIconImg from 'assets/icons/sideBarIcons/marketing_tool_icon.svg';
import productsIconImg from 'assets/icons/sideBarIcons/products_icon.svg';
import teamsIconImg from 'assets/icons/sideBarIcons/teams_icon.svg';
import trendingsIconImg from 'assets/icons/sideBarIcons/trendings_icon.svg';
import usersIconImg from 'assets/icons/sideBarIcons/users_icon.svg';
import videosIconImg from 'assets/icons/sideBarIcons/videos_icon.svg';
import { AdaptiveProps, AdaptiveWrapper } from 'componentsNewDesign/common/icons/sideBarIcons/styles';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { OpacityActiveEffect } from 'componentsNewDesign/dynamic/effects';
import React from 'react';
import { Active } from 'types/global';

interface Props extends Active, AdaptiveProps {}

export const DashboardIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="17px" src={dashboardIconImg} width="14px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const MarketingToolsIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="23px" src={marketingToolIconImg} width="40px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const VideosIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={videosIconImg} width="13px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const UsersIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={usersIconImg} width="13px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const ProductsIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={productsIconImg} width="20px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const TeamsIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={teamsIconImg} width="20px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const TrendingsIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={trendingsIconImg} width="12px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const CommentsIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={commentsIconImg} width="31px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);
export const BlacklistedIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="18px" src={blacklistedIconImg} width="31px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);

export const LogoutIcon = ({ active, isExpanded }: Props) => (
    <OpacityActiveEffect active={active}>
        <AdaptiveWrapper isExpanded={isExpanded}>
            <CustomImg height="22px" src={logoutIconImg} width="22px" />
        </AdaptiveWrapper>
    </OpacityActiveEffect>
);
