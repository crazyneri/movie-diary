import {containerFlexCol, containerForm, formGroup, formChild, pageTitle} from '../classes/classes';
import useAuthContext from "../hooks/use-auth-context";
import {FriendsMovieListDetail} from "../api/types/FriendsMovieListDetail";
import {useState, useEffect, useCallback} from 'react';
import {getMovieListsForUser, createMovieList} from "../api/queries/friends-movie-list";
import Button from "../components/Button";
import {FilmIcon, TvIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";

export default function FriendsMovieListPage(){
    const {user} = useAuthContext();
    const navigate = useNavigate();

    if(!user?.id)
    {
        navigate('/');
    }
    const [formData, setFormData] = useState<FriendsMovieListDetail | {}>({});
    const [movieLists, setMovieLists] = useState<FriendsMovieListDetail[] | []>([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const stableGetMovieListsForUser = useCallback(getMovieListsForUser, []);

    useEffect(() => {
        const getLists = async () => {
            const lists = await stableGetMovieListsForUser();
            if(lists !== undefined)
            {
                setMovieLists(lists);
            }

        };
        getLists();

    }, [stableGetMovieListsForUser])

    const renderedLists = movieLists.map(list => {
        return <div className={formChild + ' md:w-[70%] lg:w-[50%]'} key={list.id}>{list.name}</div>
    });

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleListCreation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if('name' in formData)
        {
            const result = await createMovieList(formData);
            if(result){
                setSubmitSuccess(true);
                setMovieLists([...movieLists, formData])
            }
        }
    }

    return <div className={containerFlexCol}>
        <div className="flex items-center">
            <FilmIcon className="size-5 inline"/>
            <h1 className={pageTitle}>My friends' lists</h1>
        </div>
        {
            submitSuccess
                ?
                <div>
                    <div>Creation successful</div>
                    <Button type="primary" onClick={() => setSubmitSuccess(false)}>New List</Button>
                </div>

                :
            <form onSubmit={handleListCreation} className={containerFlexCol+' '+containerForm}>
                <div className={containerFlexCol}>
                    <TvIcon className="size-5"/>
                    <h2>Create list</h2>
                </div>
                <div className={formGroup}>
                    <label htmlFor="list-name">Name of your list</label>
                    <input id="list-name" type="text" name="name" className={formChild} onChange={handleFormValue} required/>
                </div>

                <Button type="primary">Submit</Button>
            </form>
        }

        <h2>Existing lists</h2>
        {renderedLists}
    </div>;
}