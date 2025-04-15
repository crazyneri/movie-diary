export interface MovieDetail {
    id: string | number,
    title: string,
    genre: string,
    year: string,
    isWatched: boolean,
    plot?: string,
    myDescription?: string,
    poster?: string,
    ratings?: {
        Source: string,
        Value: string
    }[],
    actors: string
}

export interface EditMovieDetail{
    myDescription: string
}

