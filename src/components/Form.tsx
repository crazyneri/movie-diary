import {containerFlexCol, containerForm, formChild, formGroup} from "../classes/classes";
import Button from "./Button";
import useMoviesContext from "../hooks/use-movies-context";



export default function Form()
{

    const { createMovie } = useMoviesContext();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = e.currentTarget.elements.movieName;
        const genre = e.currentTarget.elements.movieGenre;

        const object = {
            id: Math.floor((Math.random() * 1000)),
            title: title.value,
            genre: genre.value
        }

        createMovie(object);

        title.value = '';
        genre.value = 'none';
    }

    return <form className={containerFlexCol+' '+containerForm} onSubmit={handleSubmit}>
        <div className={formGroup}>
            <label htmlFor="movieName">Movie name</label>
            <input className={formChild} id="movieName" type="text"/>
        </div>

        <div className="w-[90%]">
            <select name="movieGenre" id="movieGenre" className={formChild}>
                <option value="none">Select movie genre</option>
                <option value="horror">Horror</option>
                <option value="action">Action</option>
                <option value="thriller">Thriller</option>
            </select>
        </div>
        <Button type="primary">Add a movie</Button>
    </form>
}