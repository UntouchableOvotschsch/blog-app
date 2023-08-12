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
}: IntersectionObserverProps) => {
    if (__PROJECT__ === 'storybook') {
        return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
                {children}
            </>
        );
    }
    return (
        <div className={classNames('wrapper', {}, [className])} ref={wrapperRef}>
            {children}
        </div>
    );
};

export default PageWrapper;
