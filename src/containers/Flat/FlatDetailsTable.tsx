import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';

const FlatDetailsTable = (props: Props): ReactElement => {
    const history = useHistory();
    const { store } = useStore();

    return (
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
                    <td>{props.flat.name}</td>
                </tr>
                <tr>
                    <td>
                        <h4 className="ui header">Größe</h4>
                    </td>
                    <td>{props.flat.size}</td>
                </tr>
                <tr>
                    <td>
                        <h4 className="ui header">Anteilige Größe</h4>
                    </td>
                    <td>{`${(props.flat.size / store.totalSize * 100).toFixed(2)}%`}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button className="ui tiny button" onClick={() => history.push(`/flats/${props.flat._id}/edit`)}>Bearbeiten</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

interface Props {
    flat: Flat
}

export default FlatDetailsTable;