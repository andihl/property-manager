import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom';
import css from './PageLayout.module.scss';

const PageLayout = (props: Props): ReactElement => {
    const { logout, isAuthenticated } = useAuth0();

    const logoutWithRedirect = () => {
        logout({
            returnTo: window.location.origin,
        });
    }

    return (
        <>
            <div className="ui menu">
                <div className="ui container">
                    <Link className={`header item ${css.header}`} to="">
                        <h1>Property Manager</h1>
                    </Link>
                    {isAuthenticated || process.env.NODE_ENV === 'development' && (
                        <>
                            <NavLink to="/" exact className="item">Home</NavLink>
                            <NavLink to="/tenants" className="item">Mieter</NavLink>
                            <NavLink to="/flats" className="item">Wohnungen</NavLink>
                            <NavLink to="/contracts" className="item">Verträge</NavLink>
                            <NavLink to="/operating-costs" className="item">Betriebskosten</NavLink>
                            <div className="item aligned right" onClick={logoutWithRedirect}>Logout</div>
                        </>
                    )}
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
