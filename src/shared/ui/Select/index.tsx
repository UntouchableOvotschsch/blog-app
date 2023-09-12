import { Listbox } from '@headlessui/react';
import React, { useMemo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { HStack, VStack } from '../Stack';
import Text, { TextSize } from '../Text/Text';
import { Button, ThemeButton } from '../Button/Button';
import styles from './Select.module.scss';

export enum SelectContainerTheme {
    ROW = 'row',
    COLUMN = 'column',
}

export interface SelectOptions<T extends string> {
    value: T
    content: string
    disabled?: boolean
}
interface SelectProps<T extends string> {
    label?: string
    options: SelectOptions<T>[]
    selectValue?: T
    onChange?: (value: T) => void
    editable?: boolean
    containerTheme?: SelectContainerTheme
    className?: string
}
const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        label,
        options,
        selectValue,
        onChange,
        editable = true,
        containerTheme = SelectContainerTheme.COLUMN,
        className,
    } = props;

    const optionList = useMemo(() => options?.map((el) => (
        <Listbox.Option
            className={styles.option}
            value={el.value}
            key={el.value}
            disabled={el.disabled}
        >
            {({ active, selected }) => (
                <li
                    className={classNames('', { [styles.active]: active || selected }, [])}
                >
                    {el.content}
                </li>
            )}
        </Listbox.Option>
    )), [options]);

    const contentSelectValue = options.find((el) => el.value === selectValue)?.content;

    return useMemo(() => {
        if (containerTheme === SelectContainerTheme.COLUMN) {
            return (
                <VStack gap="4">
                    {
                        label && <Text title={label} size={TextSize.M} />
                    }
                    <Listbox
                        as="div"
                        value={selectValue}
                        onChange={onChange}
                        className={classNames(styles.container, {}, [className])}
                        disabled={!editable}
                    >
                        <Listbox.Button className={styles.listBoxContainer}>
                            <Button className={styles.listBoxBtn} disabled={!editable} theme={ThemeButton.CLEAR}>
                                {contentSelectValue}
                            </Button>
                        </Listbox.Button>
                        <Listbox.Options
                            className={styles.select}
                        >
                            {optionList}
                        </Listbox.Options>
                    </Listbox>
                </VStack>
            );
        }
        return (
            <HStack gap="4">
                {
                    label && <Text title={label} size={TextSize.M} />
                }
                <Listbox
                    as="div"
                    value={selectValue}
                    onChange={onChange}
                    className={classNames(styles.container, {}, [className])}
                    disabled={!editable}
                >
                    <Listbox.Button className={styles.listBoxContainer}>
                        <Button className={styles.listBoxBtn} disabled={!editable} theme={ThemeButton.CLEAR}>
                            {contentSelectValue}
                        </Button>
                    </Listbox.Button>
                    <Listbox.Options
                        className={styles.select}
                    >
                        {optionList}
                    </Listbox.Options>
                </Listbox>
            </HStack>
        );
    }, [className, containerTheme, contentSelectValue, editable, label, onChange, optionList, selectValue]);
};

export default Select;
