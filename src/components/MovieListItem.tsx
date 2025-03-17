import {formChild, itemTitle, itemBadge} from "../classes/classes";
import {MovieListItemDetail} from "../api/types/MovieDetail";
import useMoviesContext from "../hooks/use-movies-context";

export default function MovieListItem({movie}: MovieListItemDetail)
{
    const {editMovie} = useMoviesContext();

    const handleClick = async (isWatched: boolean) => {
        const updatedMovie = {...movie, "isWatched": !isWatched};
        await editMovie(updatedMovie);
    }
    return <div className={formChild}>
        <div className="flex justify-between mb-[0.5rem]">
            <h2 className={itemTitle}>{movie && movie.title}</h2>
            <span onClick={() => handleClick(movie.isWatched)} className={itemBadge + ' cursor-pointer'}>{movie.isWatched ? 'Watched' : 'Not watched' }</span>
        </div>

        <div>
            <p className="text-gray-500 text-sm mb-[0.2rem]">{movie && movie.genre + ', '+ movie.year}</p>
        </div>
    </div>
}