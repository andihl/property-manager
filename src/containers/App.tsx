import React, { ReactElement } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Error404 from '../components/Error/Error404';
import PageLayout from '../components/PageLayout/PageLayout';
import TenantList from './Tenant/TenantList';
import ContractList from './Contact/ContractList';
import FlatList from './Flat/FlatList';
import OperatingCostList from './OperatingCosts/OperatingCostsList';
import Home from './Home/Home';
import TenantCreate from './Tenant/TenantCreate';
import TenantEdit from './Tenant/TenantEdit';
import FlatCreate from './Flat/FlatCreate';
import FlatEdit from './Flat/FlatEdit';
import ContractCreate from './Contact/ContractCreate';
import ContractEdit from './Contact/ContractEdit';
import OperatingCostsCreate from './OperatingCosts/OperatingCostsCreate';
import OperatingCostsEdit from './OperatingCosts/OperatingCostsEdit';

const App = (): ReactElement => {
    return (
        <BrowserRouter>
            <PageLayout>
                <Switch>
                    <Route path="/" exact component={Home} />

                    <Route path="/tenants" exact component={TenantList} />
                    <Route path="/tenants/create" exact component={TenantCreate} />
                    <Route path="/tenants/:id/edit" exact component={TenantEdit} />

                    <Route path="/flats" exact component={FlatList} />
                    <Route path="/flats/create" exact component={FlatCreate} />
                    <Route path="/flats/:id/edit" exact component={FlatEdit} />

                    <Route path="/contracts" exact component={ContractList} />
                    <Route path="/contracts/create" exact component={ContractCreate} />
                    <Route path="/contracts/:id/edit" exact component={ContractEdit} />

                    <Route path="/operating-costs" exact component={OperatingCostList} />
                    <Route path="/operating-costs/create" exact component={OperatingCostsCreate} />
                    <Route path="/operating-costs/:id/edit" exact component={OperatingCostsEdit} />

                    <Redirect from="/home" to="/" />
                    <Route render={() => <Error404 />} />
                </Switch>
            </PageLayout>
        </BrowserRouter>
    );
}

export default App;
