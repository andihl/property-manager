import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import LayoutThumbnail from '../../components/Flat/LayoutThumbnail';
import PageHeader from '../../components/PageHeader/PageHeader';
import Spinner from '../../components/Spinner/Spinner';
import { useSearch } from '../../shared/search';
import { useTitle } from '../../shared/title';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';

const FlatList = (): ReactElement => {
    useTitle('Wohnungsliste');

    const history = useHistory();
    const { store } = useStore();
    const { setList, filteredList: flats, search } = useSearch<Flat>();

    useEffect(() => {
        setList(store.flats);
    }, [store.flats]) // eslint-disable-line react-hooks/exhaustive-deps

    if (!store.flats || !flats) return <Spinner />

    return (
        <>
            <PageHeader headline="Wohnungen">
                <div className="ui icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Suche" onChange={e => search(e.target.value, 'name')} />
                </div>
            </PageHeader>

            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Größe</th>
                        <th>Grundriss(e)</th>
                        <th>
                            {`Gesamtgröße aller Wohnungen: ${store.totalSize}`}&#13217;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {flats.map(flat => (
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
                                <button className="ui tiny button" onClick={() => history.push(`/flats/${flat._id}`)}>Details</button>
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