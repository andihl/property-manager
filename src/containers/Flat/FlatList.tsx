import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import LayoutThumbnail from '../../components/Flat/LayoutThumbnail';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import { useStore } from '../../store/store';

const FlatList = (): ReactElement => {
    const history = useHistory();
    const { store } = useStore();

    if (!store.flats) return <Spinner />

    return (
        <>
            <PageHeader headline="Wohnungen" info={`Gesamtgröße aller Wohnungen: ${store.totalSize}㎡`} />

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
                    {store.flats.map(flat => (
                        <tr key={flat._id}>
                            <td>{flat.name}</td>
                            <td>{flat.size}&#13217;</td>
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