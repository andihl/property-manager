import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom';
import css from './Layout.module.scss';

const Layout = (props: Props): ReactElement => {
    return (
        <>
            <div className="ui menu">
                <div className="ui container">
                    <div className={`header item ${css.header}`}>
                        <h1>Property Manager</h1>
                    </div>
                    <NavLink to="/" exact className="item">Home</NavLink>
                    <NavLink to="/tenants" exact className="item">Mieter</NavLink>
                    <NavLink to="/flats" exact className="item">Wohnungen</NavLink>
                    <NavLink to="/contracts" exact className="item">Verträge</NavLink>
                    <NavLink to="/operating-costs" exact className="item">Betriebskosten</NavLink>
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

export default Layout;
