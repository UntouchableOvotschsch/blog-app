import React from 'react';
import Icon from 'shared/ui/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Card from 'shared/ui/Card/Card';
import Skeleton from 'shared/ui/Skeleton';
import styles from '../SmallTileItem.module.scss';

const SmallTileItemSkeleton = () => (
    <Card className={styles.container}>
        <div className={styles.imageWrapper} style={{ marginBottom: '5px' }}>
            <Skeleton className={styles.image} />
        </div>
        <div className={styles.footer}>
            <div className={styles.infoWrapper} style={{ margin: '5px 0' }}>
                <Skeleton className={styles.types} height="24px" />
                <div className={styles.views} style={{ marginLeft: '5px' }}>
                    <Skeleton height="24px" width="35px" />
                    <Icon Icon={EyeIcon} className={styles.eyeIcon} />
                </div>
            </div>
            <Skeleton className={styles.title} height="24px" width="200px" />
        </div>
    </Card>
);

export default SmallTileItemSkeleton;
