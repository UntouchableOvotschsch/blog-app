import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollProps {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    // wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfinityScroll({
    callback,
    // wrapperRef,
    triggerRef,
}: UseInfiniteScrollProps) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                // Временное решение, пока не разберусь, почему не работает с собственным враппером
                root: document.querySelector('wrapper'),
                rootMargin: '20px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef]);
}
