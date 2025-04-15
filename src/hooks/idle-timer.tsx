import { useState } from 'react';
import { useIdleTimer } from "react-idle-timer";
import useAuthContext from './use-auth-context';

export default function useIdleTimout({idleTime = 1})
{
    const idleTimeout = 1000 * idleTime;
    const [isIdle, setIdle] = useState<boolean>(false);
    const {user, logout} = useAuthContext();

    const handleIdle = () => {
        if(user)
        {
            setIdle(true);
            logout();
        }

    }

    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        onIdle: handleIdle,
        debounce: 500
    });

    return{
        isIdle,
        setIdle,
        idleTimer
    }
}