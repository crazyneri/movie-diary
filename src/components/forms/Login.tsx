import {containerFlexCol, containerForm, formGroup, formChild} from '../../classes/classes';
import {useState} from "react"
import {TvIcon} from '@heroicons/react/24/outline';
import {voidFunction} from '../../api/types/MixDetails';
import Button from "../Button";
import useAuthContext from "../../hooks/use-auth-context";
import {LoginDetail} from "../../context/auth-context";

export default function Login({hideLogin}:voidFunction)
{
    const {login} = useAuthContext();
    const [formData, setFormData] = useState<LoginDetail | {}>({});

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if("email" in formData)
        {
            await login(formData);
            // TODO movie list not refreshed w/o reloading
            window.location.reload();
        }

    }

    return <form onSubmit={handleSubmit} className={containerFlexCol+' '+containerForm}>
        <div className={containerFlexCol}>
            <TvIcon className="size-5"/>
            <h2>Login to create movie lists with friends!</h2>
        </div>

        <div className={formGroup}>
            <label htmlFor="email">Email<span className="text-red-400">*</span></label>
            <input className={formChild} id="email" name="email" type="email" onChange={handleFormValue} required/>
        </div>

        <div className={formGroup}>
            <label htmlFor="password">Password<span className="text-red-400">*</span></label>
            <input className={formChild} id="password" name="password" type="password" onChange={handleFormValue} required/>
        </div>

        <Button type="primary">Submit</Button>

        <span onClick={hideLogin} className="text-sm border-b mt-[0.8rem] px-[0.3rem] cursor-default">Sign up</span>
    </form>

}