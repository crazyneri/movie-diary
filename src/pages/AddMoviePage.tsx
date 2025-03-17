import {useState} from 'react';
import {containerFlexCol, containerForm, formChild, formGroup, pageTitle} from "../classes/classes";
import Button from "../components/Button";
import MovieSearchResultItem from "../components/MovieSearchResultItem";
import {MovieDetail} from '../api/types/MovieDetail';
import {searchMovie} from '../api/queries/movie-search';


export default function AddMoviePage()
{
    const [searchMovies, setSearchMovies] = useState<MovieDetail[]>([]);
    const [term, setTerm] = useState<string>('');
    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await searchMovie(term);
        setSearchMovies(result);
    }

    const renderedSearchResults = searchMovies.map(movie => {
        return <MovieSearchResultItem key={movie.id} movie={movie}/>
    })

    return <div>

        <div className={containerFlexCol}>
            <h1 className={pageTitle}>Add to watchlist</h1>
            <form className={containerFlexCol+' '+containerForm} onSubmit={handleSearchSubmit}>
                <div className={formGroup}>
                    <label htmlFor="movieName">Movie name</label>
                    <input className={formChild} id="search" name="search" type="text" value={term} onChange={(e) => setTerm(e.target.value) }/>
                </div>

                <Button type="primary">Search a movie</Button>
            </form>

            <div>
                {renderedSearchResults}
            </div>
        </div>
    </div>
}