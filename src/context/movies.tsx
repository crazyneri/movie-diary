import {createContext, useState, useCallback} from "react";
import { MovieDetail } from '../api/types/MovieDetail';
import axios from "axios";


export interface MovieContext {
    movies: MovieDetail[],
    stableGetMovieList: () => {};
    setMovies: React.Dispatch<React.SetStateAction<MovieDetail[]>>,
    createMovie: (movie:MovieDetail) => Promise<void>;
    editMovie: (movie: MovieDetail) => Promise<void>;
    deleteMovieById: ({id}:MovieDetail) => Promise<void>;
}

export const MoviesContext = createContext<MovieContext | null>(null);

export default function MoviesProvider (props: React.PropsWithChildren<{}>){
    const url = 'http://localhost:3004';

    const[movies, setMovies] = useState<MovieDetail[]>([]);

    const getMovieList = async () => {
        const result = await axios.get(`${url}/movies`);
        setMovies(result.data);
    }

    const stableGetMovieList = useCallback(getMovieList, []);

    const createMovie = async ({id,title, genre}:MovieDetail) => {
        const result = await axios.post(`${url}/movies`,{
            id,
            title,
            genre
        });

        const updatedMovies = [...movies, result.data];
        setMovies(updatedMovies);
    }

    const editMovie = async ({title, genre, id}: MovieDetail) => {
        const result = await axios.put(`${url}/movies/${id}`, {title, genre});

        const updatedMovies = movies.map(movie => {
            if(id === movie.id)
            {
                return result.data;
            }

            return movie;
        });

        setMovies(updatedMovies);
    }

    const deleteMovieById = async ({id}:MovieDetail) => {
        await axios.delete(`${url}/movies/${id}`);
        const updatedMovies = movies.filter(movie => {
            return movie.id !== id;
        });

        setMovies(updatedMovies);
    }



    return <MoviesContext.Provider value={{movies, stableGetMovieList, setMovies, createMovie, editMovie, deleteMovieById}}>{props.children}</MoviesContext.Provider>
}

