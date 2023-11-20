import React from 'react';

import SkeletonDeprecated from '@/shared/ui/deprecated/Skeleton';
import Skeleton from '@/shared/ui/Skeleton';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { VStack } from '@/shared/ui/Stack';

const NotificationItemSkeleton = () => (
    <ToggleFeatureComponent
        /* eslint-disable-next-line i18next/no-literal-string */
        name='isAppRedesigned'
        on={
            <VStack align='start' gap='8'>
                <Skeleton width='200px' height='32px' border='5px' />
                <Skeleton width='100%' height='32px' border='5px' />
            </VStack>
        }
        off={<SkeletonDeprecated width='100%' border='8px' height='80px' />}
    />
);

export default NotificationItemSkeleton;
