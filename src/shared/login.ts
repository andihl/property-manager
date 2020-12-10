import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../store/store";

export const useLogin = (): { login: (username: string, password: string) => void, logout: () => void, message: string } => {
    const history = useHistory();
    const { dispatch } = useStore();
    const [message, setMessage] = useState<string>('');

    const login = (username: string, password: string): void => {
        if (username === 'admin' && password === 'test') {
            localStorage.setItem('loggedIn', 'true');
            dispatch({ type: 'LOGIN' });
            setMessage('');
            history.push('');
        } else {
            setMessage('Benutzername und Password stimmen nicht überein');
        }
    }

    const logout = (): void => {
        localStorage.removeItem('loggedIn');
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
    }

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            console.log('AAA');
            dispatch({ type: 'LOGIN' });
            history.push('');
        } else {
            console.log('BBB');
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
        }
    }, [history]);

    return { login, logout, message };
}