import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import AuthProvider from "../context/auth-context";

export default function Root(){
    return <div>
        <AuthProvider>
            <Header/>
            <Outlet/>
        </AuthProvider>

    </div>
}