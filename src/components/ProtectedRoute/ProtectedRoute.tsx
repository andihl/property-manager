import React, { ReactElement, useEffect } from 'react';
import { Route, RouteProps } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";


const ProtectedRoute = ({ component, path, ...rest }: Props): ReactElement => {

    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        const fn = async () => {
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

    return <Route path={path} component={component} {...rest} />;
};

interface Props extends RouteProps {
    component: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    path: string
}

export default ProtectedRoute;