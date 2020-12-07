import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import LayoutThumbnail from '../../components/Flat/LayoutThumbnail';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import Flat from '../../types/Flat';

const FlatList = (): ReactElement => {
    const history = useHistory();

    const { obj: flats, loading } = useApi<Flat[]>('GET', '/flat');

    if (loading || !flats) return <Spinner />

    return (
        <>
            <h1>Wohnugen</h1>

            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Größe</th>
                        <th>Grundriss(e)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {flats.map(flat => (
                        <tr key={flat._id}>
                            <td>{flat.name}</td>
                            <td>{flat.size}</td>
                            <td>
                                <div >
                                    {flat.layouts.map((layout, index) => (
                                        <LayoutThumbnail layout={layout} key={index} />
                                    ))}
                                </div>
                            </td>
                            <td className="right aligned collapsing">
                                <button className="ui tiny button" onClick={() => history.push(`/flats/${flat._id}/edit`)}>Bearbeiten</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="ui button" onClick={() => { history.push('/flats/create') }}>Neue Wohnung erstellen</button>
        </>
    )
}

export default FlatList;