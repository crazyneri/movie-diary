import { useContext } from "react";
import {ModalContext} from "../context/modal-context";

export default function useModalContext(){
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("ModalContext must be used within a Provider");
    }
    return context;
}