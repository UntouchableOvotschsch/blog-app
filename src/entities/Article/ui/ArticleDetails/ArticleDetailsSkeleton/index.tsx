import React from 'react';
import Skeleton from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import styles from './ArticleDetailsSkeleton.module.scss';

const ArticleDetailsSkeleton = () => (
    <VStack gap="16">
        <div className={styles.avatar}>
            <Skeleton height={200} width={200} border="50%" />
        </div>
        <VStack align="start" gap="8">
            <Skeleton height={32} width={300} />
            <Skeleton height={24} width={600} />
        </VStack>
        <Skeleton height={200} width="100%" />
        <Skeleton height={200} width="100%" />
    </VStack>
);

export default ArticleDetailsSkeleton;
