import {MovieDetail} from "../api/types/MovieDetail";

interface MovieListItem {
    movie: MovieDetail | null
}
export default function MovieListItem({movie}: MovieListItem)
{
    return <div>{movie && movie.title}</div>
}