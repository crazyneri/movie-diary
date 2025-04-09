import {formChild, itemTitle, itemBadge, containerFlexCol} from "../classes/classes";
import {MovieDetail, MovieListItemDetail} from "../api/types/MovieDetail";
import useMoviesContext from "../hooks/use-movies-context";
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import useAuthContext from "../hooks/use-auth-context";
import {useState} from "react";
import {default as moreOptions} from '../assets/svg/more_options.svg';

interface MovieListWithModal extends MovieListItemDetail{
    open: (activeMovie: MovieDetail) => void
}

export default function MovieListItem({movie, open}: MovieListWithModal )
{
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
    const {editMovie} = useMoviesContext();
    const {token} = useAuthContext();

    const handleClick = async (isWatched: boolean) => {
        const updatedMovie = {...movie, "isWatched": !isWatched};
        await editMovie({movie:updatedMovie, userId: token});
    }

    const handleDelete = () => {
        open(movie);
    }
    return <div className={formChild}>
        <div className="flex justify-between mb-[0.5rem]">
            <h2 className={itemTitle}>{movie && movie.title}</h2>
            <span onClick={() => handleClick(movie.isWatched)} className={itemBadge + ' cursor-pointer hover:text-blue-500'}>{movie.isWatched ? 'Watched' : 'Mark as watched' }</span>
        </div>

        <div className="flex justify-between mb-[0.5rem]">
            <p className="text-gray-500 text-sm mb-[0.2rem]">{movie && movie.genre + ', '+ movie.year}</p>
            <div className={containerFlexCol + ' gap-[0.5rem] justify-end'}>
                <button type="button" aria-label="More options" aria-haspopup="true" aria-expanded={moreOptionsOpen} className="more-options" title="more options" onClick={() => setMoreOptionsOpen(!moreOptionsOpen)}><img src={moreOptions} alt="more options icon"/></button>

                <div className="more-options__container">
                    {moreOptionsOpen
                    &&
                    <div className="more-options__options">
                        <div title="edit" className="option text-sm cursor-pointer hover:text-red-300">
                            <PencilIcon className="size-4"/>
                            <span>Edit</span>
                        </div>

                        <div onClick={handleDelete} title="remove" className="option text-sm cursor-pointer hover:text-red-300">
                            <TrashIcon className="size-4"/>
                            <span>Delete</span>
                        </div>
                    </div>
                    }

                </div>



            </div>
        </div>
    </div>
}