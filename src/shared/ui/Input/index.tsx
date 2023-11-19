import React, {
    InputHTMLAttributes,
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
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import { HStack } from '../Stack';
import Text from '../Text';
import Icon from '../Icon';
import styles from './Input.module.scss';

type InputAlignVariant = 'left' | 'center' | 'right';
type InputTypeVariant = 'search' | 'password';
type InputSizeVariant = 'size_s' | 'size_m' | 'size_l';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'readOnly' | 'value' | 'size'>;
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
    size?: InputSizeVariant;
    label?: string;
}

const Input = ({
    className,
    onChange,
    autoFocus,
    readOnly,
    align = 'center',
    value,
    typeVariant,
    addonLeft,
    addonRight,
    size = 'size_m',
    label,
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
        if (!readOnly) {
            setFocus(true);
        }
    }, [readOnly]);

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
                value={value}
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
                    <div className={classNames(styles.inputContainer, mods, [className, styles[size]])}>
                        <div className={styles.addonLeft}>
                            <Icon Icon={SearchIcon} />
                        </div>
                        {inputContent}
                    </div>
                );
            default:
                return (
                    <div className={classNames(styles.inputContainer, mods, [className, styles[size]])}>
                        {inputContent}
                    </div>
                );
        }
    }, [className, inputContent, mods, size, typeVariant]);

    if (label) {
        return (
            <HStack gap='16' maxWidth justify='between'>
                <Text text={label} />
                {getInputByType()}
            </HStack>
        );
    }

    return <>{getInputByType()}</>;
};

export default typedMemo(Input);
