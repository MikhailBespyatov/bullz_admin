import {
    BlacklistedIcon,
    DashboardIcon,
    MarketingToolsIcon,
    TeamsIcon,
    TopicsIcon,
    TrendingsIcon,
    UsersIcon,
    VideosIcon
} from 'componentsNewDesign/common/icons/sideBarIcons';
import { Roles } from 'constants/defaults/users';
import React from 'react';
import { RoutesArray } from 'types/global';

export const initialLink = '/';
export const dashboardLink = '/dashboard';
export const authLink = '/login';
export const homeLink = '/videos';
export const videoLink = '/videos/:videoId';
export const usersLink = '/users';
export const userLink = '/users/:userId';
export const productsLink = '/products';
export const productLink = '/products/:productId';
export const topicsLink = '/topics';
export const topicLink = '/topics/:topicId';
export const teamsLink = '/teams';
export const teamLink = '/teams/:teamId';
export const trendingsLink = '/trendings';
export const createUserLink = '/create_user';
export const deleteUserLink = '/delete_user';
export const createProductLink = '/create_product';
export const createTeamLink = '/create_team';
export const commentsLink = '/comments';
export const commentLink = '/comments/:commentId';
export const homePageLink = '/home';
export const statisticsLink = '/registered_events';
export const blacklistedUsersLink = '/blacklisted_users';
export const marketingToolsLink = '/marketing_tools';
export const promotionCreateLink = '/marketing_tools/promotion_create';
export const promotionCardLink = '/marketing_tools/:promotionId';

export const dashboardLinkName = 'Dashboard';
export const authLinkName = 'Log out';
export const homeLinkName = 'Videos';
export const usersLinkName = 'Users';
export const productsLinkName = 'Products';
export const teamsLinkName = 'Teams';
export const trendingsLinkName = 'Trendings';
export const commentsLinkName = 'Comments';
export const statisticsLinkName = 'Registered events';
export const blacklistedUsersLinkName = 'Blacklisted';
export const marketingToolsLinkName = 'Marketing Tools';
export const topicsLinkName = 'Topics';

export const createUserLinkName = 'Create user';
export const deleteUserLinkName = 'Delete users in bulk';
export const createProductLinkName = 'Create product';
export const createTeamLinkName = 'Create team';
export const error403Link = '/403';
export const error401Link = '/401';

export const routesArray: RoutesArray[] = [
    {
        path: dashboardLink,
        name: dashboardLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <DashboardIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.Administrator, Roles.SuperAdministrator]
    },
    {
        path: marketingToolsLink,
        name: marketingToolsLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => (
            <MarketingToolsIcon active={active} isExpanded={isExpanded} />
        ),
        accessList: [Roles.SuperAdministrator, Roles.Administrator]
    },
    {
        path: homeLink,
        name: homeLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <VideosIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager, Roles.Curator]
    },
    {
        path: usersLink,
        name: usersLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <UsersIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]
    },
    {
        path: topicsLink,
        name: topicsLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <TopicsIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]
    },
    {
        path: teamsLink,
        name: teamsLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <TeamsIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.SuperAdministrator, Roles.Administrator]
    },
    {
        path: trendingsLink,
        name: trendingsLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <TrendingsIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.SuperAdministrator, Roles.Administrator]
    },
    {
        path: statisticsLink,
        name: statisticsLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => <DashboardIcon active={active} isExpanded={isExpanded} />,
        accessList: [Roles.SuperAdministrator, Roles.Administrator]
    },
    {
        path: blacklistedUsersLink,
        name: blacklistedUsersLinkName,
        renderIcon: (active: boolean, isExpanded: boolean) => (
            <BlacklistedIcon active={active} isExpanded={isExpanded} />
        ),
        accessList: [Roles.SuperAdministrator, Roles.Administrator]
    }
    // {
    //     path: commentsLink,
    //     name: commentsLinkName,
    //     renderIcon: (active: boolean, isExpanded: boolean) => <CommentsIcon active={active} isExpanded={isExpanded} />,
    //     accessList: [Roles.Administrator]
    // }
];
