import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Select.module.scss';

export enum SelectContainerTheme {
    ROW = 'row',
    COLUMN = 'column',
}

export interface SelectOptions<T extends string> {
    value: T
    content: string
}
interface SelectProps<T extends string> {
    label?: string
    options?: SelectOptions<T>[]
    selectValue?: T
    onChange?: (value: T) => void
    editable?: boolean
    containerTheme?: SelectContainerTheme
}
const Select = <T extends string>(props: SelectProps<T>) => {
    const { t } = useTranslation();

    const {
        label,
        options,
        selectValue,
        onChange,
        editable = true,
        containerTheme = SelectContainerTheme.COLUMN,
    } = props;

    const optionList = useMemo(() => options?.map((el) => (
        <option
            className={styles.option}
            value={el.value}
            key={el.value}
        >
            {t(el.content)}
        </option>
    )), [options, t]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    }, [onChange]);

    return (
        <div className={classNames(styles.container, {}, [styles[containerTheme]])}>
            {
                label && <span className={styles.label}>{t(label)}</span>
            }

            <select
                value={selectValue}
                className={styles.select}
                onChange={onChangeHandler}
                disabled={!editable}
            >
                {optionList}
            </select>

        </div>
    );
};

export default Select;
