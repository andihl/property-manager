import React, { ReactElement } from 'react'
import css from './ContentCard.module.scss';

const ContentCard = (props: Props): ReactElement => {
    return (
        <div className={`ui card ${css.card}`}>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

interface Props {
    children: ReactElement
}

export default ContentCard;
