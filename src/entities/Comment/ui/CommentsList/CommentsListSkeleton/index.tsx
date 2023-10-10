import React from 'react';

import Skeleton from '@/shared/ui/Skeleton';

import styles from './CommentsListSkeleton.module.scss';

const CommentsListSkeleton = () => (
    <div className={styles.container}>
        <Skeleton
            height='102px'
            width='100%'
            /* eslint-disable-next-line i18next/no-literal-string */
            border='15px'
        />
        <Skeleton
            height='102px'
            width='100%'
            /* eslint-disable-next-line i18next/no-literal-string */
            border='15px'
        />
        <Skeleton
            height='102px'
            width='100%'
            /* eslint-disable-next-line i18next/no-literal-string */
            border='15px'
        />
    </div>
);

export default CommentsListSkeleton;
