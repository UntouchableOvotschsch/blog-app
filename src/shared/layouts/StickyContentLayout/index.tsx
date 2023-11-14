import React, { ReactElement } from 'react';

import styles from './StickyContentLayout.module.scss';

interface MainLayoutProps {
    rightContent?: ReactElement;
    leftContent?: ReactElement;
    content: ReactElement;
}

const StickyContentLayout = ({ content, rightContent, leftContent }: MainLayoutProps) => (
    <div className={styles.StickyContentLayout}>
        {leftContent && <div className={styles.left}>{leftContent}</div>}
        <div className={styles.content}>{content}</div>
        {rightContent && <div className={styles.right}>{rightContent}</div>}
    </div>
);

export default StickyContentLayout;
