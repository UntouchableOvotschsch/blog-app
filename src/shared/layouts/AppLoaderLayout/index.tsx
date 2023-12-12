import React from 'react';

import { typedMemo } from '@/shared/lib/helpers/typedMemo';
import Skeleton from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';

import MainLayout from '../MainLayout';

const AppLoaderLayout = typedMemo(() => (
    <MainLayout
        sidebar={<Skeleton width={220} height='100%' border='32px' />}
        content={
            <VStack gap='16' align='start'>
                <Skeleton width={150} height={40} />
                <Skeleton width={250} height={40} />
                <Skeleton width={300} height={60} />
                <Skeleton width='100%' height={250} />
                <Skeleton width='100%' height={300} />
            </VStack>
        }
        header={<Skeleton width='100%' height='100%' />}
    />
));

export default AppLoaderLayout;
