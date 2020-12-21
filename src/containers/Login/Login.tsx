import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactElement } from 'react';
import ContentCard from '../../components/Card/ContentCard';
import css from './Login.module.scss';

const Login = (): ReactElement => {
    const { loginWithRedirect } = useAuth0();

    const onLogin = () => {
        loginWithRedirect({
            redirect_uri: window.location.origin,
            appState: { targetUrl: '' }
        });
    }

    return (
        <div className={`ui middle aligned center aligned grid ${css.login}`}>
            <div className={`column ${css.column}`}>
                <ContentCard>
                    <button className="ui button huge" onClick={onLogin}>Login</button>
                </ContentCard>
            </div>
        </div>
    )
}

export default Login;