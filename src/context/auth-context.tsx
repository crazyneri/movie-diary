import {createContext, useState} from "react";
import {UserDetail} from "../api/types/UserDetail";

import axios from "axios";

export interface LoginDetail{
    email: string,
    password: string
}
interface AuthContextDetail{
    user: UserDetail | null,
    setUser: React.Dispatch<React.SetStateAction<UserDetail | null>>,
    login: ({email, password}:LoginDetail) => Promise<void>,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    getUser: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextDetail | null>(null);

export default function AuthProvider(props: React.PropsWithChildren<{}>)
{
    const url = 'http://localhost:3004/users';
    const [user, setUser] = useState<UserDetail | null>(null);
    const [token, setToken] = useState(localStorage.getItem('token') || "");


    const login = async ({email, password}:LoginDetail) => {
        const result = await axios.get(url);
        const users = result.data as UserDetail[];
        const user = users.filter(userData => {
            if(userData.email === email && userData.password === password)
            {
                return userData;
            }
            return;
        })[0];

        if(user)
        {

            setUser(user);
            setToken(user.id);

            localStorage.setItem('token', user.id);

        }
    }

    const getUser = async () => {
        const id = localStorage.getItem('token');
        if(id?.length)
        {
            const result = await axios.get(`${url}/${id}`);
            const user = result.data;

            if(user)
            {
                setUser(user);
            }
        }
    }

    return <AuthContext.Provider value={{user, setUser, login, token, setToken, getUser}}>{props.children}</AuthContext.Provider>;
}