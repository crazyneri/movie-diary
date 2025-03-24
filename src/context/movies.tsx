import {createContext, useState, useCallback} from "react";
import { MovieDetail } from '../api/types/MovieDetail';
import {UserMovieDetail} from "../api/types/UserDetail";
import axios from "axios";


export interface MovieContext {
    movies: MovieDetail[],
    stableGetMovieList: (id?: string | number) => {};
    // stableGetMovieListForUser: (id: string) => {};
    setMovies: React.Dispatch<React.SetStateAction<MovieDetail[]>>,
    createMovie: (movie:UserMovieDetail) => Promise<void>;
    editMovie: (movie: MovieDetail) => Promise<void>;
    deleteMovieById: ({movie, userId}:{movie:MovieDetail; userId?: string | number}) => Promise<void>;
}

export const MoviesContext = createContext<MovieContext | null>(null);

export default function MoviesProvider (props: React.PropsWithChildren<{}>){
    const url = 'http://localhost:3004';

    const[movies, setMovies] = useState<MovieDetail[]>([]);

    const getMovieList = async (id?: string | number) => {
        let foundMovies;
        if(!id)
        {
            const result = await axios.get(`${url}/movies`);
            foundMovies = result.data;
        }else{
            const result = await axios.get(`${url}/users/${id}`);
            foundMovies = result.data.movies === undefined ? [] : result.data.movies;
        }

        setMovies(foundMovies);

    }

    // const getMovieList = async () => {
    //
    //         const result = await axios.get(`${url}/movies`);
    //         setMovies(result.data);
    //
    // }

    const stableGetMovieList = useCallback(getMovieList, []);

    // const getMovieListForUser = async (id:string) => {
    //
    //     const result = await axios.get(`${url}/users/${id}`);
    //     const foundMovies = result.data.movies === undefined ? [] : result.data.movies;
    //     setMovies(foundMovies);
    // }
    //
    // const stableGetMovieListForUser = useCallback(getMovieListForUser,[]);

    const createMovie = async ({movie, userId = 0}:UserMovieDetail) => {
        if(userId === 0)
        {
           await axios.post(`${url}/movies`,movie);
        }else{
            const userResult = await axios.get(`${url}/users/${userId}`);
            const user = userResult.data;
            if(!user?.movies || user.movies.length === 0)
            {
                user.movies = [movie];
            }else{
                user.movies = [...user.movies, movie];
            }


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

    const deleteMovieById = async ({movie, userId = 0}:{movie: MovieDetail; userId?:string | number}) => {
        const id = movie.id;
        let updatedMovies: MovieDetail[];
        if(!userId)
        {
            await axios.delete(`${url}/movies/${id}`);
            updatedMovies = movies.filter(movie => {
                return movie.id !== id;
            });
        }else{
            const userData = await axios.get(`${url}/users/${userId}`);

            updatedMovies = movies.filter(movie => {
                return movie.id !== id;
            });

            userData.data.movies = updatedMovies;
            await axios.put(`${url}/users/${userId}`, userData.data);


        }


        setMovies(updatedMovies);
    }



    return <MoviesContext.Provider value={{movies, stableGetMovieList, setMovies, createMovie, editMovie, deleteMovieById}}>{props.children}</MoviesContext.Provider>
}

