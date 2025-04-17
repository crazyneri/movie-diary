import {MovieDetail} from "./MovieDetail";

export interface ModalDetail{
    onClose: (e:React.MouseEvent) => void,
    children: React.ReactNode
}

export interface ModalOpenDetail{
    open: (activeMovie: MovieDetail) => void
}