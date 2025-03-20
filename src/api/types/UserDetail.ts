import {MovieDetail} from "./MovieDetail";

export interface UserDetail{
    id: string,
    email: string,
    name: string,
    surname: string,
    password: string
}

export interface UserMovieDetail{
    movie: MovieDetail,
    userId?: string | number
}