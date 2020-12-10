import React, { FormEvent, ReactElement, useState } from 'react';
import ContentCard from '../../components/Card/ContentCard';
import { useLogin } from '../../shared/login';
import css from './Login.module.scss';

const Login = (): ReactElement => {
    const { login, message } = useLogin();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login(username, password);
    }

    return (
        <div className={`ui middle aligned center aligned grid ${css.login}`}>
            <div className={`column ${css.column}`}>
                <form className="ui large form" onSubmit={onLogin}>
                    <ContentCard>
                        <>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" placeholder="Benutzername" onChange={e => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" placeholder="Passwort" onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                            {message && <div className="ui red message">{message}</div>}
                            <button className="ui fluid large teal submit button" type="submit">Login</button>
                        </>
                    </ContentCard>
                </form>
            </div>
        </div>
    )
}

export default Login;
