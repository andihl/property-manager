import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../shared/api';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';
import Spinner from '../Spinner/Spinner';

const FlatForm = (props: Props): ReactElement => {
    const history = useHistory();
    const { dispatch } = useStore();

    const [name, setName] = useState<string>(props.flat?.name || '');
    const [size, setSize] = useState<number>(props.flat?.size || 0);
    const [layouts, setLayouts] = useState<string[]>(props.flat?.layouts || []);

    const [loading, setLoading] = useState<boolean>(false);

    const saveFlat = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { name, size, layouts };
        const callback = () => {
            api<Flat[]>('GET', '/flat', (response) => {
                dispatch({ type: 'UPDATE_FLATS', payload: { flats: response } })
                setLoading(false);
                history.push('/flats');
            });
        }

        setLoading(true);
        if (props.flat) {
            api('PUT', `/flat/${props.flat._id}`, callback, data);
        } else {
            api('POST', '/flat', callback, data);
        }
    }

    const onAddLayout = (): void => {
        setLayouts(layouts_ => [...layouts_, '']);
    }

    const onDeleteLayout = (): void => {
        if (layouts.length <= 1) return;

        const layouts_ = [...layouts];
        layouts_.pop();
        setLayouts(layouts_);
    }

    const onEditLayout = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const layouts_ = [...layouts];
        layouts_[index] = event.target.value;
        setLayouts(layouts_);
    }

    if (loading) return <Spinner />;

    return (
        <form className="ui form" onSubmit={saveFlat}>
            <div className="required field">
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required autoComplete="off" />
            </div>
            <div className="required field">
                <label>Größe</label>
                <input type="number" value={size} onChange={e => setSize(+e.target.value)} required autoComplete="off" />
            </div>
            <div className="field">
                <label>Grundriss(e)</label>
                <div className="field">
                    <button className="ui mini button" type="button" onClick={onAddLayout}>+</button>
                    <button className="ui mini button" type="button" onClick={onDeleteLayout}>-</button>
                </div>
                {layouts.map((layout, index) => (
                    <div className="field" key={index} >
                        <input type="text" value={layout} onChange={e => onEditLayout(e, index)} required autoComplete="off" />
                    </div>
                ))}
            </div>

            <button type="submit" className="ui button">Speichern</button>
            <button type="button" className="ui button" onClick={() => { history.push('/flats') }}>Abbrechen</button>
        </form>
    )
}

interface Props {
    flat?: Flat
}

export default FlatForm;