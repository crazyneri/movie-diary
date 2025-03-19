import {useContext} from 'react';
import {AuthContext} from '../context/auth-context';

export default function useAuthContext()
{
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be used within a Provider");
    }

    return context;
}