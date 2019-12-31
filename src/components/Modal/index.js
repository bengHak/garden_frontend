import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, close }) => {
    return (
        <React.Fragment>
            {
                isOpen ?
                    <React.Fragment>
                        <div className="Modal-overlay" onClick={close} />
                        <div className="Modal">
                            <p className="title">Modal Title</p>
                            <div className="content">
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non molestiae dicta ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam beatae atque, vero assumenda rem quo?
                                </p>
                            </div>
                            <div className="button-wrap">
                                <button onClick={close}>Confirm</button>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    null
            }
                    </React.Fragment>
                )
            }

            export default Modal;