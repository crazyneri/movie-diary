import {omdbapi} from '../../apiKeys';
import {MovieDetail} from '../types/MovieDetail';
interface MovieSearchDetail{
    "Search": {
        "Title": string,
        "imdbID": string,
        "Poster": string
    }[]
}

interface MovieSearchID{
    "Title": string,
    "Year": string,
    "Genre": string,
    "imdbID": string
}

export const searchMovie = async (term: string) =>{
    const url = `http://www.omdbapi.com/?apikey=${omdbapi}&s=${term}`;

    const result = await fetch(url);
    const data: MovieSearchDetail = await result.json();

    return await movieDetails(data);
}

const movieDetails = async (movies: MovieSearchDetail) => {

    const moviesResult: MovieDetail[] = await Promise.all(movies.Search.map(async movie => {
        const data: MovieSearchID = await searchById(movie.imdbID);
        return {
            id: data.imdbID,
            title: data.Title,
            genre: data.Genre,
            year: data.Year,
            isWatched: false
        };
    })) ;

    return moviesResult;
}

const searchById = async (movieId: string) => {
    const url = `http://www.omdbapi.com/?apikey=${omdbapi}&i=`;
    const result = await fetch(url+movieId);
    const data: MovieSearchID = await result.json();

    return data;
}