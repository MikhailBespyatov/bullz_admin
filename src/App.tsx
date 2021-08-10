import history from 'browserHistory';
import { AsyncModal } from 'componentsNewDesign/modals/AsyncModal';
import { RemoveOrBanModal } from 'componentsNewDesign/modals/formModals/teams/RemoveOrBanModal';
import { VideoHashtagsEditorModal } from 'componentsNewDesign/modals/formModals/videos/HashtagsEditModal';
import { NotificationModal } from 'componentsNewDesign/modals/Notification';
import { UserReportWrapper } from 'componentsNewDesign/modals/UserReportModal';
import { Roles } from 'constants/defaults/users';
import {
    authLink,
    blacklistedUsersLink,
    createProductLink,
    createTeamLink,
    createUserLink,
    dashboardLink,
    deleteUserLink,
    error401Link,
    error403Link,
    homeLink,
    homePageLink,
    marketingToolsLink,
    productLink,
    productsLink,
    promotionCreateLink,
    statisticsLink,
    teamLink,
    teamsLink,
    trendingsLink,
    userLink,
    usersLink,
    videoLink
} from 'constants/routes';
import { GlobalStyle } from 'constants/styles/global';
import { useSaveScrollPositionAfterFullscreenMode } from 'hooks/saveScrollPositionAfterFullscreenMode';
import { Error401 } from 'pages/401';
import { Error403 } from 'pages/403';
import { Login } from 'pages/Auth';
import { Blacklisted } from 'pages/Blacklisted';
import { CreateProduct } from 'pages/CreateProduct';
import { CreateTeam } from 'pages/CreateTeam';
import { CreateUser } from 'pages/CreateUser';
import { Dashboard } from 'pages/Dashboard';
import { DeleteUser } from 'pages/DeleteUser';
import { Home } from 'pages/Home';
import { Video } from 'pages/Home/Video';
import { MarketingTools } from 'pages/MarketingTools';
import { PromotionCreate } from 'pages/MarketingTools/PromotionCreate';
import { Products } from 'pages/Products';
import { Product } from 'pages/Products/Product';
import { Statistics } from 'pages/Statistics';
import { Teams } from 'pages/Teams';
import { Team } from 'pages/Teams/Team';
import { Trendings } from 'pages/Trendings';
import { Users } from 'pages/Users';
import { User } from 'pages/Users/User';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import { MiddlewareRoute } from 'routes/MiddlewareRoute';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { AdministratorRoute } from 'routes/RolesRoute';

const App = () => {
    useSaveScrollPositionAfterFullscreenMode();

    return (
        <>
            <GlobalStyle />
            <NotificationModal />
            <UserReportWrapper />
            <Router history={history}>
                <VideoHashtagsEditorModal />
                <RemoveOrBanModal />

                <AsyncModal />
                {/*<Modal />*/}
                <Switch>
                    {/* * public */}
                    <PublicRoute exact component={Login} path={authLink} />

                    {/* * home page */}
                    <Route exact component={MiddlewareRoute} path={homePageLink} />

                    {/* * private */}
                    <PrivateRoute
                        exact
                        accessList={[
                            Roles.SuperAdministrator,
                            Roles.Administrator,
                            Roles.Curator,
                            Roles.ContentManager
                        ]}
                        component={Home}
                        path={homeLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[
                            Roles.SuperAdministrator,
                            Roles.Administrator,
                            Roles.Curator,
                            Roles.ContentManager
                        ]}
                        component={Video}
                        path={videoLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={Users}
                        path={usersLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={User}
                        path={userLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={Products}
                        path={productsLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[
                            Roles.SuperAdministrator,
                            Roles.Administrator,
                            Roles.ContentManager,
                            Roles.Curator
                        ]}
                        component={Product}
                        path={productLink}
                    />

                    {/* * admin */}
                    <AdministratorRoute exact component={Dashboard} path={dashboardLink} />
                    <AdministratorRoute exact component={Teams} path={teamsLink} />
                    <AdministratorRoute exact component={Team} path={teamLink} />
                    <AdministratorRoute exact component={Trendings} path={trendingsLink} />
                    <AdministratorRoute exact component={Statistics} path={statisticsLink} />
                    <AdministratorRoute exact component={Blacklisted} path={blacklistedUsersLink} />
                    <AdministratorRoute exact component={MarketingTools} path={marketingToolsLink} />
                    <AdministratorRoute exact component={PromotionCreate} path={promotionCreateLink} />
                    {/* <AdministratorRoute exact component={PromotionUpdate} path={promotionUpdateLink} /> */}
                    {/*<AdministratorRoute exact component={Comments} path={commentsLink} />*/}
                    {/*<AdministratorRoute exact component={Comment} path={commentLink} />*/}

                    {/* * pages to create */}
                    <AdministratorRoute exact component={CreateUser} path={createUserLink} />
                    <AdministratorRoute exact component={DeleteUser} path={deleteUserLink} />
                    <AdministratorRoute exact component={CreateProduct} path={createProductLink} />
                    <AdministratorRoute exact component={CreateTeam} path={createTeamLink} />

                    {/* * error status */}
                    <Route exact component={Error403} path={error403Link} />
                    <Route exact component={Error401} path={error401Link} />

                    <Redirect to={authLink} />
                </Switch>
            </Router>
        </>
    );
};

export default App;
