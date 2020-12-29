import React, { ReactElement } from 'react'
import OperatingCosts from '../../types/OperatingCosts';

const OperatingCostsComparisonIcon = (props: Props): ReactElement => {
    if (props.comparingValue > props.value) {
        return <i className="green arrow circle down icon"></i>;
    }
    else if (props.comparingValue < props.value) {
        return <i className="red arrow circle up icon"></i>;
    }
    else {
        return <i className="arrow circle right icon"></i>;
    }
}

interface Props {
    value: number,
    comparingValue: number
}

export default OperatingCostsComparisonIcon;
