
interface MovieSearchDetail{
    searchTerm: string,
    onSearch: (input: string) => void
}
export default function MovieListSearch({searchTerm,onSearch}:MovieSearchDetail)
{
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
        <input className="search-input" type="text" placeholder="search movies..." onChange={(e) => {onSearch(e.target.value)}} value={searchTerm}/>
    </form>;
}