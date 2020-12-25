import React, { ReactElement } from 'react';
import contract from '../../assets/contract.png';
import layout from '../../assets/layout.png';
import electricity from '../../assets/electricity.png';
import person from '../../assets/person.png';
import LinkCard from '../../components/Card/LinkCard';
import { useTitle } from '../../shared/title';

const Home = (): ReactElement => {
    useTitle('Home');

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
