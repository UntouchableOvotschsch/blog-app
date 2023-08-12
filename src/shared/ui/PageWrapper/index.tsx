import React, { MutableRefObject, ReactNode } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';

interface IntersectionObserverProps {
    children: ReactNode
    wrapperRef?: MutableRefObject<HTMLDivElement>
    className?: string
}

const PageWrapper = ({
    children,
    wrapperRef,
    className,
}: IntersectionObserverProps) => (
    <div className={classNames('wrapper', {}, [className])} ref={wrapperRef}>
        {children}
    </div>
);

export default PageWrapper;
