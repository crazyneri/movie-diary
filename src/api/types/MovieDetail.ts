export interface MovieDetail {
    id: string | number,
    title: string,
    genre: string,
    year: string,
    isWatched: boolean
}

export interface MovieListItemDetail {
    movie: MovieDetail
}
