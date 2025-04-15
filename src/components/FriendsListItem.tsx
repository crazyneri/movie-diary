import {formChild} from "../classes/classes";
import {MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import {FriendsMovieListDetail} from "../api/types/FriendsMovieListDetail";
import {PlusIcon} from "@heroicons/react/24/outline";
import useMoviesContext from "../hooks/use-movies-context";
import Modal from '../components/Modal';
import MovieListSearch from "./MovieListSearch";
import {addMovieToList, getMoviesForList} from "../api/queries/friends-movie-list";
import MoreOptions from "./MoreOptions";




export default function FriendsListItem({list}: {list: FriendsMovieListDetail }){

    const {movies} = useMoviesContext();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // TODO change the type to Type[]?
    const [listMovieIds, setMovieIds] = useState<(string | number)[]>([]);

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
    const handleClick = async () => {
        setIsOpenModal(true);

    }

    const closePopup = () => {
        setIsOpenModal(false);
    }

    const handleAddMovieToList:MouseEventHandler = async (e) => {
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



    return <li className={formChild + ' article'}>
        <div className="flex justify-between">
            <h3>{list.name}</h3>
            <span onClick={handleClick} className="flex items-center p-[0.2rem] rounded-sm text-xs cursor-pointer hover:font-semibold"><PlusIcon className="size-4"/> Add movies</span>
            <MoreOptions isOpen={isOpenOptions} handleOpen={handleIsOpenOptions}>
                <div>Hello</div>
            </MoreOptions>
        </div>
        {isOpenModal && <Modal onClose={closePopup}>
            <h2>Add movies to: <span className="text-lg font-semibold">{list.name}</span></h2>
            <MovieListSearch searchTerm={searchTerm} onSearch={setSearchTerm}/>
            <ul>{renderedMovies}</ul>
        </Modal>}

    </li>
}