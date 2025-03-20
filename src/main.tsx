import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx';
import MoviesProvider from './context/movies';
import AuthProvider from "./context/auth-context";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <MoviesProvider>
              <App />
          </MoviesProvider>
      </AuthProvider>
  </StrictMode>,
)
