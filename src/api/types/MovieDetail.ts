export interface MovieDetail {
    id: string,
    title: string,
    genre: string,
    year: string,
    isWatched: boolean
}

export interface MovieListItemDetail {
    movie: MovieDetail
}
