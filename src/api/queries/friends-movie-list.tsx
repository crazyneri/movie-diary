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

        movieList.id = getRandomId();
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

    const userResult = await axios.get(`${user_url}/${userId}`);
    const userData = userResult.data;

    if(!userData?.lists || userData.lists.length === 0) return [];

    const movieListsResult = await axios.get(`${lists_url}`);
    const listsData = movieListsResult.data as FriendsMovieListDetail[];

    return listsData.filter(list => {
        if(userData.lists.indexOf(list.id) > -1)
        {
            return list;
        }
    });

}