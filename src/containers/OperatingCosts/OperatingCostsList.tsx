import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import Currency from '../../components/Currency/Currency';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import OperatingCosts from '../../types/OperatingCosts';

const OperatingCostList = (): ReactElement => {
    const history = useHistory();
    const { obj: operatingCosts, loading } = useApi<OperatingCosts[]>('GET', '/operatingcosts');

    if (loading || !operatingCosts) return <Spinner />

    return (
        <>
            <h1>Betriebskosten</h1>
            <PageHeader headline="Betriebskosten" />

            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>Jahr</th>
                        <th>Wasser</th>
                        <th>Strom</th>
                        <th>Schornsteinfeger</th>
                        <th>Versicherung</th>
                        <th>Gehälter</th>
                        <th>Müllabfuhr</th>
                        <th>Garten</th>
                        <th>Steuern</th>
                        <th>Gesamt</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {operatingCosts.map(operatingCost => (
                        <tr key={operatingCost._id}>
                            <td><strong>{operatingCost.year}</strong></td>
                            <td><Currency value={operatingCost.water} /></td>
                            <td><Currency value={operatingCost.electricity} /></td>
                            <td><Currency value={operatingCost.chimneysweep} /></td>
                            <td><Currency value={operatingCost.insturance} /></td>
                            <td><Currency value={operatingCost.salary} /></td>
                            <td><Currency value={operatingCost.garbagedisposal} /></td>
                            <td><Currency value={operatingCost.garden} /></td>
                            <td><Currency value={operatingCost.tax} /></td>
                            <td><Currency value={
                                operatingCost.water +
                                operatingCost.electricity +
                                operatingCost.chimneysweep +
                                operatingCost.insturance +
                                operatingCost.salary +
                                operatingCost.garbagedisposal +
                                operatingCost.garden +
                                operatingCost.tax
                            } />
                            </td>
                            <td className="right aligned collapsing">
                                <button className="ui tiny button" onClick={() => history.push(`/operating-costs/${operatingCost._id}/edit`)}>Bearbeiten</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="ui button" onClick={() => history.push('/operating-costs/create')}>Neue Betriebkosten anlegen</button>
        </>
    )
}

export default OperatingCostList;