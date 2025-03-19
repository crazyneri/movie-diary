import {createContext, useState, useCallback} from "react";
import {UserDetail} from '../api/types/UserDetail';
import axios from "axios";
import {MovieDetail} from "../api/types/MovieDetail";

export interface UserContextDetail{
    users: UserDetail[],
    setUsers: React.Dispatch<React.SetStateAction<UserDetail[]>>,
    createUser: (user:UserDetail) => Promise<void>
}

export const UserContext = createContext<UserContextDetail | null>(null);

export default function UsersProvider (props: React.PropsWithChildren<{}>){
    const url = 'http://localhost:3004/users';

    const [users, setUsers] = useState<UserDetail[]>([]);

    const getUserList = async () => {
        const result = await axios.get(url);
        setUsers(result.data);
    }

    const stableGetUserList = useCallback(getUserList, []);
}
