import React from 'react';
import { RouteProps } from 'react-router';
import { AccessRoute } from 'routes/AccessRoute';
import { Roles } from 'constants/defaults/users';
import { MiddlewareRoute } from 'routes/MiddlewareRoute';

export const PublicRoute = (props: RouteProps) => (
    <AccessRoute RedirectToComponent={MiddlewareRoute} proxy={Roles.Unknown} {...props} />
);
