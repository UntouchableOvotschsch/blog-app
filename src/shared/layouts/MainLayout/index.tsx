import React, { ReactElement } from 'react';

import styles from './MainLayout.module.scss';

interface MainLayoutProps {
    sidebar: ReactElement;
    content: ReactElement;
    header: ReactElement;
    toolbar?: ReactElement;
}

const MainLayout = ({ sidebar, content, toolbar, header }: MainLayoutProps) => (
    <div className={styles.MainLayout}>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.rightbar}>
            <div className={styles.header}>{header}</div>
            <div className={styles.toolbar}>{toolbar}</div>
        </div>
    </div>
);

export default MainLayout;
