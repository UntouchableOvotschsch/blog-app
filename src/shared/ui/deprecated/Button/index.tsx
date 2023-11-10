import React, { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';

import styles from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outlineRed',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'background_inverted',
}

export enum SizeButton {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: SizeButton;
    disabled?: boolean;
}

/**
 * @deprecated
 */

export const Button = memo((props: ButtonProps) => {
    const isMobile = useDeviceDetect();
    const {
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        size = SizeButton.M,
        disabled,
        ...otherProps
    } = props;

    const mods: Mods = {
        [styles.square]: square,
        [styles.disabled]: disabled,
    };

    return (
        <button
            type='button'
            className={classNames(styles.Button, mods, [
                !isMobile && styles.desktop,
                styles[theme],
                styles[size],
                className,
            ])}
            disabled={disabled}
            {...otherProps}>
            {children}
        </button>
    );
});
