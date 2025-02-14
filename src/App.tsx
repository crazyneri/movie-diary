import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root';
import Homepage from './pages/HomePage';
import MoviesListPage from './pages/MoviesListPage';
import AddMoviePage from './pages/AddMoviePage';

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

  return <RouterProvider router={router} />
}

export default App
