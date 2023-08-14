import { useCallback, useEffect, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const throttledCallback = useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            callback(...args);
            throttleRef.current = true;
        }
    }, [callback]);

    timer.current = setTimeout(() => {
        throttleRef.current = false;
    }, delay);

    useEffect(() => () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    return throttledCallback;
}
