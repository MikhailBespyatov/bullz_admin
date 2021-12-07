import history from 'browserHistory';
import { AsyncModal } from 'componentsNewDesign/modals/AsyncModal';
import { DeleteOrBlockUserModal } from 'componentsNewDesign/modals/DeleteOrBlockUserModal';
import { ConfirmPromotionActivationModal } from 'componentsNewDesign/modals/formModals/marketingTools/ConfirmPromotionActivationModal';
import { CongratsModal } from 'componentsNewDesign/modals/formModals/marketingTools/CongratsModal';
import { InformationalModal } from 'componentsNewDesign/modals/formModals/marketingTools/InformationalModal';
import { RemoveOrBanModal } from 'componentsNewDesign/modals/formModals/teams/RemoveOrBanModal';
import { VideoHashtagsEditorModal } from 'componentsNewDesign/modals/formModals/videos/HashtagsEditModal';
import { NotificationModal } from 'componentsNewDesign/modals/Notification';
import { StatusModal } from 'componentsNewDesign/modals/StatusModal';
import { UserReportWrapper } from 'componentsNewDesign/modals/UserReportModal';
import { Roles } from 'constants/defaults/users';
import {
    authLink,
    blacklistedUsersLink,
    createTeamLink,
    createTopicLink,
    createUserLink,
    dashboardLink,
    deletedUserLink,
    deletedUsersLink,
    deleteUserLink,
    emitterLink,
    emittersLink,
    error401Link,
    error403Link,
    homeLink,
    homePageLink,
    marketingToolsLink,
    promotionCardLink,
    promotionCreateLink,
    statisticsLink,
    teamLink,
    teamsLink,
    topicLink,
    topicsLink,
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
import { DeletedUsers } from 'pages/DeletedUsers';
import { DeletedUser } from 'pages/DeletedUsers/DeletedUser';
import { DeleteUser } from 'pages/DeleteUser';
import { Emitters } from 'pages/Emitters';
import { Emitter } from 'pages/Emitters/Emitter';
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
import { Redirect, Route, Router, Switch } from 'react-router-dom';
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
                <ConfirmPromotionActivationModal />
                <CongratsModal />
                <InformationalModal />
                <DeleteOrBlockUserModal />
                <StatusModal />

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
                        component={DeletedUsers}
                        path={deletedUsersLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={DeletedUser}
                        path={deletedUserLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={Emitters}
                        path={emittersLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={Emitter}
                        path={emitterLink}
                    />
                    <PrivateRoute
                        exact
                        accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}
                        component={Products}
                        path={topicsLink}
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
                        path={topicLink}
                    />

                    <PrivateRoute
                        exact
                        accessList={[
                            Roles.SuperAdministrator,
                            Roles.Administrator,
                            Roles.ContentManager,
                            Roles.Curator
                        ]}
                        component={PromotionCreate}
                        path={promotionCreateLink}
                    />

                    <PrivateRoute
                        exact
                        accessList={[
                            Roles.SuperAdministrator,
                            Roles.Administrator,
                            Roles.ContentManager,
                            Roles.Curator
                        ]}
                        component={PromotionCreate}
                        path={promotionCardLink}
                    />

                    {/* * admin */}
                    <AdministratorRoute exact component={Dashboard} path={dashboardLink} />
                    <AdministratorRoute exact component={Teams} path={teamsLink} />
                    <AdministratorRoute exact component={Team} path={teamLink} />
                    <AdministratorRoute exact component={Trendings} path={trendingsLink} />
                    <AdministratorRoute exact component={Statistics} path={statisticsLink} />
                    <AdministratorRoute exact component={Blacklisted} path={blacklistedUsersLink} />
                    <AdministratorRoute exact component={MarketingTools} path={marketingToolsLink} />

                    {/*<AdministratorRoute exact component={Comments} path={commentsLink} />*/}
                    {/*<AdministratorRoute exact component={Comment} path={commentLink} />*/}

                    {/* * pages to create */}
                    <AdministratorRoute exact component={CreateUser} path={createUserLink} />
                    <AdministratorRoute exact component={DeleteUser} path={deleteUserLink} />
                    <AdministratorRoute exact component={CreateProduct} path={createTopicLink} />
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
