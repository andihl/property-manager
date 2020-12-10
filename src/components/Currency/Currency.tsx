import React, { ReactElement } from 'react'

const Currency = (props: Props): ReactElement => {
    const newValue = Math.floor(props.value).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + '€';

    return <>{newValue}</>
}

interface Props {
    value: number
}

export default Currency;