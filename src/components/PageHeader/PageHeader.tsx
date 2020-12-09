import React, { ReactElement } from 'react'
import css from './PageHeader.module.scss';

const PageHeader = (props: Props): ReactElement => {
    return (
        <div className={css.pageHeader}>
            <h1>{props.headline}</h1>
            <div>{props.children}</div>
        </div>
    )
}

interface Props {
    headline: string,
    children?: ReactElement
}

export default PageHeader;