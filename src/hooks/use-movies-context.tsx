import { useContext } from "react";
import { MoviesContext } from "../context/movies";
import {MovieContext} from "../context/movies";

function useMoviesContext(){
    const context = useContext(MoviesContext) as MovieContext;

    if (!context) {
        // component is not wrapped with Provider most likely
        throw new Error("MoviesContext must be used within a Provider");
    }
    return context;
}

export default useMoviesContext;