import {useState, useEffect} from 'react';
import Login from '../components/forms/Login';
import {containerFlexCol} from '../classes/classes';
import SignUp from "../components/forms/SignUp";
import useAuthContext from "../hooks/use-auth-context";
export default function HomePage(){
    const {user, getUser} = useAuthContext();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        getUser();
    },[getUser])

    const displayLogin = () => {
        setIsLogin(!isLogin);
    }


    return <section className={containerFlexCol + ' mt-[3rem]'}>
        <p className="text-3xl font-bold">What have you watched lately{user && ', '+user.name}?</p>
        {!localStorage.getItem('token') ? (isLogin? <Login hideLogin={displayLogin}/> : <SignUp hideLogin={displayLogin}/>) : ''}
    </section>
}