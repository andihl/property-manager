import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import LayoutThumbnail from '../../components/Flat/LayoutThumbnail';
import PageHeader from '../../components/PageHeader/PageHeader';
import Spinner from '../../components/Spinner/Spinner';
import { useTitle } from '../../shared/title';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';

const FlatList = (): ReactElement => {
    useTitle('Wohnungsliste');

    const history = useHistory();
    const { store } = useStore();

    const [flats, setFlats] = useState<Flat[]>(store.flats);

    if (!store.flats) return <Spinner />

    const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm === '') {
            setFlats(store.flats);
        } else {
            const tmp = store.flats.filter(flat => {
                return flat.name.toLowerCase().includes(searchTerm);
            })
            setFlats(tmp);
        }
    }

    return (
        <>
            <PageHeader headline="Wohnungen">
                <div className="ui icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Suche" onChange={e => onSearch(e)} />
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