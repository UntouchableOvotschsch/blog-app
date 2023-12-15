import { useCallback, useEffect, useMemo, useState } from 'react';

export const useScrollPosition = () => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const eventListener = useCallback(() => {
        setScrollX(() => window.scrollX);
        setScrollY(() => window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', eventListener);

        return () => window.removeEventListener('scroll', eventListener);
    }, [eventListener]);

    return useMemo(
        () => ({
            scrollX,
            scrollY,
        }),
        [scrollX, scrollY],
    );
};
