import {useState} from 'react';
import {UserDetail} from '../api/types/UserDetail';
import Login from '../components/forms/Login';
import {containerFlexCol} from '../classes/classes';
import SignUp from "../components/forms/SignUp";
export default function HomePage(){
    const [user, setUser] = useState<UserDetail>();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const displayLogin = () => {
        setIsLogin(!isLogin);
    }

    return <section className={containerFlexCol + ' mt-[3rem]'}>
        <p className="text-3xl font-bold">What have you watched lately?</p>
        {!user ? (isLogin? <Login hideLogin={displayLogin}/> : <SignUp hideLogin={displayLogin}/>) : `<p>Hello ${user.name}</p>`}
    </section>
}