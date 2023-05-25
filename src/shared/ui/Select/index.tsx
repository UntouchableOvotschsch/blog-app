import React, {
    ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import styles from './Select.module.scss';

export interface SelectOptions {
    value: string
    content: string
}
interface SelectProps {
    label?: string
    options?: SelectOptions[]
    selectValue?: string
    onChange?: (value: string) => void
    editable: boolean
}
const Select = memo(({
    label, options, selectValue, onChange, editable,
}: SelectProps) => {
    const { t } = useTranslation();
    const mods: Mods = {

    };

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
        onChange?.(e.target.value);
    }, [onChange]);

    return (
        <div className={classNames(styles.container, mods, [])}>
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
});

export default Select;
