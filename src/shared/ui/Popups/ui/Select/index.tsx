import React, { ReactNode, useMemo } from 'react';

import { Listbox } from '@headlessui/react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import Card from '../../../Card';
import { Button } from '../../../Button';
import { HStack, VStack } from '../../../Stack';
import Text from '../../../Text';
import popupStyles from '../../styles/Popups.module.scss';
import styles from './Select.module.scss';

type SelectDirectionVariant = 'row' | 'column';
export interface SelectOptions<T extends string> {
    value: T;
    content: string;
    disabled?: boolean;
}
interface SelectProps<T extends string> {
    label?: string;
    options: SelectOptions<T>[];
    selectValue?: T;
    onChange: (value: T) => void;
    editable?: boolean;
    directionVariant?: SelectDirectionVariant;
    className?: string;
    maxWidth?: boolean;
    additionalTrigger?: ReactNode;
}

const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
    const {
        label,
        options,
        selectValue,
        onChange,
        editable = true,
        directionVariant = 'column',
        className,
        maxWidth = false,
        additionalTrigger,
    } = props;

    const optionList = useMemo(
        () =>
            options?.map((el) => (
                <Listbox.Option as='div' key={el.value} value={el.value} disabled={el.disabled}>
                    {({ active, selected }) => (
                        <li
                            className={classNames(popupStyles.option, {
                                [popupStyles.active]: active || selected,
                            })}>
                            {el.content}
                        </li>
                    )}
                </Listbox.Option>
            )),
        [options],
    );

    const contentSelectValue = options.find((el) => el.value === selectValue)?.content;

    return useMemo(() => {
        if (directionVariant === 'column') {
            return (
                <VStack gap='4'>
                    {label && <Text text={label} />}
                    <Listbox
                        as='div'
                        value={selectValue}
                        onChange={onChange}
                        className={classNames(popupStyles.container, { [styles.maxWidth]: maxWidth }, [className])}
                        disabled={!editable}>
                        <Listbox.Button as={Button} disabled={!editable} theme='clear'>
                            {contentSelectValue}
                        </Listbox.Button>
                        <Listbox.Options className={popupStyles.itemsContainer}>{optionList}</Listbox.Options>
                    </Listbox>
                </VStack>
            );
        }
        return (
            <HStack gap='16' maxWidth={maxWidth}>
                {label && <Text text={label} />}
                <Listbox
                    as='div'
                    value={selectValue}
                    onChange={onChange}
                    className={classNames(popupStyles.container, { [styles.maxWidth]: maxWidth }, [className])}
                    disabled={!editable}>
                    <Card theme='light' rounded maxWidth>
                        <HStack gap='4' justify='center'>
                            <Listbox.Button
                                as={Button}
                                className={classNames('', { [styles.button]: !additionalTrigger })}
                                disabled={!editable}
                                theme='clear'
                                maxWidth={!additionalTrigger}>
                                {contentSelectValue}
                            </Listbox.Button>
                            {additionalTrigger}
                        </HStack>
                    </Card>
                    <Listbox.Options className={popupStyles.itemsContainer}>{optionList}</Listbox.Options>
                </Listbox>
            </HStack>
        );
    }, [
        directionVariant,
        label,
        selectValue,
        onChange,
        maxWidth,
        className,
        editable,
        contentSelectValue,
        optionList,
        additionalTrigger,
    ]);
});

export default Select;
