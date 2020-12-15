import React, { Component, ReactElement, useEffect } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";


const ProtectedRoute = ({ component, path, ...rest }: Props): ReactElement => {

    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const fn = async () => {
            if (isLoading || !loginWithRedirect) {
                return
            }

            if (!isAuthenticated) {
                console.log('DDD');
                await loginWithRedirect({
                    redirect_uri: window.location.origin,
                    appState: { targetUrl: path }
                });
            }
        };
        fn();
    }, [isAuthenticated, loginWithRedirect, path, isLoading]);

    const render = (props: RouteComponentProps<any>) => // eslint-disable-line @typescript-eslint/no-explicit-any
        < Component {...props} />;

    return <Route path={path} render={render} component={component} {...rest} />;
};

interface Props extends RouteProps {
    component: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    path: string
}

export default ProtectedRoute;