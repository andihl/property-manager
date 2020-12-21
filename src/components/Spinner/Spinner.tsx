import React, { ReactElement } from 'react'

const Spinner = (props: Props): ReactElement => {

    const text = props.text || 'Lade...';

    return (
        <div className="ui active inverted dimmer">
            <div className="ui text loader large">{text}</div>
        </div>
    )
}

interface Props {
    text?: string
}

export default Spinner;
