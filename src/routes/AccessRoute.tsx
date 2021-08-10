import { authLink, homeLink } from 'constants/routes';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { Redirect, RouteProps } from 'react-router';
import { userStores } from 'stores/users/user';
import { Roles } from 'constants/defaults/users';
import { RemoveTrailingSlashRoute } from 'routes/RemoveTrailingSlashRoute';

interface Props extends RouteProps {
    proxy: Roles;
    redirectTo?: string;
    RedirectToComponent?: FC;
}

export const AccessRoute: FC<Props> = ({ proxy, redirectTo = homeLink, RedirectToComponent, ...props }) => {
    const { access } = useStore(userStores.auth);

    if (proxy < Roles.Unknown || proxy >= Roles.Facilitator) return <Redirect to={authLink} />;

    if (access === proxy) return <RemoveTrailingSlashRoute {...props} />;
    else if (RedirectToComponent) return <RedirectToComponent />;
    else return <Redirect to={redirectTo} />;
};
