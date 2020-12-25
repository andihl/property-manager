import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from '../Spinner/Spinner';

const ProtectedRoute = ({ component: Component, ...rest }: Props): ReactElement => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (process.env.NODE_ENV === 'development') {
        return (
            <Route {...rest} render={(props) => (
                <Component {...props} />
            )}
            />
        )
    }

    if (isLoading) return <Spinner text="checke Login..." />

    return (
        <Route {...rest} render={(props) => (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />
        )}
        />

    );
}

interface Props extends RouteProps {
    component: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}
export default ProtectedRoute;