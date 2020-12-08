import React, { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom';
import css from './PageLayout.module.scss';

const PageLayout = (props: Props): ReactElement => {
    return (
        <>
            <div className="ui menu">
                <div className="ui container">
                    <Link className={`header item ${css.header}`} to="">
                        <h1>Property Manager</h1>
                    </Link>
                    <NavLink to="/" exact className="item">Home</NavLink>
                    <NavLink to="/tenants" className="item">Mieter</NavLink>
                    <NavLink to="/flats" className="item">Wohnungen</NavLink>
                    <NavLink to="/contracts" className="item">Verträge</NavLink>
                    <NavLink to="/operating-costs" className="item">Betriebskosten</NavLink>
                </div>
            </div>
            <div className="ui main container">
                {props.children}
            </div>
        </>
    )
}

interface Props {
    children?: ReactElement
}

export default PageLayout;
