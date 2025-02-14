import { Link } from 'react-router-dom';

export default function Header()
{
    return <header className="header">
        <div>
            <Link to={'/'}>Logo</Link>
        </div>
        <nav>
            <ul>
                <Link to={'/add-movie'}>Add Movie</Link>
                <Link to={'/my-movies'}>My Movies</Link>
            </ul>
        </nav>
        <div>Account</div>
    </header>
}