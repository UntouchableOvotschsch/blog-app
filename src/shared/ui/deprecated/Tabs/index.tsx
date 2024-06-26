import React, { ReactNode, useCallback } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import styles from './Tabs.module.scss';
import { Button, ThemeButton } from '../Button';
import Card from '../Card';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className: string;
    tabs: TabItem<T>[];
    activeTabs: T[];
    tabHandler: (tab: TabItem<T>) => void;
}

/**
 * @deprecated
 */

const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, tabs, activeTabs, tabHandler } = props;

    const setTab = useCallback(
        (tab: TabItem<T>) => () => {
            tabHandler(tab);
        },
        [tabHandler],
    );

    return (
        <div className={classNames(styles.container, {}, [className])}>
            {tabs.map((tab) => (
                <Button
                    key={tab.value}
                    onClick={setTab(tab)}
                    theme={ThemeButton.CLEAR}
                    className={activeTabs.includes(tab.value) ? styles.selectedTab : ''}>
                    <Card className={styles.cardWrapper}>{tab.content}</Card>
                </Button>
            ))}
        </div>
    );
};

export default Tabs;
