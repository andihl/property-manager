import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import Contract from '../../types/Contract';

const ContractList = (): ReactElement => {
    const history = useHistory();
    const { obj: contracts, loading } = useApi<Contract[]>('GET', '/contract');

    if (loading || !contracts) return <Spinner />

    return (
        <>
            <PageHeader headline="Mietverträge" />

            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>Mieter</th>
                        <th>Wohnung</th>
                        <th>Miete</th>
                        <th>Anzahl Staffeln</th>
                        <th>Startdatum</th>
                        <th>Enddatum</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map(contract => (
                        <tr key={contract._id}>
                            <td>
                                {contract.tenants.map(tenant => tenant.name).join(', ')}
                            </td>
                            <td>{contract.flat[0].name}</td>
                            <td>{contract.fee}</td>
                            <td>{contract.feesteps?.length || 0}</td>
                            <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                            <td>{contract.endDate ? new Date(contract.endDate).toLocaleDateString() : '-'}</td>
                            <td className="right aligned collapsing">
                                <button className="ui tiny button" onClick={() => history.push(`/contracts/${contract._id}/edit`)}>Bearbeiten</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="ui button" onClick={() => history.push('/contracts/create')}>Neuen Vertrag anlegen</button>
        </>
    )
}

export default ContractList;