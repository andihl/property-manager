import React, { FormEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../shared/api';
import OperatingCosts from '../../types/OperatingCosts';

const OperatingCostsForm = (props: Props): ReactElement => {
    const history = useHistory();

    const [year, setYear] = useState<number>(props.operatingCosts?.year || new Date().getFullYear());
    const [water, setWater] = useState<number>(props.operatingCosts?.water || 0);
    const [electricity, setElectricity] = useState(props.operatingCosts?.electricity || 0);
    const [chimneySweep, setChimneySweep] = useState<number>(props.operatingCosts?.chimneysweep || 0);
    const [insturance, setInsturance] = useState<number>(props.operatingCosts?.insurance || 0);
    const [salary, setSalary] = useState<number>(props.operatingCosts?.salary || 0);
    const [garbageDisposal, setGarbageDisposal] = useState<number>(props.operatingCosts?.garbagedisposal || 0);
    const [garden, setGarden] = useState<number>(props.operatingCosts?.garden || 0);
    const [tax, setTax] = useState<number>(props.operatingCosts?.tax || 0);

    const saveOperatingCosts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { year, water, electricity, chimneysweep: chimneySweep, insturance, salary, garbagedisposal: garbageDisposal, garden, tax, allocated: false };

        if (props.operatingCosts) {
            api('PUT', `/operatingcosts/${props.operatingCosts._id}`, () => {
                history.push('/operating-costs')
            }, data);
        } else {
            api('POST', '/operatingcosts', () => {
                history.push('/operating-costs')
            }, data);
        }
    }

    return (
        <form className="ui form" onSubmit={saveOperatingCosts}>
            <fieldset disabled={props.operatingCosts?.allocated}>
                <div className="field required">
                    <label>Jahr</label>
                    <input type="number" value={year} onChange={e => setYear(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Wasser</label>
                    <input type="number" value={water} onChange={e => setWater(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Strom</label>
                    <input type="number" value={electricity} onChange={e => setElectricity(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Schonrnsteinfeger</label>
                    <input type="number" value={chimneySweep} onChange={e => setChimneySweep(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Versicherung</label>
                    <input type="number" value={insturance} onChange={e => setInsturance(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Gehälter (Hauswart,Winterdienst, ...)</label>
                    <input type="number" value={salary} onChange={e => setSalary(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Müllabfuhr</label>
                    <input type="number" value={garbageDisposal} onChange={e => setGarbageDisposal(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Garten</label>
                    <input type="number" value={garden} onChange={e => setGarden(+e.target.value)} required autoComplete="off" />
                </div>
                <div className="field required">
                    <label>Steuern</label>
                    <input type="number" value={tax} onChange={e => setTax(+e.target.value)} required autoComplete="off" />
                </div>
            </fieldset><br />

            <button type="submit" className="ui button" disabled={props.operatingCosts?.allocated}>Speichern</button>
            <button type="button" className="ui button" onClick={() => { history.push('/operating-costs') }}>Abbrechen</button>
        </form>
    )
}

interface Props {
    operatingCosts?: OperatingCosts
}

export default OperatingCostsForm;