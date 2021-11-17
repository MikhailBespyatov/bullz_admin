import { Roles } from 'constants/defaults/users';
import { authLink, homeLink } from 'constants/routes';
import { useStore } from 'effector-react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { userStores } from 'stores/users/user';

export const MiddlewareRoute = () => {
    const { access } = useStore(userStores.auth);

    switch (access) {
        case Roles.Administrator:
            return <Redirect to={homeLink} />;
        case Roles.SuperAdministrator:
            return <Redirect to={homeLink} />;
        case Roles.ContentManager:
            return <Redirect to={homeLink} />;
        case Roles.Curator:
            return <Redirect to={homeLink} />;
        case Roles.Facilitator:
            return <Redirect to={homeLink} />;
        case Roles.Unknown:
            return <Redirect to={authLink} />;
    }
};
