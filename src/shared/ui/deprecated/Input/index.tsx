import React, { InputHTMLAttributes, memo, MutableRefObject, useEffect, useRef } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';

import styles from './Input.module.scss';

export enum InputAlign {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly' | 'value'>;
interface InputProps extends InputAttributes {
    className?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    readOnly?: boolean;
    align?: InputAlign;
    value: string | number | undefined;
}

/**
 * @deprecated
 */

const Input = memo(
    ({ className, onChange, autoFocus, readOnly, align = InputAlign.CENTER, value, ...args }: InputProps) => {
        const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };
        const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
        const mods: Mods = {
            [styles.readOnly]: readOnly,
        };
        useEffect(() => {
            if (inputRef.current && autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus]);
        return (
            <input
                className={classNames(styles.input, mods, [className, styles[align]])}
                value={value || ''}
                onChange={changeHandler}
                readOnly={readOnly}
                ref={inputRef}
                {...args}
            />
        );
    },
);

export default Input;
