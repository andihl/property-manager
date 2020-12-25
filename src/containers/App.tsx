import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useStore } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';
import Error404 from '../components/Error/Error404';
import Spinner from '../components/Spinner/Spinner';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import PageLayout from '../components/PageLayout/PageLayout';
import Home from './Home/Home';
import TenantList from './Tenant/TenantList';
import TenantCreate from './Tenant/TenantCreate';
import TenantEdit from './Tenant/TenantEdit';
import FlatList from './Flat/FlatList';
import FlatCreate from './Flat/FlatCreate';
import FlatEdit from './Flat/FlatEdit';
import FlatDetails from './Flat/FlatDetails';
import ContractList from './Contract/ContractList';
import ContractCreate from './Contract/ContractCreate';
import ContractEdit from './Contract/ContractEdit';
import ContractDetails from './Contract/ContractDetails';
import OperatingCostList from './OperatingCosts/OperatingCostsList';
import OperatingCostsCreate from './OperatingCosts/OperatingCostsCreate';
import OperatingCostsEdit from './OperatingCosts/OperatingCostsEdit';
import Login from './Login/Login';
import api from '../shared/api';
import Flat from '../types/Flat';

const App = (): ReactElement => {
    const { isAuthenticated } = useAuth0();
    const [loading, setLoading] = useState<boolean>(true);
    const { store, dispatch } = useStore();

    useEffect(() => {
        if (store.flats.length === 0 && (isAuthenticated || process.env.NODE_ENV === 'development')) {
            api<Flat[]>('GET', '/flat', (response) => {
                setLoading(false);
                dispatch({ type: 'UPDATE_FLATS', payload: { flats: response } });
            });
        } else {
            setLoading(false);
        }
    }, [store.flats.length, isAuthenticated, dispatch])

    if (loading) return <Spinner />;

    return (
        <BrowserRouter>
            <PageLayout>
                <Switch>
                    <Route path="/login" exact component={Login} />

                    <ProtectedRoute path="/" exact component={Home} />
                    <ProtectedRoute path="/tenants" exact component={TenantList} />
                    <ProtectedRoute path="/tenants/create" exact component={TenantCreate} />
                    <ProtectedRoute path="/tenants/:id/edit" exact component={TenantEdit} />

                    <ProtectedRoute path="/flats" exact component={FlatList} />
                    <ProtectedRoute path="/flats/create" exact component={FlatCreate} />
                    <ProtectedRoute path="/flats/:id/edit" exact component={FlatEdit} />
                    <ProtectedRoute path="/flats/:id" exact component={FlatDetails} />

                    <ProtectedRoute path="/contracts" exact component={ContractList} />
                    <ProtectedRoute path="/contracts/create" exact component={ContractCreate} />
                    <ProtectedRoute path="/contracts/:id/edit" exact component={ContractEdit} />
                    <ProtectedRoute path="/contracts/:id" exact component={ContractDetails} />

                    <ProtectedRoute path="/operating-costs" exact component={OperatingCostList} />
                    <ProtectedRoute path="/operating-costs/create" exact component={OperatingCostsCreate} />
                    <ProtectedRoute path="/operating-costs/:id/edit" exact component={OperatingCostsEdit} />

                    <Redirect from="/home" to="/" />
                    <Route render={() => <Error404 />} />
                </Switch>
            </PageLayout>
        </BrowserRouter >
    );
}

export default App;
