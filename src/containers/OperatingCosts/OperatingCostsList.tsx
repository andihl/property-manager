import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import Currency from '../../components/Currency/Currency';
import OperatingCostsBarChart from '../../components/OperatingCosts/OperatingCostsBarChart';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import { useStore } from '../../store/store';
import { calculateForUpcomingYear } from '../../types/Contract';
import OperatingCosts from '../../types/OperatingCosts';

const OperatingCostList = (): ReactElement => {
    const history = useHistory();
    const { store } = useStore();
    const { obj: operatingCosts, setObj: setOperatingCosts, loading, setLoading } = useApi<OperatingCosts[]>('GET', '/operatingcosts?h={"$orderby": {"year": -1}}');

    if (loading || !operatingCosts) return <Spinner />

    const calculateNewOC = (operatingCosts_: OperatingCosts, index: number): void => {
        setLoading(true);
        calculateForUpcomingYear(operatingCosts_, store.totalSize).then(() => {
            const operatingCosts_ = [...operatingCosts];
            operatingCosts_[index] = {
                ...operatingCosts_[index],
                allocated: true
            }
            setOperatingCosts(operatingCosts_);
            setLoading(false);
        });
    }

    return (
        <>
            <PageHeader headline="Betriebskosten" />

            <div className="ui grid">
                <div className="row">
                    <div className="sixteen wide column">
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
                                {operatingCosts.map((operatingCost, index) => (
                                    <tr key={operatingCost._id}>
                                        <td><strong>{operatingCost.year}</strong></td>
                                        <td><Currency value={operatingCost.water} /></td>
                                        <td><Currency value={operatingCost.electricity} /></td>
                                        <td><Currency value={operatingCost.chimneysweep} /></td>
                                        <td><Currency value={operatingCost.insurance} /></td>
                                        <td><Currency value={operatingCost.salary} /></td>
                                        <td><Currency value={operatingCost.garbagedisposal} /></td>
                                        <td><Currency value={operatingCost.garden} /></td>
                                        <td><Currency value={operatingCost.tax} /></td>
                                        <td><Currency value={
                                            operatingCost.water +
                                            operatingCost.electricity +
                                            operatingCost.chimneysweep +
                                            operatingCost.insurance +
                                            operatingCost.salary +
                                            operatingCost.garbagedisposal +
                                            operatingCost.garden +
                                            operatingCost.tax
                                        } />
                                        </td>
                                        <td className="right aligned collapsing">
                                            {!operatingCost.allocated ? (
                                                <>
                                                    <button className="ui tiny button" onClick={() => calculateNewOC(operatingCost, index)}>Umverteilen</button>
                                                    <button className="ui tiny button" onClick={() => history.push(`/operating-costs/${operatingCost._id}/edit`)}>Bearbeiten</button>
                                                </>
                                            ) : (
                                                    <span><i>bereits umverteilt &amp;<br /> Vorauszahlungen berechent</i></span>
                                                )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="ui button" onClick={() => history.push('/operating-costs/create')}>Neue Betriebkosten anlegen</button>
                    </div>
                </div>
                <div className="row">
                    <div className="sixteen wide column">
                        <OperatingCostsBarChart operatingCosts={operatingCosts} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OperatingCostList;