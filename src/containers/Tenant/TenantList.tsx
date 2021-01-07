import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../shared/api';
import { useSearch } from '../../shared/search';
import { useTitle } from '../../shared/title';
import Tenant from '../../types/Tenant';

const TenantList = (): ReactElement => {
    useTitle('Mieterliste');

    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(true);
    const { setList, filteredList: tenants, search } = useSearch<Tenant>();

    useEffect(() => {
        api<Tenant[]>('GET', '/tenant', tenants => {
            setList(tenants);
            setLoading(false);
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading || !tenants) return <Spinner />;

    return (
        <>
            <PageHeader headline="Mieter">
                <div className="ui icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Suche" onChange={e => search(e.target.value, 'name')} />
                </div>
            </PageHeader>

            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Geburtsdatum</th>
                        <th>Alte Adresse</th>
                        <th>Telefonnummer</th>
                        <th>E-Mail Adresse</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.map(tenant => (
                        <tr key={tenant._id}>
                            <td>{tenant.name}</td>
                            <td>{new Date(tenant.dateOfBirth).toLocaleDateString()}</td>
                            <td>{tenant.address}</td>
                            <td>{tenant.phone}</td>
                            <td>{tenant.email}</td>
                            <td className="right aligned collapsing">
                                <button className="ui tiny button" onClick={() => history.push(`/tenants/${tenant._id}/edit`)}>Bearbeiten</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="ui button" onClick={() => { history.push('/tenants/create') }}>Neuen Mieter erstellen</button>
        </>
    )
}

export default TenantList;