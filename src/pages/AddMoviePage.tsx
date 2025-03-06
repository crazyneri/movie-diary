import Button from "../components/Button";

export default function AddMoviePage()
{
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('clicked');
    }
    return <div>
        <h1>Add movie page</h1>
        <Button type="primary" onClick={handleOnClick}>Add a movie</Button>
    </div>
}