import useMoviesContext from "../hooks/use-movies-context";
import MovieListItem from './MovieListItem';
import {containerFlex, containerCentered} from '../classes/classes';
import {useState} from "react";
import Modal from './Modal';
import {MovieDetail} from "../api/types/MovieDetail";
import Button from "./Button";
import useAuthContext from "../hooks/use-auth-context";
import MovieListSearch from "./MovieListSearch";
import EditMovieListItem from "./forms/EditMovieListItem";

export default function MovieList()
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalBody, setModalBody] = useState('');
    const [activeMovie, setActiveMovie] = useState<MovieDetail>();
    const [searchTerm, setSearchTerm] = useState('');

    const { movies, deleteMovieById } = useMoviesContext();
    const {token} = useAuthContext();


    const openPopup = (movie:MovieDetail, action: string) => {
        setModalBody(action);
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

    let modalContent = <div></div>;
    switch(modalBody){
        case 'delete':
            modalContent = <>
                        <div className={containerFlex + ' gap-[0.3rem] items-baseline'}>
                        <p>Do you want to delete</p>
                        <span className="font-semibold text-lg">{activeMovie && activeMovie.title}?</span>
                        </div>
                        <div className={containerFlex + ' gap-[1rem] max-w-lg mx-auto'}>
                            <Button type="cancel" onClick={closePopup}>Cancel</Button>
                            <Button type="danger" onClick={deleteSelectedMovie}>Delete</Button>
                        </div>
                        </>;
            break;
        case 'edit':
            modalContent = <EditMovieListItem movie={activeMovie} closePopup={closePopup}/>;
            break;
    }



    const renderedMovies = movies.map((movie, index) => {
        if(searchTerm === '')
        {
            return <MovieListItem key={index} movie={movie} open={openPopup}/>
        }else{
            if(movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
            {
                return <MovieListItem key={index} movie={movie} open={openPopup}/>
            }
        }

    })

    const movieListContainer = movies.length > 0 ? renderedMovies : 'No movies added in the list';

    return <div className={containerCentered + ' flex flex-col gap-[1rem] max-h-[80vh] overflow-y-auto pb-[3rem]'}>
        {renderedMovies.length !== 0 && <MovieListSearch searchTerm={searchTerm} onSearch={setSearchTerm}/>}
        {movieListContainer}
        {isOpen && <Modal onClose={closePopup}>
            {modalContent}
        </Modal>}
    </div>
}