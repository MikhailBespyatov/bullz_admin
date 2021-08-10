import React from 'react';
import { RouteProps } from 'react-router';
import { AccessRoute } from 'routes/AccessRoute';
import { Roles } from 'constants/defaults/users';
import { PrivateRoute } from './PrivateRoute';

export const AdministratorRoute = (props: RouteProps) => (
    <PrivateRoute accessList={[Roles.SuperAdministrator, Roles.Administrator]} {...props} />
);

export const ContentManagerRoute = (props: RouteProps) => <AccessRoute proxy={Roles.ContentManager} {...props} />;

export const CuratorRoute = (props: RouteProps) => <AccessRoute proxy={Roles.Curator} {...props} />;

export const FacilitatorRoute = (props: RouteProps) => <AccessRoute proxy={Roles.Facilitator} {...props} />;
