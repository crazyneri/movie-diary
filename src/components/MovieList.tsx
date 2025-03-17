import useMoviesContext from "../hooks/use-movies-context";
import MovieListItem from './MovieListItem';
import {containerForm} from '../classes/classes';

export default function MovieList()
{
    const { movies } = useMoviesContext();

    const renderedMovies = movies.map((movie, index) => {
        return <MovieListItem key={index} movie={movie}/>
    })

    const container = movies.length > 0 ? renderedMovies : 'No movies added in the list';

    return <div className={containerForm + ' flex flex-col gap-[1rem]'}>{container}</div>
}