import {formChild} from "../classes/classes";
import {MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import {FriendsMovieListDetail} from "../api/types/FriendsMovieListDetail";
import {PlusIcon} from "@heroicons/react/24/outline";
import useMoviesContext from "../hooks/use-movies-context";
import Modal from '../components/Modal';
import MovieListSearch from "./MovieListSearch";
import {addMovieToList, getMoviesForList} from "../api/queries/friends-movie-list";
import MoreOptions from "./MoreOptions";
import {Link} from 'react-router-dom';
import { TrashIcon} from '@heroicons/react/24/outline';


const getMoviesCountText = (moviesCount:number) => {
    if(moviesCount === 1) return `${moviesCount} movie`;
    return `${moviesCount} movies`;
}


export default function FriendsListItem({list, openModal}: {list: FriendsMovieListDetail; openModal:(list: FriendsMovieListDetail, action: string) => void }){

    const {movies} = useMoviesContext();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // TODO change the type to Type[]?
    const [listMovieIds, setMovieIds] = useState<(string | number)[]>([]);
    const moviesCount = getMoviesCountText(listMovieIds.length);

    useEffect(() => {
        const fetchListMovies = async () => {
            const fetchedMovieIds = await getMoviesForList(list.id);
            if(fetchedMovieIds !== undefined)
            {
                setMovieIds(fetchedMovieIds);
            }
        }
        fetchListMovies();
    }, [])

    let renderedMovies:ReactNode = [];
    const handleClick = async (e:React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setIsOpenModal(true);

    }

    const closePopup = (e:React.MouseEvent) => {
        e.preventDefault();
        setIsOpenModal(false);
    }

    const handleAddMovieToList:MouseEventHandler = async (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        await addMovieToList(target.id, list);
        const movieIds = [...listMovieIds, target.id];
        setMovieIds( movieIds );
    }

    const handleIsOpenOptions = () => {
        setIsOpenOptions(!isOpenOptions);
    }



    const filterMoviesForList = () => {
        return movies.map(movie => {
            if(listMovieIds.indexOf(movie.id.toString()) < 0)
            {
                if(searchTerm === '')
                {
                    return <li
                        onClick={handleAddMovieToList}
                        key={movie.id+'movie'}
                        id={movie.id.toString()}
                        className={formChild + ' article'}>{movie.title}</li>;
                }else{
                    if(movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    {
                        return <li
                            id={movie.id.toString()}
                            onClick={handleAddMovieToList}
                            key={movie.id+'movie'}
                            className={formChild + ' article'}>{movie.title}</li>;
                    }
                }
            }


        })

    }

    if(isOpenModal)
    {
        renderedMovies = filterMoviesForList();
    }

    const handleDelete = async (e:React.MouseEvent) => {
        e.preventDefault();
        openModal(list, 'delete');
        setIsOpenOptions(false);

    }



    return <li className={formChild + ' article'}>
        <Link to={'/movie-list/'+list.id} className="cursor-pointer">
            <div className="flex justify-between">
                <h3>{list.name} <span className="text-sm">({moviesCount})</span></h3>
                <span onClick={handleClick} className="flex items-center p-[0.2rem] rounded-sm text-xs cursor-default hover:font-semibold"><PlusIcon className="size-4"/> Add movies</span>
            </div>
            <div className="flex justify-end">
                <MoreOptions isOpen={isOpenOptions} handleOpen={handleIsOpenOptions}>
                    <button onClick={handleDelete} className="flex items-center text-sm hover:text-red-300"><TrashIcon className="size-4 mr-[.5rem]"/> Delete List</button>
                </MoreOptions>
            </div>
            {isOpenModal && <Modal onClose={closePopup}>
                <h2>Add movies to: <span className="text-lg font-semibold">{list.name}</span></h2>
                <MovieListSearch searchTerm={searchTerm} onSearch={setSearchTerm}/>
                <ul>{renderedMovies}</ul>
            </Modal>}
        </Link>
    </li>
}