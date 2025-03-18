export interface MovieDetail {
    id: string,
    title: string,
    genre: string,
    year: string,
    isWatched: boolean
}

export interface MovieListItemDetail {
    movie: MovieDetail,
    open: () => void,
    activeMovie: (activeMovie: MovieDetail) => void
}
