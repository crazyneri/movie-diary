import {createContext, useState} from "react";
import {UserDetail} from "../api/types/UserDetail";

import axios from "axios";

export interface LoginDetail{
    email: string,
    password: string
}

export interface RegisterDetail extends LoginDetail{
    name: string,
    surname: string,
}
interface AuthContextDetail{
    user: UserDetail | null,
    setUser: React.Dispatch<React.SetStateAction<UserDetail | null>>,
    login: ({email, password}:LoginDetail) => Promise<void>,
    register: (formData: RegisterDetail) => Promise<boolean>,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    getUser: () => Promise<void>,
    logout: () => void
}
export const AuthContext = createContext<AuthContextDetail | null>(null);

export default function AuthProvider(props: React.PropsWithChildren<{}>)
{

    const storedUser = localStorage.getItem('user');
    let initialUser;
    if(storedUser)
    {
        initialUser = JSON.parse(storedUser);
    }



    const url = 'http://localhost:3004/users';
    const [user, setUser] = useState<UserDetail | null>( initialUser || null);
    const [token, setToken] = useState(localStorage.getItem('token') || "");

    const login = async ({email, password}:LoginDetail) => {
        const result = await axios.get(url);
        const users = result.data as UserDetail[];
        const userResult = users.filter(userData => {
            if(userData.email === email && userData.password === password)
            {
                return userData;
            }
            return;
        })[0];

        if(userResult)
        {

            setUser(userResult);
            setToken(userResult.id);

            localStorage.setItem('token', userResult.id);
            localStorage.setItem('user', JSON.stringify(userResult));

        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken('');
    }

    const register = async (registerData: RegisterDetail) => {
        const userData = {...registerData, "id": Math.floor(Math.random()*1000).toString()};
        const result = await axios.post(url, userData);
        if(result.status === 201 || result.status === 200)
        {
            setUser(result.data);
            setToken(result.data.id);

            localStorage.setItem('token', result.data.id);
            localStorage.setItem('user', JSON.stringify(result.data));
            return true;
        }
        return false;


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

    return <AuthContext.Provider value={{user, setUser, login, register, token, setToken, getUser, logout}}>{props.children}</AuthContext.Provider>;
}


