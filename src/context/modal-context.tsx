import {createContext, useState} from "react";
interface ModalContextType{
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggle: () => void,

}

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider (props: React.PropsWithChildren<{}>)
{
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return <ModalContext.Provider value={{isOpen, setIsOpen, toggle}}>{props.children}</ModalContext.Provider>
}