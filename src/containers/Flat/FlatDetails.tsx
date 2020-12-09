import React, { ReactElement, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import api from '../../shared/api';
import { useStore } from '../../store/store';
import Contract from '../../types/Contract';
import Flat from '../../types/Flat';
import css from './FlatDetails.module.scss';

const FlatDetails = (): ReactElement => {
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const { store } = useStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [flat, setFlat] = useState<Flat>();
    const [contract, setContract] = useState<Contract | null>(null);

    useEffect(() => {
        setLoading(true);
        api<Flat>('GET', `/flat/${params.id}`, (flat) => {
            setFlat(flat);
            api<Contract[]>('GET', `/contract?q={"$or":[{"endDate":{"$exists":false}},{"endDate":{"$gt":{"$date":"$now"}}}],"startDate":{"$lte":{"$date":"$now"}},"flat":{"_id":"5fce374f3439f0540003bfe8"}}`, (contracts) => {
                setContract(contracts?.length > 0 ? contracts[0] : null);
                setLoading(false);
            });
        })
    }, [params.id])

    if (loading || !flat) return <Spinner />

    return (
        <>
            <PageHeader headline={`Wohnung ${flat.name}`} />

            <div className={`${css.infoSection}`}>
                <div className="ui grid">
                    <div className="four wide column">
                        <div>
                            <div className={`ui card ${css.card}`}>
                                <div className="content">
                                    <table className="ui very basic celled table">
                                        <thead>
                                            <tr>
                                                <th colSpan={2}><h3>Details</h3></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h4 className="ui header">Name</h4>
                                                </td>
                                                <td>{flat.name}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h4 className="ui header">Größe</h4>
                                                </td>
                                                <td>{flat.size}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h4 className="ui header">Anteilige Größe</h4>
                                                </td>
                                                <td>{`${(flat.size / store.totalSize * 100).toFixed(2)}%`}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <button className="ui tiny button" onClick={() => history.push(`/flats/${flat._id}/edit`)}>Bearbeiten</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={`ui card ${css.card}`}>
                                <div className="content">
                                    <table className="ui very basic celled table">
                                        <thead>
                                            <tr>
                                                <th colSpan={2}><h3>Aktueller Vertrag</h3></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contract ? (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <h4 className="ui header">Mieter</h4>
                                                        </td>
                                                        <td>
                                                            {contract.tenants.map((tenant, index) => <div key={index}><Link to={`/tenant/${tenant._id}/edit`} >{tenant.name}</Link></div>)}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h4 className="ui header">Basismiete</h4>
                                                        </td>
                                                        <td>{contract.fee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h4 className="ui header">Anzahl Staffeln</h4>
                                                        </td>
                                                        <td>{contract.feesteps?.length || 0}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h4 className="ui header">Startdatum</h4>
                                                        </td>
                                                        <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h4 className="ui header">Enddatum</h4>
                                                        </td>
                                                        <td>{contract.endDate ? new Date(contract.endDate).toLocaleDateString() : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <button className="ui tiny button" onClick={() => history.push(`/contracts/${contract._id}/edit`)}>Bearbeiten</button>
                                                        </td>
                                                    </tr>
                                                </>
                                            ) : (
                                                    <tr>
                                                        <td colSpan={2}><i>Kein Vertrag vorhanden</i></td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="twelve wide column">
                        <div className={`ui card ${css.card}`}>
                            <div className="content">
                                {flat.layouts.map((layout, index) => (
                                    <Link to={`https://www.roomle.com/app/editor/${layout}`} target="_blank" key={index}>
                                        <img src={`https://uploads.roomle.com/plans/${layout}/thumbnail.png`} className={css.layout} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default FlatDetails;