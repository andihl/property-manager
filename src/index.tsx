import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { StoreProvider } from './store/store';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="genter-strasse.eu.auth0.com"
            clientId="AWpXBmZljd0qwEbDofk8RNMhI7as8mj9"
            redirectUri={window.location.origin}
        >
            <StoreProvider>
                <App />
            </StoreProvider>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
