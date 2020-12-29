import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import api from '../../shared/api';
import { useFlashMessage } from '../../shared/flashMessage';
import OperatingCosts, { calculateTotalOperatingCosts } from '../../types/OperatingCosts';
import OperatingCostsComparisonIcon from './OperatingCostsComparisonIcon';
import css from './OperatingCostsForm.module.scss'
import OperatingCostsFormRow from './OperatingCostsFormRow';

const OperatingCostsForm = (props: Props): ReactElement => {
    const history = useHistory();
    const { setFlashMessage } = useFlashMessage();

    const [year, setYear] = useState<number>(props.operatingCosts?.year || new Date().getFullYear());
    const [water, setWater] = useState<number>(props.operatingCosts?.water || 0);
    const [electricity, setElectricity] = useState(props.operatingCosts?.electricity || 0);
    const [chimneySweep, setChimneySweep] = useState<number>(props.operatingCosts?.chimneysweep || 0);
    const [insurance, setInsurance] = useState<number>(props.operatingCosts?.insurance || 0);
    const [salary, setSalary] = useState<number>(props.operatingCosts?.salary || 0);
    const [garbageDisposal, setGarbageDisposal] = useState<number>(props.operatingCosts?.garbagedisposal || 0);
    const [garden, setGarden] = useState<number>(props.operatingCosts?.garden || 0);
    const [tax, setTax] = useState<number>(props.operatingCosts?.tax || 0);
    const [comparingOc, setComparingOc] = useState<OperatingCosts>();

    useEffect(() => {
        api<OperatingCosts[]>('GET', `/operatingcosts?q={"year":${year - 1}}`, oc => {
            setComparingOc(oc[0]);
        });
    }, [year])

    const saveOperatingCosts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { year, water, electricity, chimneysweep: chimneySweep, insurance, salary, garbagedisposal: garbageDisposal, garden, tax, allocated: false };

        const callback = () => {
            setFlashMessage('Betriebskosten wurde erfolgreich gespeichert', 'success');
            history.push('/operating-costs')
        }

        if (props.operatingCosts) {
            api('PUT', `/operatingcosts/${props.operatingCosts._id}`, callback, data);
        } else {
            api('POST', '/operatingcosts', callback, data);
        }
    }

    const getTotal = (): number => {
        return water + electricity + chimneySweep + insurance + salary + garbageDisposal + garden + tax;
    }

    return (
        <>
            <form className="ui form" onSubmit={e => saveOperatingCosts(e)}>
                <fieldset disabled={props.operatingCosts?.allocated}>
                    <table className={`ui very basic table ${css.ocTable}`}>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="field required">
                                        <label>Jahr</label>
                                        <input type="number" value={year} onChange={e => setYear(+e.target.value)} required autoComplete="off" />
                                    </div>
                                </td>
                                <td className={`${css.comparingColumn}`}></td>
                                <td className={`bottom aligned ${css.comparingColumn}`}>
                                    {comparingOc && (
                                        <div className="field">
                                            <input value={comparingOc.year} disabled />
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <OperatingCostsFormRow label="Wasser" value={water} setter={setWater} comparingValue={comparingOc?.water} />
                            <OperatingCostsFormRow label="Strom" value={electricity} setter={setElectricity} comparingValue={comparingOc?.electricity} />
                            <OperatingCostsFormRow label="Schornsteinfeger" value={chimneySweep} setter={setChimneySweep} comparingValue={comparingOc?.chimneysweep} />
                            <OperatingCostsFormRow label="Versicherung" value={insurance} setter={setInsurance} comparingValue={comparingOc?.insurance} />
                            <OperatingCostsFormRow label="Gehälter" value={salary} setter={setSalary} comparingValue={comparingOc?.salary} />
                            <OperatingCostsFormRow label="Müllabfuhr" value={garbageDisposal} setter={setGarbageDisposal} comparingValue={comparingOc?.garbagedisposal} />
                            <OperatingCostsFormRow label="Garten" value={garden} setter={setGarden} comparingValue={comparingOc?.garden} />
                            <OperatingCostsFormRow label="Steuern" value={tax} setter={setTax} comparingValue={comparingOc?.tax} />
                            <tr>
                                <td>
                                    <div className="field">
                                        <label>Gesamt</label>
                                        <input type="number" value={getTotal()} disabled />
                                    </div>
                                </td>
                                <td className="bottom aligned">
                                    {comparingOc && (
                                        <div className="field">
                                            <div className="ui icon input">
                                                <input value={getTotal() - calculateTotalOperatingCosts(comparingOc, 'yearly')} disabled />
                                                <OperatingCostsComparisonIcon value={getTotal()} comparingValue={calculateTotalOperatingCosts(comparingOc, 'yearly')} />
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="bottom aligned">
                                    {comparingOc && (
                                        <div className="field">
                                            <input value={calculateTotalOperatingCosts(comparingOc, 'yearly')} disabled />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>

                <button type="submit" className="ui button" disabled={props.operatingCosts?.allocated}>Speichern</button>
                <button type="button" className="ui button" onClick={() => { history.push('/operating-costs') }}>Abbrechen</button>
            </form>

        </>
    )
}

interface Props {
    operatingCosts?: OperatingCosts
}

export default OperatingCostsForm;