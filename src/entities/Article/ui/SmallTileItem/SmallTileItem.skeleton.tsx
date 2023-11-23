import React from 'react';

import Skeleton from '@/shared/ui/Skeleton';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { HStack, VStack } from '@/shared/ui/Stack';
import Card from '@/shared/ui/Card';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import SmallTileItemDeprecatedSkeleton from './Deprecated/SmallTileItem.Deprecated.skeleton';
import styles from './SmallTileItem.module.scss';

interface SmallTileItemSkeletonProps {
    className?: string;
}

const SmallTileItemSkeleton = ({ className }: SmallTileItemSkeletonProps) => (
    <ToggleFeatureComponent
        /* eslint-disable-next-line i18next/no-literal-string */
        name='isAppRedesigned'
        on={
            <Card className={classNames(styles.container, {}, [className])} rounded padding='0'>
                <Skeleton width='100%' height='130px' />
                <VStack className={styles.infoContainer} gap='4'>
                    <Skeleton width='100%' height='128px' />
                    <HStack justify='between'>
                        <Skeleton height={24} width={85} />
                        <HStack gap='8' maxWidth={false}>
                            <Skeleton height={32} width={32} border='50%' />
                            <Skeleton height={24} width={29} />
                        </HStack>
                    </HStack>
                    <HStack gap='4'>
                        <Skeleton width={32} height={32} border='50%' />
                        <Skeleton width={50} height={24} />
                    </HStack>
                </VStack>
            </Card>
        }
        off={<SmallTileItemDeprecatedSkeleton className={className} />}
    />
);

export default SmallTileItemSkeleton;
