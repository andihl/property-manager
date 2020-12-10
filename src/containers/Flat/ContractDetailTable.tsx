import React, { ReactElement } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Contract from '../../types/Contract';

const ContractDetailTable = (props: Props): ReactElement => {
    const history = useHistory();

    return (
        <table className="ui very basic celled table">
            <thead>
                <tr>
                    <th colSpan={2}><h3>Aktueller Vertrag</h3></th>
                </tr>
            </thead>
            <tbody>
                {props.contract ? (
                    <>
                        <tr>
                            <td>
                                <h4 className="ui header">Mieter</h4>
                            </td>
                            <td>
                                {props.contract.tenants.map((tenant, index) => (
                                    <div key={index}>
                                        <Link to={`/tenant/${tenant._id}/edit`} >{tenant.name}</Link>
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4 className="ui header">Basismiete</h4>
                            </td>
                            <td>{props.contract.fee}</td>
                        </tr>
                        <tr>
                            <td>
                                <h4 className="ui header">Anzahl Staffeln</h4>
                            </td>
                            <td>{props.contract.feesteps?.length || 0}</td>
                        </tr>
                        <tr>
                            <td>
                                <h4 className="ui header">Startdatum</h4>
                            </td>
                            <td>{new Date(props.contract.startDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>
                                <h4 className="ui header">Enddatum</h4>
                            </td>
                            <td>{props.contract.endDate ? new Date(props.contract.endDate).toLocaleDateString() : '-'}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className="ui tiny button" onClick={() => history.push(`/contracts/${props.contract?._id}/edit`)}>Bearbeiten</button>
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
    )
}

interface Props {
    contract?: Contract | null
}

export default ContractDetailTable;