import {containerFlexCol, containerForm, formChild, formGroup} from "../../classes/classes";
import {voidFunction} from '../../api/types/MixDetails';
import {TvIcon} from "@heroicons/react/24/outline";
import Button from "../Button";
import useAuthContext from "../../hooks/use-auth-context";
import {RegisterDetail} from "../../context/auth-context";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
export default function SignUp({hideLogin}:voidFunction)
{
    const {register} = useAuthContext();
    const [formData, setFormData] = useState<RegisterDetail | {}>({});
    const [repeatPasswordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const repeatPass = document.getElementById('repeat-password') as HTMLInputElement;
        if("password" in formData && repeatPass)
        {
            if(repeatPass.value !== formData.password)
            {
                setPasswordError("Passwords don't match");
                return;
            }

            if("name" in formData && "email" in formData && "surname" in formData)
            {
                const result = await register(formData);
                if(result)
                {
                    navigate('/');
                }
            }
        }



    }

    return <form onSubmit={handleSubmit} className={containerFlexCol +' '+containerForm}>
        <div className={containerFlexCol}>
            <TvIcon className="size-5"/>
            <h2>Sign up to create movie lists with friends!</h2>
        </div>
        <div className={formGroup}>
            <label htmlFor="name">Name<span className="text-red-400">*</span></label>
            <input className={formChild} id="name" name="name" type="text" onChange={handleFormValue} required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="surname">Surname<span className="text-red-400">*</span></label>
            <input className={formChild} id="surname" name="surname" type="text" onChange={handleFormValue} required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="email">Email<span className="text-red-400">*</span></label>
            <input className={formChild} id="email" name="email" type="email" onChange={handleFormValue} required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="password">Password<span className="text-red-400">*</span></label>
            <input className={formChild} id="password" name="password" type="password" onChange={handleFormValue} required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="repeat-password">Repeat password<span className="text-red-400">*</span></label>
            <input className={formChild} id="repeat-password" name="passwordRepeat" type="password" required/>
        </div>
        <span>{repeatPasswordError}</span>
        <Button type="primary">Submit</Button>
        <span onClick={hideLogin} className="text-sm border-b mt-[0.8rem] px-[0.3rem] cursor-default">Login</span>
    </form>
}