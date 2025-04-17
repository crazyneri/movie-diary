import {useState, useEffect} from 'react';
import Login from '../components/forms/Login';
import {containerFlexCol} from '../classes/classes';
import SignUp from "../components/forms/SignUp";
import useAuthContext from "../hooks/use-auth-context";
import Button from "../components/Button";
export default function HomePage(){
    const {user, getUser, token} = useAuthContext();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        getUser();
    },[token])

    const displayLogin = () => {
        setIsLogin(!isLogin);
    }


    return <section className={containerFlexCol + ' mt-[3rem]'}>
        <p className="text-3xl font-bold">What will you watch next{user && ', '+user.name}?</p>
        <div className="flex w-[50%] max-w-lg gap-[1rem]">
            <a href="/add-movie" className="grow flex justify-center"><Button type="primary">Add a movie</Button></a>
            <a href="/my-movies" className="grow flex justify-center"><Button type="secondary">See all movies</Button></a>

        </div>
        {!token ? (isLogin? <Login hideLogin={displayLogin}/> : <SignUp hideLogin={displayLogin}/>) : ''}
    </section>
}