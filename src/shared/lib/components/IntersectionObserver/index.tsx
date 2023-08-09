import React, { MutableRefObject, ReactNode, useRef } from 'react';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll';

interface IntersectionObserverProps {
    children: ReactNode
    onTriggerCallback?: () => void
}

const IntersectionObserver = ({
    children,
    onTriggerCallback,
}: IntersectionObserverProps) => {
    // const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfinityScroll({
        callback: onTriggerCallback,
        // wrapperRef,
        triggerRef,
    });

    return (
        <>
            {children}
            <div
                ref={triggerRef}
            />
        </>
    );
};

export default IntersectionObserver;
