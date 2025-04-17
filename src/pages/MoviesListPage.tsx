import MovieList from '../components/MovieList';
import {containerFlexCol, pageTitle} from "../classes/classes";
import {FilmIcon} from '@heroicons/react/24/outline';
import {getMovieListById} from '../api/queries/friends-movie-list';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FriendsMovieListDetail} from "../api/types/FriendsMovieListDetail";


export default function MoviesListPage()
{
    const {id} = useParams();

    const [movieList, setMovieList] = useState<FriendsMovieListDetail | null>(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if(id)
        {
            const fetchList = async () => {
                await getMovieListById(id).then((data) => {
                    setMovieList(data);
                    setLoading(false);
                });
            }
            fetchList();
        }else{
            setMovieList(null);
            setLoading(false);
        }

    }, [id]);


    return <div className={containerFlexCol}>
        {
            isLoading ?
                'loading...':
                <>
                    <div className="flex items-center">
                        <FilmIcon className="size-5 inline"/>
                        <h1 className={pageTitle}>{movieList?.name || 'My movie list'}</h1>
                    </div>
                    <MovieList list={movieList}/>
                </>
        }
    </div>


}