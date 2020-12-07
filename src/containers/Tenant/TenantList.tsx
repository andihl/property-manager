import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import Tenant from '../../types/Tenant';

const TenantList = (): ReactElement => {
    const history = useHistory();
    const { obj: tenants, loading } = useApi<Tenant[]>('GET', '/tenant');

    if (loading || !tenants) return <Spinner />;

    return (
        <>
            <h1>Mieter</h1>

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