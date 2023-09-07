import React, { useMemo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import Select, { SelectContainerTheme, SelectOptions } from 'shared/ui/Select';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon';
import SortArrow from 'shared/assets/icons/sort-arrow.svg';
import { useTranslation } from 'react-i18next';
import { SortField, SortOrder } from '../model/types/sortTypes';
import styles from './SortSelector.module.scss';

interface SortSelectorProps {
    className?: string
    sortField: SortField
    sortOrder: SortOrder
    changeSortField: (sortField: SortField) => void
    changeSortOrder: () => void
}

const SortSelector = (props: SortSelectorProps) => {
    const {
        sortField,
        sortOrder,
        changeSortField,
        changeSortOrder,
        className,
    } = props;
    const { t } = useTranslation('article');

    const sortFields = useMemo<SelectOptions<SortField>[]>(() => [
        {
            value: SortField.TITLE,
            content: t('названию'),
        },
        {
            value: SortField.CREATED,
            content: t('дате'),
        },
        {
            value: SortField.VIEWS,
            content: t('просмотрам'),
        },
    ], [t]);

    return (
        <div className={classNames(styles.sortSelector, {}, [className])}>
            <Select
                label={t('Сортировать по:')}
                selectValue={sortField}
                options={sortFields}
                onChange={changeSortField}
                containerTheme={SelectContainerTheme.ROW}
            />
            <Button
                onClick={changeSortOrder}
                theme={ThemeButton.CLEAR}
                className={styles.btn}
            >
                <Icon
                    className={classNames('', {}, [styles[sortOrder]])}
                    Icon={SortArrow}
                />
            </Button>
        </div>
    );
};

export default SortSelector;
