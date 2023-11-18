import React, { ReactNode, useCallback } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import { HStack, VStack } from '../Stack';
import { Button } from '../Button';
import Card from '../Card';
import styles from './Tabs.module.scss';

type DirectionVariant = 'column' | 'row';
type TabAlign = 'center' | 'start' | 'end';
export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    activeTabs: T[];
    tabHandler: (tab: TabItem<T>) => void;
    direction?: DirectionVariant;
    tabAlign?: TabAlign;
}

const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
    const { className, tabs, activeTabs, tabHandler, direction, tabAlign } = props;

    const setTab = useCallback(
        (tab: TabItem<T>) => () => {
            tabHandler(tab);
        },
        [tabHandler],
    );

    if (direction === 'column') {
        return (
            <VStack className={classNames('', {}, [className])} align={tabAlign} gap='8'>
                {tabs.map((tab) => (
                    <Card
                        className={styles.tabItemContainer}
                        theme={activeTabs.includes(tab.value) ? 'light' : 'primary'}
                        rounded
                        key={tab.value}>
                        <Button onClick={setTab(tab)}>{tab.content}</Button>
                    </Card>
                ))}
            </VStack>
        );
    }

    return (
        <HStack className={classNames('', {}, [className])} align={tabAlign} gap='8'>
            {tabs.map((tab) => (
                <Button className={styles.tabItemContainer} key={tab.value} onClick={setTab(tab)}>
                    <Card theme={activeTabs.includes(tab.value) ? 'light' : 'primary'} rounded>
                        {tab.content}
                    </Card>
                </Button>
            ))}
        </HStack>
    );
});

export default Tabs;
