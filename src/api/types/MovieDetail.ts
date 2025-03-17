export interface MovieDetail {
    id: string,
    title: string,
    genre: string,
    year: string
}

export interface MovieListItemDetail {
    movie: MovieDetail
}