import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useStore } from '../../store/store';


const ProtectedRoute = ({ component: Component, ...rest }: Props): React.ReactElement => {
    const { store } = useStore();
    console.log(store.isLoggedIn);

    return (
        <Route {...rest} render={(props) => (
            store.isLoggedIn === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )}
        />

    );
};

interface Props extends RouteProps {
    component: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default ProtectedRoute;