import { Roles } from 'constants/defaults/users';
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { AccessRoute } from 'routes/AccessRoute';
import { MiddlewareRoute } from 'routes/MiddlewareRoute';

export const PublicRoute = (props: RouteProps) => (
    <AccessRoute RedirectToComponent={MiddlewareRoute} proxy={Roles.Unknown} {...props} />
);
