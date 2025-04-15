import {useState} from 'react';
import {containerFlexCol, containerForm, formGroup, pageTitle} from "../classes/classes";
import Button from "../components/Button";
import MovieSearchResultItem from "../components/MovieSearchResultItem";
import {MovieDetail} from '../api/types/MovieDetail';
import {searchMovie} from '../api/queries/movie-search';
import useMoviesContext from "../hooks/use-movies-context";
import ClipLoader from "react-spinners/ClipLoader";
import {TvIcon} from '@heroicons/react/24/outline';



export default function AddMoviePage()
{
    const [searchMovies, setSearchMovies] = useState<MovieDetail[]>([]);
    const [term, setTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addedMovieId, setAddedMovieId] = useState< string | number>('');

    const {movies} = useMoviesContext();

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        setSearchMovies(await searchMovie(term));
        setIsLoading(!isLoading);
    }

    const handleTransition = (movie_id: string | number) => {
        setAddedMovieId(movie_id);
    }

    const savedMovies = movies.map(movie => {
        return movie.id;
    })

    const renderedSearchResults = searchMovies.map(movie => {
        if(savedMovies.indexOf(movie.id) < 0)
        {
            return <MovieSearchResultItem key={movie.id} movie={movie} classes={''} onAdded={handleTransition}/>;
        }
        if(movie.id === addedMovieId)
        {
            return <MovieSearchResultItem key={movie.id} movie={movie} classes={'movie-added'} onAdded={handleTransition}/>;
        }
    })

    return <div>

        <div className={containerFlexCol}>
            <div className="flex items-center">
                <TvIcon className="size-5 inline"/>
                <h1 className={pageTitle}>Add to watchlist</h1>
            </div>

            <form className={containerFlexCol+' '+containerForm} onSubmit={handleSearchSubmit}>
                <div className={formGroup}>
                    <label htmlFor="movieName" className="px-[1rem] py-[.5rem]">Movie name</label>
                    <input className="search-input" id="search" name="search" type="text" value={term} onChange={(e) => setTerm(e.target.value) } required placeholder="deadpool..."/>
                </div>

                <Button type="primary">Search a movie</Button>
            </form>

            <div className="flex flex-col items-center w-full lg:w-[50%] md:w-[70%]">
                {isLoading && searchMovies.length === 0 ? <ClipLoader
                    color="#e9967a"
                    loading={isLoading}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : ''}
                {renderedSearchResults}
            </div>
        </div>
    </div>
}