import {formChild, itemTitle, itemBadge, containerFlex} from "../classes/classes";
import {MovieDetail, MovieListItemDetail} from "../api/types/MovieDetail";
import useMoviesContext from "../hooks/use-movies-context";
import {PencilIcon, TrashIcon} from '@heroicons/react/24/outline';

interface MovieListWithModal extends MovieListItemDetail{
    open: (activeMovie: MovieDetail) => void
}

export default function MovieListItem({movie, open}: MovieListWithModal )
{
    const {editMovie} = useMoviesContext();

    const handleClick = async (isWatched: boolean) => {
        const updatedMovie = {...movie, "isWatched": !isWatched};
        await editMovie(updatedMovie);
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
            <div className={containerFlex + ' gap-[0.5rem]'}>
                <PencilIcon title="edit" className="size-4 cursor-pointer"/>
                <TrashIcon onClick={handleDelete} title="remove" className="size-4 cursor-pointer"/>
            </div>
        </div>
    </div>
}