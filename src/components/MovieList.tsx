import useMoviesContext from "../hooks/use-movies-context";
import MovieListItem from './MovieListItem';

export default function MovieList()
{

    const { movies } = useMoviesContext();

    const renderedMovies = movies.map((movie, index) => {
        return <MovieListItem key={index} movie={movie}/>
    })

    return <div>{renderedMovies}</div>
}