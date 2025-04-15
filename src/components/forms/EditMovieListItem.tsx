import {MovieDetail, EditMovieDetail} from "../../api/types/MovieDetail";
import Button from "../Button";
import {formChild, formGroup} from "../../classes/classes";
import useMoviesContext from "../../hooks/use-movies-context";
import {useState} from "react";
import useAuthContext from "../../hooks/use-auth-context";

export default function EditMovieListItem({movie, closePopup}: {movie: MovieDetail | undefined; closePopup: () => void })
{
    const [formData, setFormData] = useState<EditMovieDetail | {}>({});
    const {editMovie} = useMoviesContext();
    const {user} = useAuthContext();

    const handleInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(movie !== undefined)
        {
            if("myDescription" in formData)
            {
                movie.myDescription = formData["myDescription"];
                const userId = user ? user.id : 0;
                editMovie({movie, userId});
            }
            closePopup();
        }

    }
    return <form onSubmit={handleSubmit} className="flex flex-col items-center w-full p-[1rem] rounded-lg">
        <div className={formGroup}>
            <label htmlFor="my-description">My description</label>
            <textarea onChange={handleInput} className={formChild} name="myDescription" id="my-description" cols={30} rows={5}>
                {movie && movie.myDescription}
            </textarea>

        </div>
        <Button type="primary">Submit</Button>
    </form>
}