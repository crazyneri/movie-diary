import {getLoggedInUserId, getUserObject} from "./users";
import {getRandomId} from "../functions/helper-functions";
import {FriendsMovieListDetail} from "../types/FriendsMovieListDetail";
import axios from "axios";

const lists_url = 'http://localhost:3004/lists';
const user_url = 'http://localhost:3004/users';
export const createMovieList = async (movieList: FriendsMovieListDetail) => {
    try{
        const userId = getLoggedInUserId();
        if(!userId) return false;

        movieList.id = getRandomId().toString();
        movieList.users = [userId];
        const result = await axios.post(`${lists_url}`, movieList);
        const listStatus = result.status === 201 || result.status === 200;
        let userStatus = false;
        if(listStatus)
        {
           userStatus = await saveMovieListForUser(userId, result.data.id)
        }
        return userStatus && listStatus;

    }catch (e){
        throw new Error('failed to create a movie list');
    }


}

export const addMovieToList = async (movieId: number | string, list:FriendsMovieListDetail) => {

    try{
        if(!list?.movies || list.movies.length === 0)
        {
            list.movies = [movieId.toString()];
        }else{
            list.movies.push(movieId.toString())
        }

        const result = await axios.put(`${lists_url}/${list.id}`, list);
        return result.status;
    }catch(e){
        throw new Error(`failed to add movie to list: ${e}`);
    }
}

const saveMovieListForUser = async (userId: string | number, movieListId: string) => {
    const user = await getUserObject(userId);

    if(!user?.lists || user.lists.length === 0)
    {
        user.lists = [movieListId];
    }else{
        user.lists = [...user.lists, movieListId];
    }

    const result = await axios.put(`${user_url}/${userId}`, user);
    return result.status === 201 || result.status === 200;
}

export const getMovieListsForUser = async () => {
    const userId = getLoggedInUserId();

    if(!userId) return [];

    // const userResult = await axios.get(`${user_url}/${userId}`);
    // const userData = userResult.data;


    // if(!userData?.lists || userData.lists.length === 0) return [];

    const movieListsResult = await axios.get(`${lists_url}`);
    const listsData = movieListsResult.data as FriendsMovieListDetail[];


    // return listsData.filter(list => {
    //     if(userData.lists.indexOf(list.id) > -1)
    //     {
    //         return list;
    //     }
    // });
    if(!listsData || listsData.length === 0) return [];
    return listsData.filter(list => {
        if(list?.users.length !== 0 && list.users.indexOf(userId) > -1)
        {
            return list;
        }
    });

}

export const getMoviesForList = async (listId: string | number | undefined) =>{
    if(listId !== undefined)
    {
        const result = await axios.get(`${lists_url}/${listId}`);
        return !result.data?.movies ? [] : result.data.movies;
    }else{
        throw new Error("No list id provided");
    }

}

export const getMovieListById = async (listId: string | number | undefined) => {
    if(listId !== undefined)
    {
        const result = await axios.get(`${lists_url}/${listId}`);
        return !result?.data ? [] : result.data;
    }else{
        throw new Error("No list id provided");
    }
}

export const deleteMovieFromList = async (list:FriendsMovieListDetail, movieId: string | number) => {
    const movieIds = list?.movies && list.movies.filter(movieID => movieID !== movieId);
    const updatedList = {...list, movies: movieIds};

}

export const deleteList = async (list:FriendsMovieListDetail | null) => {
    if(list)
    {
        await axios.delete(`${lists_url}/${list.id}`);
    }

}