import { error403Link } from 'constants/routes';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import { RemoveTrailingSlashRoute } from 'routes/RemoveTrailingSlashRoute';
import { userStores } from 'stores/users/user';
import { AccessList } from 'types/data';

interface PrivateRoute extends RouteProps, AccessList {}

export const PrivateRoute: FC<PrivateRoute> = ({ accessList, ...props }) => {
    const { access } = useStore(userStores.auth);

    if (accessList.includes(access)) return <RemoveTrailingSlashRoute {...props} />;
    else return <Redirect to={error403Link} />;
};
