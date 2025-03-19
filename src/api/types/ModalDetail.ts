import {MovieDetail} from "./MovieDetail";

export interface ModalDetail{
    onClose: () => void,
    children: React.ReactNode
}

export interface ModalOpenDetail{
    open: (activeMovie: MovieDetail) => void
}