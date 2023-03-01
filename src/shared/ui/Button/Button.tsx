import React, { FC } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline'

}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string,
    theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        onClick,
        theme,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                styles.Button,
                {},
                [className, styles[theme]],
            )}
            {...otherProps}
        >
            {
                children
            }
        </button>
    );
};
