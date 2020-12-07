import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import css from './Card.module.scss';

const Card = (props: Props): ReactElement => {
    return (
        <Link to={props.link} className={css.card}>
            <div className={`ui card`}>
                <div className={`image ${css.image}`}>
                    <img src={props.image} />
                </div>
                <div className="content">
                    <div className="header">{props.label}</div>
                </div>
            </div>
        </Link >
    )
}

interface Props {
    link: string,
    image: string,
    label: string
}

export default Card;