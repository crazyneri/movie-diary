import {useParams} from "react-router-dom";
import useMoviesContext from "../hooks/use-movies-context";
import {containerFlexCol, pageTitle} from "../classes/classes";


export default function MoviePage()
{
    const {slug} = useParams();
    const {movies} = useMoviesContext();

    const movie = movies.filter(movie => {
        return movie.title.replace(/ /g,'-') === slug;
    })[0];

    const movieRatings = movie && movie.ratings ? movie.ratings.map(rating => {
        return <p className="grid grid-cols-2"><span className="text-sm font-medium mr-[.3rem]">{rating.Source}:</span> <span className="font-semibold">{rating.Value}</span></p>;
    }) : '';

    return <div className={containerFlexCol}>
        {
            movie &&
            <>
                <h2 className={pageTitle}>{movie.title}</h2>
                <div className="max-w-[54rem]">
                    <div className="flex gap-[3rem]">
                        <div className="flex-1">
                            <img src={movie.poster} alt={movie.title + ' poster'}/>
                        </div>

                        <div className="flex-2 flex flex-col gap-[1rem]">
                            <p className="text-sm font-semibold">{movie.genre}</p>

                            <p>{movie.plot}</p>
                            <div className="flex">
                                <h3 className="mr-[.5rem] font-semibold">Actors:</h3>
                                <p>{movie.actors}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Ratings:</h3>
                                <p>{movieRatings && movieRatings}</p>
                            </div>


                        </div>

                    </div>
                    <div className="mt-[2rem]">
                        <p>{movie.myDescription}</p>
                    </div>
                </div>



            </>
        }
    </div>
}