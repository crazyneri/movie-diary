import ReactDOM from 'react-dom';
import {useEffect} from 'react';
import useModalContext from "../hooks/use-modal-context";

function ModalNew() {

    const {isOpen, toggle} = useModalContext();

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [])


    const modalBody = `<div onClick={toggle} className="fixed inset-0 bg-gray-300 opacity-80"></div>
        <div className="fixed inset-40 p-10 bg-white">
            <div className="flex flex-col justify-between h-full">
                <span>Hello</span>
                <div className="flex justify-end"></div>
            </div>

        </div>`;

    const modalContent = isOpen ? modalBody : '';

    return ReactDOM.createPortal(<div className="modal-container">
            <div>
                {modalContent}
            </div>
    </div>,
        document.body
    )



}

export default ModalNew;