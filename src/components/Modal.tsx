import ReactDOM from 'react-dom';
import {useEffect} from 'react';
import {ModalDetail} from "../api/types/ModalDetail";

function Modal({children, onClose}: ModalDetail) {

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDOM.createPortal(<div className="modal-container">
            <div>
                <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
                <div className="fixed inset-40 p-10 bg-white z-100">
                    <div className="flex flex-col justify-between h-full overflow-y-auto">
                        {children}
                        <div className="flex justify-end"></div>
                    </div>

                </div>
            </div>
    </div>,
        document.body
    )



}

export default Modal;