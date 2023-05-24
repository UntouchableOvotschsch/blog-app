import React, {
    InputHTMLAttributes, memo, MutableRefObject, useEffect, useRef,
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Input.module.scss';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>
interface InputProps extends InputAttributes {
    className?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
}
const Input = memo(({
    className, onChange, autoFocus, ...args
}: InputProps) => {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (inputRef.current && autoFocus) {
            inputRef.current?.focus();
        }
    }, [autoFocus]);
    return (
        <input
            className={classNames(
                styles.input,
                {},
                [className],
            )}
            onChange={changeHandler}
            ref={inputRef}
            {...args}
        />
    );
});

export default Input;
