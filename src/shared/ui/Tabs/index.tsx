import React, { ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Card from 'shared/ui/Card/Card';
import styles from './Tabs.module.scss';

export interface TabItem <T extends string>{
    value: T
    content: ReactNode
}

interface TabsProps <T extends string>{
    className: string
    tabs: TabItem<T>[]
    activeTabs: T[]
    tabHandler: (tab: TabItem<T>) => void
}

const Tabs = <T extends string>(props: TabsProps<T>) => {
    const {
        className,
        tabs,
        activeTabs,
        tabHandler,
    } = props;

    const setTab = useCallback((tab: TabItem<T>) => () => {
        tabHandler(tab);
    }, [tabHandler]);

    return (
        <div className={classNames(styles.container, {}, [className])}>
            {tabs.map((tab) => (
                <Button
                    key={tab.value}
                    onClick={setTab(tab)}
                    theme={ThemeButton.CLEAR}
                    className={activeTabs.includes(tab.value) ? styles.selectedTab : ''}
                >
                    <Card
                        className={styles.cardWrapper}
                    >
                        {tab.content}
                    </Card>
                </Button>
            ))}
        </div>
    );
};

export default Tabs;
