import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface RemoveTrailingSlashRouteProps extends RouteProps {}

export const RemoveTrailingSlashRoute = (props: RemoveTrailingSlashRouteProps) => {
    const pathname = props?.location?.pathname || '';

    if (pathname.slice(-1) !== '/') return <Route {...props} />;
    return <Redirect to={pathname.slice(0, -1)} />;
};
