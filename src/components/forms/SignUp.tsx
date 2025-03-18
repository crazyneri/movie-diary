import {containerFlexCol, containerForm, formChild, formGroup} from "../../classes/classes";
import {voidFunction} from '../../api/types/MixDetails';
import {TvIcon} from "@heroicons/react/24/outline";
import Button from "../Button";
export default function SignUp({hideLogin}:voidFunction)
{
    return <form className={containerFlexCol +' '+containerForm}>
        <div className={containerFlexCol}>
            <TvIcon className="size-5"/>
            <h2>Sign up to create movie lists with friends!</h2>
        </div>
        <div className={formGroup}>
            <label htmlFor="name">Name<span className="text-red-400">*</span></label>
            <input className={formChild} id="name" name="name" type="text" required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="surname">Surname<span className="text-red-400">*</span></label>
            <input className={formChild} id="surname" name="surname" type="text" required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="email">Email<span className="text-red-400">*</span></label>
            <input className={formChild} id="email" name="email" type="email" required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="password">Password<span className="text-red-400">*</span></label>
            <input className={formChild} id="password" name="password" type="password" required/>
        </div>
        <div className={formGroup}>
            <label htmlFor="repeat-password">Repeat password<span className="text-red-400">*</span></label>
            <input className={formChild} id="repeat-password" name="passwordRepeat" type="password" required/>
        </div>
        <Button type="primary">Submit</Button>
        <span onClick={hideLogin} className="text-sm border-b mt-[0.8rem] px-[0.3rem] cursor-default">Login</span>
    </form>
}