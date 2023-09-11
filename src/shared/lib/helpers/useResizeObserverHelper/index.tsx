import { useEffect, useRef } from 'react';

export const useResizeObserverHelper = () => {
    const defaultOnErrorFn = useRef(window.onerror);
    // Нужно для фикса ошибки с ResizeObserver
    useEffect(() => {
        // eslint-disable-next-line consistent-return
        window.onerror = (...args) => {
            if (args[0] === 'ResizeObserver loop completed with undelivered notifications.') {
                return true;
            }
            // eslint-disable-next-line no-unused-expressions
            defaultOnErrorFn.current && defaultOnErrorFn.current(...args);
        };
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            window.onerror = defaultOnErrorFn.current;
        };
    }, []);
};
