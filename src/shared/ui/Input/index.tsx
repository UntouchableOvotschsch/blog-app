import React, {
    InputHTMLAttributes,
    memo,
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import SearchIcon from '@/shared/assets/icons/Redesigned/search-icon.svg';

import Icon from '../Icon';
import styles from './Input.module.scss';

type InputAlignVariant = 'left' | 'center' | 'right';
type InputTypeVariant = 'search' | 'password';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly' | 'value'>;
interface InputProps extends InputAttributes {
    className?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    readOnly?: boolean;
    align?: InputAlignVariant;
    value: string | number | undefined;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    typeVariant?: InputTypeVariant;
}

const Input = memo(
    ({
        className,
        onChange,
        autoFocus,
        readOnly,
        align = 'center',
        value,
        typeVariant,
        addonLeft,
        addonRight,
        ...args
    }: InputProps) => {
        const changeHandler = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange?.(e.target.value);
            },
            [onChange],
        );

        const [focus, setFocus] = useState(false);

        const onFocus = useCallback(() => {
            setFocus(true);
        }, []);

        const onBlur = useCallback(() => {
            setFocus(false);
        }, []);

        const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
        const mods: Mods = useMemo(
            () => ({
                [styles.readOnly]: readOnly,
                [styles.focused]: focus,
                [styles.withAddonLeft]: Boolean(addonLeft) || typeVariant === 'search',
                [styles.withAddonRight]: Boolean(addonRight) || typeVariant === 'password',
            }),
            [addonLeft, addonRight, focus, readOnly, typeVariant],
        );
        useEffect(() => {
            if (inputRef.current && autoFocus) {
                inputRef.current?.focus();
            }
        }, [autoFocus]);

        const inputContent = useMemo(
            () => (
                <input
                    className={classNames(styles.input, {}, [className, styles[align]])}
                    value={value || ''}
                    onChange={changeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    readOnly={readOnly}
                    ref={inputRef}
                    {...args}
                />
            ),
            [align, args, changeHandler, className, onBlur, onFocus, readOnly, value],
        );

        const getInputByType = useCallback(() => {
            switch (typeVariant) {
                case 'search':
                    return (
                        <div className={classNames(styles.inputContainer, mods)}>
                            <div className={styles.addonLeft}>
                                <Icon Icon={SearchIcon} />
                            </div>
                            {inputContent}
                        </div>
                    );
                default:
                    return inputContent;
            }
        }, [inputContent, mods, typeVariant]);

        return <>{getInputByType()}</>;
    },
);

export default Input;
