import {containerFlexCol, containerForm, formGroup, formChild} from '../../classes/classes';
import {useState} from "react"
import {TvIcon} from '@heroicons/react/24/outline';
import {voidFunction} from '../../api/types/MixDetails';
import Button from "../Button";

export default function Login({hideLogin}:voidFunction)
{
    const [formData, setFormData] = useState<{}>({});

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return <form className={containerFlexCol+' '+containerForm}>
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