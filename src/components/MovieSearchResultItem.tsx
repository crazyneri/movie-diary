import {useState} from "react";
import {formChild, itemTitle} from "../classes/classes";
import {MovieDetail} from "../api/types/MovieDetail";
import {PlusIcon} from '@heroicons/react/24/outline';
import useMoviesContext from "../hooks/use-movies-context"
import useAuthContext from "../hooks/use-auth-context";


export default function MovieSearchResultItem({movie, classes, onAdded}: {movie: MovieDetail, classes: string, onAdded: (id: string | number) => void})
{
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const {createMovie} = useMoviesContext();
    const {token} = useAuthContext();

    const handleClick = async () => {
        setIsAdded(!isAdded);
        const userId = token ? token : 0;
        await createMovie({movie, userId});

        onAdded(movie.id);
    }

    const htmlSpan = isAdded ?
        <span className="text-sm">Added</span> :
        <span onClick={handleClick} className="flex items-center p-[0.2rem] rounded-sm text-xs cursor-pointer hover:font-semibold"><PlusIcon className="size-4"/> Add to list</span>;



    return <div className={formChild+' article--search '+classes}>
        <div className="flex justify-between mb-[0.5rem]">
            <h2 className={itemTitle}>{movie && movie.title}</h2>
            {htmlSpan}
        </div>
        <div>
            <p className="text-gray-500 mb-[0.2rem]">{movie && movie.genre+', '+movie.year}</p>
        </div>
    </div>
}