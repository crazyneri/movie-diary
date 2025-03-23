import useMoviesContext from "../hooks/use-movies-context";
import MovieListItem from './MovieListItem';
import {containerForm, containerFlex} from '../classes/classes';
import {useState} from "react";
import Modal from './Modal';
import {MovieDetail} from "../api/types/MovieDetail";
import Button from "./Button";
import useAuthContext from "../hooks/use-auth-context";

export default function MovieList()
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeMovie, setActiveMovie] = useState<MovieDetail>();
    const { movies, deleteMovieById } = useMoviesContext();
    const {token} = useAuthContext();


    const openPopup = (movie:MovieDetail) => {
        setIsOpen(!isOpen);
        setActiveMovie(movie);
    }

    const closePopup = () => {
        setIsOpen(false);
    }

    const deleteSelectedMovie = async () => {
        if(!!activeMovie?.id)
        {
            await deleteMovieById({movie:activeMovie, userId: token});
            setIsOpen(false);
        }
    }



    const renderedMovies = movies.map((movie, index) => {
        return <MovieListItem key={index} movie={movie} open={openPopup}/>
    })

    const container = movies.length > 0 ? renderedMovies : 'No movies added in the list';

    return <div className={containerForm + ' flex flex-col gap-[1rem]'}>
        {container}
        {isOpen && <Modal onClose={closePopup}>
            <div className={containerFlex + ' gap-[0.3rem] items-baseline'}>
                <p>Do you want to delete</p>
                <span className="font-semibold text-lg">{activeMovie && activeMovie.title}?</span>
            </div>
            <div className={containerFlex + ' gap-[1rem] max-w-lg mx-auto'}>
                <Button type="cancel" onClick={closePopup}>Cancel</Button>
                <Button type="danger" onClick={deleteSelectedMovie}>Delete</Button>
            </div>
        </Modal>}
    </div>
}