import React from 'react';
import Skeleton from 'shared/ui/Skeleton';
import styles from './ArticleDetailsSkeleton.module.scss';

const ArticleDetailsSkeleton = () => (
    <div className={styles.container}>
        <div className={styles.avatar}>
            <Skeleton height={200} width={200} border="50%" />
        </div>
        <Skeleton height={32} width={300} />
        <Skeleton height={24} width={600} />
        <Skeleton height={200} width="100%" />
        <Skeleton height={200} width="100%" />
    </div>
);

export default ArticleDetailsSkeleton;
