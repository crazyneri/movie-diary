import useMoviesContext from "../hooks/use-movies-context";
import MovieListItem from './MovieListItem';
import {containerFlex, containerCentered} from '../classes/classes';
import {useEffect, useState} from "react";
import Modal from './Modal';
import {MovieDetail} from "../api/types/MovieDetail";
import Button from "./Button";
import useAuthContext from "../hooks/use-auth-context";
import MovieListSearch from "./MovieListSearch";
import EditMovieListItem from "./forms/EditMovieListItem";
import {FriendsMovieListDetail} from "../api/types/FriendsMovieListDetail";
import {getListMoviesById} from "../api/queries/movie-search";
import {useNavigate} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const getRenderedMovies = (movies:MovieDetail[], searchTerm:string, openPopup:(movie:MovieDetail, action:string) => void) => {
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

    });

    return renderedMovies;
}

export default function MovieList({list}: { list: FriendsMovieListDetail | null })
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalBody, setModalBody] = useState('');
    const [activeMovie, setActiveMovie] = useState<MovieDetail>();
    const [searchTerm, setSearchTerm] = useState('');
    const [listMovies, setListMovies] = useState<MovieDetail[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { movies, deleteMovieById } = useMoviesContext();
    const {token} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(list)
        {
            if(!token)
            {
                navigate('/');
            }
            const movieIds = list?.movies;
            const fetchMovies = async () => {
                await getListMoviesById(movieIds).then((data:MovieDetail[]) => {
                    setListMovies(data);
                    setIsLoading(false);

                })
            }
            fetchMovies();
        }else{
            setListMovies(null);
            setIsLoading(false);
        }
    },[list?.id, token])

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


    const renderedMovies = listMovies === null ? getRenderedMovies(movies, searchTerm, openPopup) : getRenderedMovies(listMovies, searchTerm, openPopup);

    console.log('movies',renderedMovies);


    const movieListContainer = renderedMovies.length > 0 ? renderedMovies : 'No movies added in the list';

    return <div className={containerCentered + ' flex flex-col gap-[1rem] max-h-[80vh] overflow-y-auto pb-[3rem]'}>
        {renderedMovies.length !== 0 && <MovieListSearch searchTerm={searchTerm} onSearch={setSearchTerm}/>}
        {isLoading ?
            <div className="flex justify-center">
                <ClipLoader
                    color="#e9967a"
                    loading={isLoading}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            :
        movieListContainer}
        {isOpen && <Modal onClose={closePopup}>
            {modalContent}
        </Modal>}
    </div>
}