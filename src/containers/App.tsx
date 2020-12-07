import React, { ReactElement } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Error404 from '../components/Error/Error404';
import Layout from '../components/Layout/Layout';
import TenantList from './Tenant/TenantList';
import ContractList from './Contact/ContractList';
import FlatList from './Flat/FlatList';
import OperatingCostList from './OperatingCosts/OperatingCostList';
import Home from './Home/Home';
import TenantCreate from './Tenant/TenantCreate';
import TenantEdit from './Tenant/TenantEdit';

const App = (): ReactElement => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/tenants" exact component={TenantList} />
                    <Route path="/tenants/create" exact component={TenantCreate} />
                    <Route path="/tenants/:id/edit" exact component={TenantEdit} />
                    <Route path="/contracts" exact component={ContractList} />
                    <Route path="/flats" exact component={FlatList} />
                    <Route path="/operating-costs" exact component={OperatingCostList} />
                    <Redirect from="/home" to="/" />
                    <Route render={() => <Error404 />} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
