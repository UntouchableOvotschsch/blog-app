import React, { ReactNode, RefObject } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ComponentTestProps } from '@/shared/types/testing';
import { toggleFeature } from '@/shared/lib/features/toggleFeature';

import styles from './PageWrapper.module.scss'

interface PageWrapperProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
        ComponentTestProps {
    children: ReactNode;
    className?: string;
    wrapperRef?: RefObject<HTMLElement>;
}

const PageWrapper = ({
    children,
    className,
    wrapperRef,
    'data-testid': dataTestId,
    ...otherProps
}: PageWrapperProps) => {

    const pageWrapperClassName = toggleFeature({
        off: () => classNames(styles.wrapper, {}, [className]),
        on: () => classNames(styles.wrapperRedesigned, {}, [className]),
        name: 'isAppRedesigned'
    });

    return (
    <main
        className={pageWrapperClassName}
        ref={wrapperRef}
        {...otherProps}
        data-testid={dataTestId ?? 'Page'}
    >
        {children}
    </main>
)};

export default PageWrapper;
