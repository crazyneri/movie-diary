import MovieList from '../components/MovieList';
import {containerFlexCol, pageTitle} from "../classes/classes";
import {FilmIcon} from '@heroicons/react/24/outline';
export default function MoviesListPage()
{
    return <div className={containerFlexCol}>
        <div className="flex items-center">
            <FilmIcon className="size-5 inline"/>
            <h1 className={pageTitle}>My movie list</h1>
        </div>
        <MovieList/>
    </div>


}