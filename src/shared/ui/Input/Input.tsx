import React, {
    InputHTMLAttributes, memo, MutableRefObject, useEffect, useRef,
} from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import styles from './Input.module.scss';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly'>
interface InputProps extends InputAttributes {
    className?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    readOnly?: boolean
}
const Input = memo(({
    className, onChange, autoFocus, readOnly, ...args
}: InputProps) => {
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
            className={classNames(
                styles.input,
                mods,
                [className],
            )}
            onChange={changeHandler}
            readOnly={readOnly}
            ref={inputRef}
            {...args}
        />
    );
});

export default Input;
