import React, { ReactElement, useEffect, useState } from 'react'
import { useStore } from '../../store/store';
import css from './FlashMessage.module.scss';

const FlashMessage = (): ReactElement | null => {
    const { store } = useStore();

    const [text, setText] = useState<string>('');
    const [type, setType] = useState<FlashMessageType>(null);
    const [isVisible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        setText(store.flashMessage.text);
        setType(store.flashMessage.type);
        setVisibility(true);

        setTimeout(() => {
            setVisibility(false);
        }, store.flashMessage.duration);
    }, [store.flashMessage])

    return (
        isVisible ? (
            <div className={`ui icon ${type} message ${css.message}`} onClick={() => setVisibility(false)}>
                {type === 'success' && <i className="check icon"></i>}
                {type === 'error' && <i className="times icon"></i>}
                <div className="content">
                    <div className="header">
                        {text}
                    </div>
                </div>
            </div>
        ) : (
                null
            )
    )
}

export type FlashMessageType = 'success' | 'error' | null;

export default FlashMessage;