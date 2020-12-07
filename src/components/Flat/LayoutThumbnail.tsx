import React, { ReactElement } from 'react'
import Modal from 'react-modal';
import css from './LayoutThumbnail.module.scss';

const LayoutThumbnail = (props: Props): ReactElement => {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const goToRoomle = () => {
        window.open(`https://www.roomle.com/app/editor/${props.layout}`, '_blank');
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    return (
        <>
            <img src={`https://uploads.roomle.com/plans/${props.layout}/thumbnail.png`} className={css.layoutThumbnail} onClick={() => setIsOpen(true)} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                <div>
                    <img src={`https://uploads.roomle.com/plans/${props.layout}/thumbnail.png`} />
                </div>
                <button className="ui button" onClick={goToRoomle}>Link zu Roomle</button>
            </Modal>
        </>
    )
}

interface Props {
    layout: string
}

export default LayoutThumbnail;
