import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root';
import Homepage from './pages/HomePage';
import MoviesListPage from './pages/MoviesListPage';
import AddMoviePage from './pages/AddMoviePage';
import useMoviesContext from "./hooks/use-movies-context";
import useAuthContext from "./hooks/use-auth-context";
import {useEffect} from "react";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        index: true,
        element: <Homepage/>,
      },
      {
        path: '/my-movies',
        element: <MoviesListPage/>
      },
      {
        path: '/add-movie',
        element: <AddMoviePage/>
      }
    ]
  }
])
function App() {

  const {stableGetMovieList, stableGetMovieListForUser} = useMoviesContext();
  const {token} = useAuthContext();

  if(token)
  {

    useEffect(() => {
      stableGetMovieListForUser(token);
    }, [stableGetMovieListForUser])
  }else{

    useEffect(() => {
      stableGetMovieList();
    }, [stableGetMovieList])
  }


  return <RouterProvider router={router}/>
}

export default App
