import React, { ReactElement } from 'react';
import contract from '../../assets/contract.png';
import layout from '../../assets/layout.png';
import electricity from '../../assets/electricity.png';
import person from '../../assets/person.png';
import Card from '../../components/Card/Card';

const Home = (): ReactElement => {
    return (
        <div className="ui grid">
            <div className="four wide column">
                <Card link="/tenants" image={person} label="Mieter" />
            </div>
            <div className="four wide column">
                <Card link="/flats" image={layout} label="Wohnungen" />
            </div>
            <div className="four wide column">
                <Card link="/contracts" image={contract} label="Verträge" />
            </div>
            <div className="four wide column">
                <Card link="/operating-costs" image={electricity} label="Betriebskosten" />
            </div>
        </div >
    )
}

export default Home;
