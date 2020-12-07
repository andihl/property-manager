import React, { FormEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../shared/api';
import Tenant from '../../types/Tenant';

const TenantForm = (props: Props): ReactElement => {
    const history = useHistory();

    const [name, setName] = useState(props.tenant?.name || '');
    const [dateOfBirth, setDateOfBirth] = useState<string>(props.tenant?.dateOfBirth.toString().split('T')[0] || '');
    const [address, setAddress] = useState<string>(props.tenant?.address || '');
    const [phone, setPhone] = useState<string>(props.tenant?.phone || '');
    const [email, setEmail] = useState<string>(props.tenant?.email || '');

    const saveTenant = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { name, dateOfBirth: new Date(dateOfBirth), address, phone, email };

        if (props.tenant) {
            api('PUT', `/tenant/${props.tenant._id}`, () => {
                history.push('/tenants');
            }, data);

        } else {
            api('POST', '/tenant', () => {
                history.push('/tenants');
            }, data);
        }
    }

    return (
        <form className="ui form" onSubmit={saveTenant}>

            <div className="required field">
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required autoComplete="off" />
            </div>

            <div className="required field">
                <label>Geburtsdatum</label>
                <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required autoComplete="off" />
            </div>

            <div className="required field">
                <label>Alte Adresse</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required autoComplete="off" />
            </div>

            <div className="field">
                <label>Telefonnummer</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="off" />
            </div>

            <div className="field">
                <label>E-Mail-Adresse</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" />
            </div>

            <button type="submit" className="ui button">Speichern</button>
            <button type="button" className="ui button" onClick={() => { history.push('/tenants') }}>Abbrechen</button>
        </form>
    )
}

interface Props {
    tenant?: Tenant
}

export default TenantForm;