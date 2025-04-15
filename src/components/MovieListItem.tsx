import {formChild, itemTitle, itemBadge} from "../classes/classes";
import {MovieDetail} from "../api/types/MovieDetail";
import useMoviesContext from "../hooks/use-movies-context";
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import useAuthContext from "../hooks/use-auth-context";
import {useState} from "react";
import MoreOptions from "./MoreOptions";
import {Link} from "react-router-dom";


export default function MovieListItem({movie, open}: {movie: MovieDetail, open: (activeMovie: MovieDetail, action:string) => void} )
{
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
    const {editMovie} = useMoviesContext();
    const {token} = useAuthContext();

    const handleMoreOptions = () => {
        setMoreOptionsOpen(!moreOptionsOpen);
    }

    const handleClick = async (isWatched: boolean) => {

        const updatedMovie = {...movie, "isWatched": !isWatched};
        await editMovie({movie:updatedMovie, userId: token});
    }

    const handleDelete = (e:React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        open(movie, 'delete');
        setMoreOptionsOpen(false);
    }

    const handleEdit = (e:React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        open(movie, 'edit');
        setMoreOptionsOpen(false);
    }

    return <Link to={`/movies/${movie.title.replace(/ /g, '-')}`}>
    <div className={formChild + ' article'}>
            <div className="flex justify-between mb-[0.5rem]">

                    <h2 className={itemTitle}>{movie && movie.title}</h2>

                <span onClick={() => handleClick(movie.isWatched)} className={itemBadge + ' cursor-pointer article__hovered-text'}>{movie.isWatched ? 'Watched' : 'Mark as watched' }</span>
            </div>

            <div className="flex justify-between mb-[0.5rem] relative">
                <p className="text-gray-500 text-sm mb-[0.2rem]">{movie && movie.genre + ', '+ movie.year}</p>
                <MoreOptions isOpen={moreOptionsOpen} handleOpen={handleMoreOptions}>

                    <ul className="more-options__list">
                        <li onClick={handleEdit} title="edit" className="option text-sm cursor-pointer hover:text-red-300">
                            <PencilIcon className="size-4"/>
                            <span>Edit</span>
                        </li>

                        <li onClick={handleDelete} title="remove" className="option text-sm cursor-pointer hover:text-red-300">
                            <TrashIcon className="size-4"/>
                            <span>Delete</span>
                        </li>
                    </ul>

                </MoreOptions>

            </div>

        </div>
    </Link>

}