import React, { ReactElement } from 'react'
import OperatingCostsComparisonIcon from './OperatingCostsComparisonIcon';

const OperatingCostsFormRow = (props: Props): ReactElement => {
    const { label, value, setter, comparingValue } = props;

    return (
        <tr>
            <td>
                <div className="field required">
                    <label>{label}</label>
                    <input type="number" value={value} onChange={e => setter(+e.target.value)} required autoComplete="off" />
                </div>
            </td>
            <td className="bottom aligned">
                {comparingValue && (
                    <div className="field">
                        <div className="ui icon input">
                            <input value={value - comparingValue} disabled />
                            <OperatingCostsComparisonIcon value={value} comparingValue={comparingValue} />
                        </div>
                    </div>
                )}
            </td>
            <td className="bottom aligned">
                {comparingValue && (
                    <div className="field">
                        <input value={comparingValue} disabled />
                    </div>
                )}
            </td>
        </tr>
    )
}

interface Props {
    label: string,
    value: number,
    setter: (value: number) => void,
    comparingValue?: number
}

export default OperatingCostsFormRow;
