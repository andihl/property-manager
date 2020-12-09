import React, { ReactElement } from 'react'
import css from './PageHeader.module.scss';

const PageHeader = (props: Props): ReactElement => {
    return (
        <div className={css.pageHeader}>
            <h1>{props.headline}</h1>
            <div>{props.info}</div>
        </div>
    )
}

interface Props {
    headline: string,
    info?: string
}

export default PageHeader;