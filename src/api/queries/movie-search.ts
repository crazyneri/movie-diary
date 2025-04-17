import {omdbapi} from '../../apiKeys';
import {MovieDetail} from '../types/MovieDetail';
interface MovieSearchDetail{
    "Search": {
        "Title": string,
        "imdbID": string,
        "Poster": string,
        "Type": string,
        "Year": string
    }[]
}

interface MovieSearchID{
    "Title": string,
    "Year": string,
    "Genre": string,
    "imdbID": string,
    "Actors": string,
    "Country": string,
    "Director": string,
    "Plot": string,
    "Poster": string,
    "Ratings": {
        "Source": string,
        "Value": string
    }[],
    "Runtime": string
}

export const searchMovie = async (term: string) =>{
    const url = `http://www.omdbapi.com/?apikey=${omdbapi}&s=${term}`;

    const result = await fetch(url);
    const data: MovieSearchDetail = await result.json();

    return movieDetails(data);
}

const movieDetails = async (movies: MovieSearchDetail) => {

    const moviesResult: MovieDetail[] = await Promise.all(movies.Search.map(async movie => {
        const data: MovieSearchID = await searchById(movie.imdbID);
        return {
            id: data.imdbID,
            title: data.Title,
            genre: data.Genre,
            year: data.Year,
            isWatched: false,
            poster: data.Poster,
            plot: data.Plot,
            ratings: data.Ratings,
            actors: data.Actors
        };
    })) ;

    return moviesResult;
}

export const getListMoviesById = async (movieIds?: string[]) => {
    if(movieIds)
    {
        const moviesResult: MovieDetail[] = await Promise.all(movieIds.map(async movieID => {
            const data: MovieSearchID = await searchById(movieID);
            return{
                id: data.imdbID,
                title: data.Title,
                genre: data.Genre,
                year: data.Year,
                isWatched: false,
                poster: data.Poster,
                plot: data.Plot,
                ratings: data.Ratings,
                actors: data.Actors
            }
        }));

        return moviesResult;
    }

    return [];

}

const searchById = async (movieId: string) => {
    const url = `http://www.omdbapi.com/?apikey=${omdbapi}&i=`;
    const result = await fetch(url+movieId);
    const data: MovieSearchID = await result.json();

    return data;
}