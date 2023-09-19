import React, { memo } from 'react';

import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps{
    className?: string
    theme?: AppLinkTheme;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        className,
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;
    return (
        <Link
            to={__PROJECT__ !== 'storybook' ? to : '#'}
            className={
                classNames(
                    styles.AppLink,
                    {},
                    [styles[theme], className],
                )
            }
            {...otherProps}
        >
            {children}
        </Link>
    );
});
