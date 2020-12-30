import React, { ChangeEvent, FormEvent, ReactElement, useMemo, useState } from 'react'
import api, { useApi } from '../../shared/api';
import Contract from '../../types/Contract';
import Flat from '../../types/Flat';
import Tenant from '../../types/Tenant';
import Spinner from '../Spinner/Spinner';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import FeeStep from '../../types/FeeStep';
import { useFlashMessage } from '../../shared/flashMessage';

const ContractForm = (props: Props): ReactElement => {
    const history = useHistory();
    const { setFlashMessage } = useFlashMessage();

    const [selectedTenants, setSelectedTenants] = useState<any>(() => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!props.contract) return [];

        return props.contract.tenants.map((tenant: Tenant) => {
            return { value: tenant._id, label: tenant.name };
        });
    });
    const [selectedFlat, setSelectedFlat] = useState<any>(() => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!props.contract) return null;

        return {
            value: props.contract.flat[0]._id,
            label: props.contract.flat[0].name
        };
    });
    const [deposit, setDeposit] = useState<number>(0);
    const [fee, setFee] = useState<number>(props.contract?.fee || 0);
    const [steps, setSteps] = useState<FeeStep[]>(props.contract?.feesteps || []);
    const [startDate, setStartDate] = useState<string>(props.contract?.startDate.toString().split('T')[0] || '');
    const [endDate, setEndDate] = useState<string>(props.contract?.endDate?.toString().split('T')[0] || '');

    const { obj: flats, loading: loadingFlats } = useApi<Flat[]>('GET', '/flat');
    const { obj: tenants, loading: loadingTenants } = useApi<Tenant[]>('GET', '/tenant');

    const tenantFieldOptions = useMemo(() => {
        return tenants?.map(tenant => {
            return { value: tenant._id, label: tenant.name };
        })
    }, [tenants]);

    const flatFieldOptions = useMemo(() => {
        return flats?.map(flat => {
            return { value: flat._id, label: flat.name };
        });
    }, [flats])

    if (loadingFlats || loadingTenants) return <Spinner />

    const onAddStep = (): void => {
        setSteps([...steps, { year: new Date().getFullYear(), amount: 0 }]);
    }

    const onDeleteStep = (): void => {
        if (steps.length === 0) return;

        const steps_ = [...steps];
        steps_.pop();
        setSteps(steps_);
    }

    const onEditStep = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const steps_ = [...steps];
        const step = { ...steps_[index] };

        if (event.target.name === 'year') {
            step.year = +event.target.value;
        } else if (event.target.name === 'amount') {
            step.amount = +event.target.value;
        }

        steps_[index] = step;
        setSteps(steps_);
    }

    const saveContract = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const tenants = selectedTenants.map((tenant: SelectOpion) => {
            return { '_id': tenant.value };
        });

        const flat = { '_id': selectedFlat.value };
        const data = { tenants, flat, deposit, fee, feesteps: steps, startDate, endDate: endDate ? endDate : null };

        const callback = () => {
            setFlashMessage('Vertrag wurde erfolgreich gespeichert', 'success');
            history.push('/contracts');
        }

        if (props.contract) {
            api('PUT', `/contract/${props.contract._id}`, callback, data);
        } else {
            api('POST', '/contract', callback, data);
        }
    }

    return (
        <form className="ui form" onSubmit={e => saveContract(e)}>
            <div className="required field">
                <label>Mieter</label>
                <Select
                    options={tenantFieldOptions}
                    isMulti
                    value={selectedTenants}
                    onChange={setSelectedTenants}
                    placeholder=''
                />
            </div>
            <div className="required field">
                <label>Wohnung</label>
                <Select
                    options={flatFieldOptions}
                    value={selectedFlat}
                    onChange={setSelectedFlat}
                    placeholder=''
                />
            </div>
            <div className="required field">
                <label>Mietbeginn</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div className="field">
                <label>Mietende</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <div className="required field">
                <label>Kaution</label>
                <input type="number" value={deposit} onChange={e => setDeposit(+e.target.value)} required />
            </div>
            <div className="required field">
                <label>Miete</label>
                <input type="number" value={fee} onChange={e => setFee(+e.target.value)} required />
            </div>
            <div className="field">
                <label>Staffeln</label>
                <div className="field">
                    <button className="ui mini button" type="button" onClick={onAddStep}>+</button>
                    <button className="ui mini button" type="button" onClick={onDeleteStep}>-</button>
                </div>
                {steps.length > 0 && (
                    <div className="two fields">
                        <label className="eight wide field">Jahr</label>
                        <label className="eight wide field">Staffel</label>
                    </div>
                )}
                {steps.map((step, index) => (
                    <div className="two fields" key={index}>
                        <div className="field">
                            <input type="number" name="year" value={step.year} onChange={e => onEditStep(e, index)} />
                        </div>
                        <div className="field">
                            <input type="number" name="amount" value={step.amount} onChange={e => onEditStep(e, index)} />
                        </div>
                    </div>
                ))}
            </div>

            <button type="submit" className="ui button">Speichern</button>
            <button type="button" className="ui button" onClick={() => { history.push('/contracts') }}>Abbrechen</button>
        </form>
    )
}

interface Props {
    contract?: Contract
}

type SelectOpion = {
    value: number,
    label: string
}

export default ContractForm;