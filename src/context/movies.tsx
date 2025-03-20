import {createContext, useState, useCallback} from "react";
import { MovieDetail } from '../api/types/MovieDetail';
import {UserMovieDetail} from "../api/types/UserDetail";
import axios from "axios";


export interface MovieContext {
    movies: MovieDetail[],
    stableGetMovieList: () => {};
    stableGetMovieListForUser: (id: string) => {};
    setMovies: React.Dispatch<React.SetStateAction<MovieDetail[]>>,
    createMovie: (movie:UserMovieDetail) => Promise<void>;
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

    const getMovieListForUser = async (id:string) => {

        const result = await axios.get(`${url}/users/${id}`);
        const foundMovies = result.data.movies === undefined ? [] : result.data.movies;
        setMovies(foundMovies);
    }

    const stableGetMovieListForUser = useCallback(getMovieListForUser,[]);

    const createMovie = async ({movie, userId = 0}:UserMovieDetail) => {
        if(userId === 0)
        {
           await axios.post(`${url}/movies`,movie);
        }else{
            const userResult = await axios.get(`${url}/users/${userId}`);
            const user = userResult.data;
            user.movies = [...user.movies, movie];

            await axios.put(`${url}/users/${userId}`, user);
        }

        const updatedMovies = [...movies, movie];
        setMovies(updatedMovies);
    }

    const editMovie = async ({title, genre, isWatched, year, id}: MovieDetail) => {
        const result = await axios.put(`${url}/movies/${id}`, {title, genre, isWatched, year});

        const updatedMovies = movies.map(movie => {
            if(id === movie.id)
            {
                return result.data;
            }

            return movie;
        });

        setMovies(updatedMovies);
    }

    const deleteMovieById = async (movie:MovieDetail) => {
        const id = movie.id;
        await axios.delete(`${url}/movies/${id}`);
        const updatedMovies = movies.filter(movie => {
            return movie.id !== id;
        });

        setMovies(updatedMovies);
    }



    return <MoviesContext.Provider value={{movies, stableGetMovieList, stableGetMovieListForUser, setMovies, createMovie, editMovie, deleteMovieById}}>{props.children}</MoviesContext.Provider>
}

