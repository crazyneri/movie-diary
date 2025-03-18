import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root';
import Homepage from './pages/HomePage';
import MoviesListPage from './pages/MoviesListPage';
import AddMoviePage from './pages/AddMoviePage';
import ModalPage from './pages/ModalPage';
import useMoviesContext from "./hooks/use-movies-context";
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
      },
      {
        path: '/modal',
        element: <ModalPage/>
      }
    ]
  }
])
function App() {

  const {stableGetMovieList} = useMoviesContext();

  useEffect(() => {
    stableGetMovieList();
  }, [stableGetMovieList])

  return <RouterProvider router={router} />
}

export default App
