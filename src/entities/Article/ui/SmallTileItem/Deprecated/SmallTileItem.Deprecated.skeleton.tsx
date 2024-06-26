import React from 'react';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Card from '@/shared/ui/deprecated/Card';
import Icon from '@/shared/ui/deprecated/Icon';
import Skeleton from '@/shared/ui/deprecated/Skeleton';

import styles from './SmallTileItem.Deprecated.module.scss';

interface SmallTileItemSkeletonProps {
    className?: string;
}

const SmallTileItemDeprecatedSkeleton = ({ className }: SmallTileItemSkeletonProps) => (
    <Card className={classNames(styles.container, {}, [className])}>
        <div className={styles.imageWrapper} style={{ marginBottom: '5px' }}>
            <Skeleton className={styles.image} />
        </div>
        <div className={styles.footer}>
            <div className={styles.infoWrapper} style={{ margin: '5px 0' }}>
                <Skeleton className={styles.types} height='24px' />
                <div className={styles.views} style={{ marginLeft: '5px' }}>
                    <Skeleton height='24px' width='35px' />
                    <Icon Icon={EyeIcon} className={styles.eyeIcon} />
                </div>
            </div>
            <Skeleton className={styles.title} height='24px' width='200px' />
        </div>
    </Card>
);

export default SmallTileItemDeprecatedSkeleton;
