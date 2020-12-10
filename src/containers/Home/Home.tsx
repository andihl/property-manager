import React, { ReactElement, useEffect, useState } from 'react';
import contract from '../../assets/contract.png';
import layout from '../../assets/layout.png';
import electricity from '../../assets/electricity.png';
import person from '../../assets/person.png';
import LinkCard from '../../components/Card/LinkCard';
import { useStore } from '../../store/store';
import api from '../../shared/api';
import Flat from '../../types/Flat';
import { Spinner } from '../../components/Spinner/Spinner';

const Home = (): ReactElement => {

    const [loading, setLoading] = useState<boolean>(true);
    const { store, dispatch } = useStore();

    useEffect(() => {
        if (store.flats.length === 0) {
            api<Flat[]>('GET', '/flat', (response) => {
                dispatch({ type: 'UPDATE_FLATS', payload: { flats: response } });
            });
        }
        setLoading(false);
    }, [store.flats, dispatch])

    if (loading) return <Spinner />;

    return (
        <div className="ui grid">
            <div className="eight wide column">
                <LinkCard link="/tenants" image={person} label="Mieter" />
            </div>
            <div className="eight wide column">
                <LinkCard link="/flats" image={layout} label="Wohnungen" />
            </div>
            <div className="eight wide column">
                <LinkCard link="/contracts" image={contract} label="Verträge" />
            </div>
            <div className="eight wide column">
                <LinkCard link="/operating-costs" image={electricity} label="Betriebskosten" />
            </div>
        </div >
    )
}

export default Home;
