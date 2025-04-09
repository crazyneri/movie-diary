import { useState } from 'react';
import { useIdleTimer } from "react-idle-timer";
import useAuthContext from './use-auth-context';

export default function useIdleTimout({idleTime = 1})
{
    // TODO not working
    const idleTimeout = 1000 * idleTime;
    const [isIdle, setIdle] = useState<boolean>(false);
    const {logout} = useAuthContext();

    const handleIdle = () => {
        setIdle(true);
        logout;
    }

    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        // promptTimeout: idleTimeout / 2,
        // onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500
    });

    return{
        isIdle,
        setIdle,
        idleTimer
    }
}