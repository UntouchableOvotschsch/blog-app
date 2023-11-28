import React from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import styles from './Button.module.scss';

type ThemeVariant = 'clear' | 'outline' | 'outline_red';

type SizeVariant = 'size_m' | 'size_l' | 'size_xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeVariant;
    size?: SizeVariant;
    disabled?: boolean;
    maxWidth?: boolean;
}

export const Button = typedMemo((props: ButtonProps) => {
    const { className, children, theme = 'clear', size = 'size_m', disabled, maxWidth, ...otherProps } = props;

    const mods: Mods = {
        [styles.disabled]: disabled,
        [styles.maxWidth]: maxWidth,
    };

    return (
        <button
            type='button'
            className={classNames(styles.Button, mods, [styles[theme], styles[size], className])}
            disabled={disabled}
            {...otherProps}>
            {children}
        </button>
    );
});
