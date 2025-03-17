import {useState} from 'react';
import {containerFlexCol, containerForm, formChild, formGroup} from "../classes/classes";
import Button from "./Button";
import useMoviesContext from "../hooks/use-movies-context";
import {MovieDetail} from '../api/types/MovieDetail';

type FormDataKeys = keyof MovieDetail;
export default function Form()
{
    const [formData, setFormData] = useState<MovieDetail | {}>({});
    const { createMovie } = useMoviesContext();

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = e.currentTarget.elements.name;
        const genre = e.currentTarget.elements.genre;

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
            <input className={formChild} id="title" name="title" type="text" onChange={handleFormValue}/>
        </div>

        <div className="w-[90%]">
            <select name="genre" id="genre" className={formChild} onChange={handleFormValue}>
                <option value="none">Select movie genre</option>
                <option value="horror">Horror</option>
                <option value="action">Action</option>
                <option value="thriller">Thriller</option>
            </select>
        </div>
        <Button type="primary">Add a movie</Button>
    </form>
}