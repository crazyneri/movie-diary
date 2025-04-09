import {createContext, useState, useCallback} from "react";
import { MovieDetail } from '../api/types/MovieDetail';
import axios from "axios";


function sortMoviesByWatched(movies:MovieDetail[])
{
    if(movies.length > 0)
    {
        return movies.sort(function(a, b){
            return  Number(a.isWatched) - Number(b.isWatched) ;
        });

    }

    return movies;
}

export interface MovieContext {
    movies: MovieDetail[],
    stableGetMovieList: (id?: string | number) => {};
    // stableGetMovieListForUser: (id: string) => {};
    setMovies: React.Dispatch<React.SetStateAction<MovieDetail[]>>,
    createMovie: ({movie, userId}:{movie: MovieDetail, userId: string | number}) => Promise<void>;
    editMovie: ({movie, userId}: {movie: MovieDetail, userId: string | number }) => Promise<void>;
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

        setMovies(sortMoviesByWatched(foundMovies));

    }

    // prevents the function from being recreated unless necessary
    const stableGetMovieList = useCallback(getMovieList, []);


    const createMovie = async ({movie, userId = 0}:{movie:MovieDetail, userId: string | number}) => {
        if(userId === 0 || userId === '')
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

    const editMovie = async ({movie, userId = 0}: {movie: MovieDetail, userId: number | string}) => {
        let updatedMovies: MovieDetail[];

        if(userId === 0 || userId === '')
        {
            const result = await axios.put(`${url}/movies/${movie.id}`, movie);

            updatedMovies = movies.map(currentMovie => {
                if(movie.id === currentMovie.id)
                {
                    return result.data;
                }

                return currentMovie;
            });

        }else{
            const userData = await axios.get(`${url}/users/${userId}`);
            updatedMovies = movies.map(currentMovie => {
                if(currentMovie.id === movie.id)
                {
                    return movie;
                }

                return currentMovie;
            });

            userData.data.movies = updatedMovies;
            await axios.put(`${url}/users/${userId}`, userData.data);

        }


        setMovies(sortMoviesByWatched(updatedMovies));
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

