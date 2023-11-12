import React, { ReactNode } from 'react';

import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import styles from './AppLink.module.scss';

type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    withHover?: boolean;
}

export const AppLink = typedMemo((props: AppLinkProps) => {
    const { className, children, to, variant = 'primary', withHover = true, ...otherProps } = props;
    return (
        <Link
            to={to}
            className={classNames(styles.AppLink, { [styles.hovered]: withHover }, [className, styles[variant]])}
            {...otherProps}>
            {children}
        </Link>
    );
});
