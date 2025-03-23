import { Link } from 'react-router-dom';
import {containerFlex} from '../classes/classes';
import {FilmIcon} from '@heroicons/react/24/outline';
import useAuthContext from '../hooks/use-auth-context';

export default function Header()
{
    const {user} = useAuthContext();
    const greetUser = () =>{
        if(user?.name)
        {
            return 'Hi, '+user.name;
        }
        return false;
    }
    return <header className="header">
        <div className="font-semibold text-lg">
            <Link to={'/'} className={containerFlex+' items-center gap-x-[0.6rem]'}><FilmIcon className="size-4"/> Mirame</Link>
        </div>
        <nav>
            <ul>
                <Link to={'/add-movie'}>Add Movie</Link>
                <Link to={'/my-movies'}>My Movies</Link>
            </ul>
        </nav>
        <div>{greetUser() || 'Account'}</div>
    </header>
}