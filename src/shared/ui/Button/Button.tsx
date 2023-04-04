import React, { memo } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'background_inverted'

}

export enum SizeButton {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',

}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string,
    theme?: ThemeButton
    square?: boolean
    size?: SizeButton
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme,
        square,
        size,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [styles.square]: square,
    };

    return (
        <button
            type="button"
            className={classNames(
                styles.Button,
                mods,
                [className, styles[theme], styles[size]],
            )}
            {...otherProps}
        >
            {
                children
            }
        </button>
    );
});
