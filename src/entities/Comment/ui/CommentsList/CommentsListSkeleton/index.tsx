import React from 'react';

import Skeleton from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/Stack';

const CommentsListSkeleton = () => (
    <VStack gap='8'>
        <Skeleton height='102px' width='100%' border='15px' />
        <Skeleton height='102px' width='100%' border='15px' />
        <Skeleton height='102px' width='100%' border='15px' />
    </VStack>
);

export default CommentsListSkeleton;
