import React, { ReactElement } from 'react'

export const Spinner = (): ReactElement => {
    return (
        <div className="ui active inverted dimmer">
            <div className="ui text loader large">Lade...</div>
        </div>
    )
}
