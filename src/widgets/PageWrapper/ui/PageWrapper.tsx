import React, { ReactNode, RefObject } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

interface PageWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>{
    children: ReactNode
    className?: string
    wrapperRef?: RefObject<HTMLElement>
}

const PageWrapper = ({
    children,
    className,
    wrapperRef,
    ...otherProps
}: PageWrapperProps) => (
    <main
        className={classNames('wrapper', {}, [className])}
        ref={wrapperRef}
        {...otherProps}
    >
        {children}
    </main>
);

export default PageWrapper;
