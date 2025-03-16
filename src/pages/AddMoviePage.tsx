import {containerFlexCol, pageTitle} from "../classes/classes";
import Form from '../components/Form';


export default function AddMoviePage()
{

    // const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     console.log('clicked');
    // }


    return <div>

            <div className={containerFlexCol}>
                <h1 className={pageTitle}>Add to watchlist</h1>
                    <Form/>
            </div>
    </div>
}