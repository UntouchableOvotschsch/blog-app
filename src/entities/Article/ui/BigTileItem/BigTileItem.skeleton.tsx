import React from 'react';

import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import Skeleton from '@/shared/ui/Skeleton';
import Card from '@/shared/ui/Card';

import BigTileItemSkeletonDeprecated from './Deprecated/BigTileItem.Deprecated.skeleton';

interface BigTileItemSkeletonProps {
    className?: string;
}

const BigTileItemSkeleton = ({ className }: BigTileItemSkeletonProps) => (
    <ToggleFeatureComponent
        /* eslint-disable-next-line i18next/no-literal-string */
        name='isAppRedesigned'
        on={
            <Card className={classNames('', {}, [className])} maxWidth padding='24' rounded>
                <VStack gap='16' align='start'>
                    <VStack gap='8' align='start'>
                        <HStack gap='8'>
                            <Skeleton width='50px' height='50px' border='50%' />
                            <Skeleton width='60px' height='24px' />
                            <Skeleton width='85px' height='24px' />
                        </HStack>
                        <Skeleton width='160px' height='40px' />
                    </VStack>
                    <Skeleton width='400px' height='32px' />
                    <Skeleton width='100%' height='420px' />
                    <Skeleton width='100%' height='48px' />
                    <HStack justify='between'>
                        <Skeleton width='135px' height='42px' />
                        <HStack gap='8' maxWidth={false}>
                            <Skeleton width='32px' height='32px' />
                            <Skeleton width='70px' height='42px' />
                        </HStack>
                    </HStack>
                </VStack>
            </Card>
        }
        off={<BigTileItemSkeletonDeprecated className={className} />}
    />
);

export default BigTileItemSkeleton;
