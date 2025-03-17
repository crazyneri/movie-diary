import {formChild, itemTitle, itemBadge} from "../classes/classes";
import {MovieListItemDetail} from "../api/types/MovieDetail";

export default function MovieListItem({movie}: MovieListItemDetail)
{
    return <div className={formChild}>
        <div className="flex justify-between mb-[0.5rem]">
            <h2 className={itemTitle}>{movie && movie.title}</h2>
            <span className={itemBadge}>Watched</span>
        </div>

        <div>
            <p className="text-gray-500 text-sm mb-[0.2rem]">{movie && movie.genre + ', '+ movie.year}</p>
        </div>
    </div>
}