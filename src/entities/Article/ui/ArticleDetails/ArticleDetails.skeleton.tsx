import React from 'react';

import { HStack, VStack } from '@/shared/ui/Stack';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';
import Skeleton from '@/shared/ui/Skeleton';

interface ArticleDetailsSkeletonProps {
    withArticleInfo?: boolean;
}

const ArticleDetailsSkeleton = typedMemo(({ withArticleInfo = true }: ArticleDetailsSkeletonProps) => (
    <VStack gap='16' align='start'>
        <VStack gap='8' align='start'>
            {withArticleInfo && (
                <HStack gap='8'>
                    <Skeleton width='32px' height='32px' border='50%' />
                    <Skeleton width='46px' height='24px' />
                    <Skeleton width='85px' height='24px' />
                </HStack>
            )}
            <Skeleton width='250px' height='40px' />
        </VStack>
        <Skeleton width='500px' height='32px' />
        <Skeleton width='100%' height='420px' />
        <VStack gap='8'>
            <Skeleton width='100%' height='200px' />
            <Skeleton width='100%' height='200px' />
            <Skeleton width='100%' height='200px' />
            <Skeleton width='100%' height='200px' />
        </VStack>
    </VStack>
));

export default ArticleDetailsSkeleton;
