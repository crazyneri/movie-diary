import { Link } from 'react-router-dom';
import {containerFlex} from '../classes/classes';
import {FilmIcon} from '@heroicons/react/24/outline';
import useAuthContext from '../hooks/use-auth-context';
import useIdleTimout from '../hooks/idle-timer';


export default function Header()
{
    const {user, logout} = useAuthContext();
    // use to reset when displaying modal - cancel btn - idleTimer.reset()
    const {idleTimer} = useIdleTimout({idleTime:1});
    const greetUser = () =>{
        if(user?.name)
        {
            return `Looking good today, ${user.name}!`;
        }
        return false;
    }
    return <header className="header">
        <nav>
            <ul>
                <Link to={'/'} className={containerFlex+' items-center gap-x-[0.6rem] font-semibold text-lg'}><FilmIcon className="size-4"/> Mirame</Link>
                <Link to={'/add-movie'}>Add Movie</Link>
                <Link to={'/my-movies'}>My Movies</Link>
                {user && <Link to={'/my-lists'}>Friends' lists</Link>}
            </ul>
        </nav>
        <div className={containerFlex+' gap-[1rem]'}>
            <p>{greetUser() || 'Account'}</p>
            {user ? <Link to={'/'} onClick={logout}>Logout</Link> : ''}
        </div>
    </header>
}