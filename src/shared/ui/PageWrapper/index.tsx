import React, { ReactNode, RefObject } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ComponentTestProps } from '@/shared/types/test';

interface PageWrapperProps extends
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    ComponentTestProps {
    children: ReactNode
    className?: string
    wrapperRef?: RefObject<HTMLElement>
}

const PageWrapper = ({
    children,
    className,
    wrapperRef,
    'data-testid': dataTestId,
    ...otherProps
}: PageWrapperProps) => (
    <main
        className={classNames('wrapper', {}, [className])}
        ref={wrapperRef}
        {...otherProps}
        data-testid={dataTestId ?? 'Page'}
    >
        {children}
    </main>
);

export default PageWrapper;
