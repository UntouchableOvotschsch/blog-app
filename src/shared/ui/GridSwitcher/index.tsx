import React, { ReactNode, useCallback, useMemo } from 'react';

import { typedMemo } from '@/shared/lib/helpers/typedMemo';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { HStack } from '../Stack';
import { Button } from '../Button';
import Card from '../Card';
import styles from './GridSwitcher.module.scss';

interface SwitcherOptions<T> {
    value: T;
    content: ReactNode;
}

interface GridSwitcherProps<T> {
    className?: string;
    options: SwitcherOptions<T>[];
    selectedValue: T;
    onClick: (value: T) => void;
}

const GridSwitcher = typedMemo(<T,>(props: GridSwitcherProps<T>) => {
    const { className, options, onClick, selectedValue } = props;

    const onClickHandler = useCallback((value: T) => () => onClick(value), [onClick]);

    const optionsList = useMemo(
        () =>
            options.map((el, index) => (
                <Card
                    className={styles.itemContainer}
                    theme={selectedValue === el.value ? 'light' : 'primary'}
                    key={index}
                    padding='8'>
                    <Button
                        onClick={onClickHandler(el.value)}
                        disabled={selectedValue === el.value}
                        style={{display: 'flex'}}
                    >
                        {el.content}
                    </Button>
                </Card>
            )),
        [onClickHandler, options, selectedValue],
    );

    return (
        <HStack className={classNames('', {}, [className])} maxWidth={false}>
            {optionsList}
        </HStack>
    );
});

export default GridSwitcher;
