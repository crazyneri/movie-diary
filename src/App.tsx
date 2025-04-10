import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root';
import Homepage from './pages/HomePage';
import MoviesListPage from './pages/MoviesListPage';
import AddMoviePage from './pages/AddMoviePage';
import useMoviesContext from "./hooks/use-movies-context";
import {useEffect} from "react";
import useAuthContext from "./hooks/use-auth-context";
import FriendsMovieListPage from "./pages/FriendsMovieListPage";


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
      },
      {
        path: '/my-lists',
        element: <FriendsMovieListPage/>
      }
    ]
  }
])
function App() {

  const {stableGetMovieList} = useMoviesContext();
  const {token} = useAuthContext();

  useEffect(() => {
      stableGetMovieList(token);

  }, [stableGetMovieList, token])



  return <RouterProvider router={router}/>
}

export default App
