import {createContext, useState, useCallback} from "react";
import { MovieDetail } from '../api/types/MovieDetail';
import axios from "axios";


export interface MovieContext {
    movies: MovieDetail[],
    setMovies: React.Dispatch<React.SetStateAction<MovieDetail[]>>,
    createMovie: (movie:MovieDetail) => Promise<void>;
    editMovie: (movie: MovieDetail) => Promise<void>;
    deleteMovieById: ({id}:MovieDetail) => Promise<void>;
}

export const MoviesContext = createContext<MovieContext | []>([]);

function Provider (props: React.PropsWithChildren<{}>){
    const url = 'http://localhost:3004';

    const[movies, setMovies] = useState<MovieDetail[]>([]);

    const getMovieList = async () => {
        const result = await axios.get(`${url}/movies`);
        setMovies(result.data);
    }

    const stableGetMovieList = useCallback(getMovieList, []);

    const data = {
        movies,
        setMovies,
        stableGetMovieList,
        createMovie: async ({id,title, genre}:MovieDetail) => {
            const result = await axios.post(`${url}/movies`,{
                id,
                title,
                genre
            });

            const updatedMovies = [...movies, result.data];
            setMovies(updatedMovies);
        },
        editMovie: async ({title, genre, id}: MovieDetail) => {
            const result = await axios.put(`${url}/movies/${id}`, {title, genre});

            const updatedMovies = movies.map(movie => {
                if(id === movie.id)
                {
                    return result.data;
                }

                return movie;
            });

            setMovies(updatedMovies);
        },
        deleteMovieById: async ({id}:MovieDetail) => {
            await axios.delete(`${url}/movies/${id}`);
            const updatedMovies = movies.filter(movie => {
                return movie.id !== id;
            });

            setMovies(updatedMovies);
        }
    };


    return <MoviesContext.Provider value={data}>{props.children}</MoviesContext.Provider>
}

export { Provider };
export default MoviesContext;