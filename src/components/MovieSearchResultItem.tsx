import {useState} from "react";
import {formChild, itemTitle} from "../classes/classes";
import {MovieListItemDetail} from "../api/types/MovieDetail";
import {PlusIcon} from '@heroicons/react/24/outline';
import useMoviesContext from "../hooks/use-movies-context"

export default function MovieSearchResultItem({movie}: MovieListItemDetail)
{
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const {createMovie} = useMoviesContext();

    const handleClick = async () => {
        await createMovie(movie);
        setIsAdded(!isAdded);
    }

    const htmlSpan = isAdded ? <span>Added</span> : <span onClick={handleClick} className="flex items-center p-[0.2rem] rounded-sm text-xs cursor-pointer hover:bg-teal-300"><PlusIcon className="size-4"/> Add to list</span>;



    return <div className={formChild+' hover:bg-emerald-400'}>
        <div className="flex justify-between mb-[0.5rem]">
            <h2 className={itemTitle}>{movie && movie.title}</h2>
            {htmlSpan}
        </div>
        <div>
            <p className="text-gray-500 mb-[0.2rem]">{movie && movie.genre+', '+movie.year}</p>
        </div>
    </div>
}