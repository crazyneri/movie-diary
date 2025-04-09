import {formChild} from '../classes/classes';

interface MovieSearchDetail{
    onSearch: (input: string) => void
}
export default function MovieListSearch({onSearch}:MovieSearchDetail)
{
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
        <input className={formChild} type="text" placeholder="search movies..." onChange={(e) => {onSearch(e.target.value)}}/>
    </form>;
}