import {containerFlexCol, containerForm, formGroup, formChild, pageTitle, containerFlex} from '../classes/classes';
import useAuthContext from "../hooks/use-auth-context";
import {FriendsMovieListDetail} from "../api/types/FriendsMovieListDetail";
import {useState, useEffect} from 'react';
import {getMovieListsForUser, createMovieList, deleteList} from "../api/queries/friends-movie-list";
import Button from "../components/Button";
import {FilmIcon, TvIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import FriendsListItem from "../components/FriendsListItem";
import Modal from "../components/Modal";

export default function FriendsMovieListPage(){
    const {user} = useAuthContext();
    const navigate = useNavigate();

    if(!user?.id)
    {
        navigate('/');
    }
    const [formData, setFormData] = useState<FriendsMovieListDetail | {}>({});
    const [movieLists, setMovieLists] = useState<FriendsMovieListDetail[] | []>([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [activeList, setActiveList] = useState<FriendsMovieListDetail | null>(null);
    const [modalAction, setModalAction] = useState('');




    useEffect(() => {
        const fetchLists = async () => {
            const lists = await getMovieListsForUser();
            if(lists !== undefined)
            {
                setMovieLists(lists);
            }
        }
        fetchLists();

    }, [isOpenModal]);


    const handleModal = (list:FriendsMovieListDetail, action:string) => {
        setIsOpenModal(true);
        setActiveList(list);
        setModalAction(action);
    }

    const renderedLists = movieLists.map(list => {
        return <FriendsListItem key={list.id} list={list} openModal={handleModal}/>
    });

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleListCreation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if('name' in formData)
        {
            const result = await createMovieList(formData);
            if(result){
                setSubmitSuccess(true);
                setMovieLists([...movieLists, formData]);

            }
        }
    }

    const handleDeleteList = async () => {
        await deleteList(activeList);
        setIsOpenModal(false);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    let modalContent = <div></div>;

    if(modalAction === 'delete')
    {
        modalContent = <>
                    <div className={containerFlex + ' gap-[0.3rem] items-baseline'}>
                        <p>Do you want to delete</p>
                        <span className="font-semibold text-lg">{activeList && activeList.name}?</span>
                    </div>
                    <div className={containerFlex + ' gap-[1rem] max-w-lg mx-auto'}>
                        <Button type="cancel" onClick={closeModal}>Cancel</Button>
                        <Button type="danger" onClick={handleDeleteList}>Delete</Button>
                    </div>
                </>;
    }



    return <div className={containerFlexCol}>
        <div className="flex items-center">
            <FilmIcon className="size-5 inline"/>
            <h1 className={pageTitle}>My friends' lists</h1>
        </div>
        {
            submitSuccess
                ?
                <div>
                    <div>Creation successful</div>
                    <Button type="primary" onClick={() => setSubmitSuccess(false)}>New List</Button>
                </div>

                :
            <form onSubmit={handleListCreation} className={containerFlexCol+' '+containerForm}>
                <div className={containerFlexCol}>
                    <TvIcon className="size-5"/>
                    <h2>Create list</h2>
                </div>
                <div className={formGroup}>
                    <label htmlFor="list-name">Name of your list</label>
                    <input id="list-name" type="text" name="name" className={formChild} onChange={handleFormValue} required placeholder="Halloween themed"/>
                </div>

                <Button type="primary">Submit</Button>
            </form>
        }


        <div className="flex flex-col items-center max-h-[50%] overflow-y-auto w-full pb-[2rem]">
            <h2>Existing lists</h2>
            <ul className="w-full md:w-[70%] lg:w-[50%]">{renderedLists}</ul>
        </div>

        {isOpenModal && <Modal onClose={closeModal}>{modalContent}</Modal>}
    </div>;
}