import React from 'react';
import Icon from 'shared/ui/Icon';
import Card from 'shared/ui/Card/Card';
import Skeleton from 'shared/ui/Skeleton';
import EyeIcon from 'shared/assets/icons/eye.svg';
import styles from '../BigTileItem.module.scss';

const BigTileItemSkeleton = () => (
    <Card className={styles.container}>
        <div className={styles.header}>
            <div className={styles.userInfo}>
                <Skeleton
                    width="50px"
                    height="50px"
                    border="50%"
                />
                <Skeleton width="100px" height="20px" />
            </div>
            <Skeleton width="100px" height="20px" />
        </div>
        <Skeleton width="300px" height="35px" className={styles.title} />

        <Skeleton width="200px" height="30px" />

        <Skeleton className={styles.articleImg} />

        <Skeleton
            className={styles.textBlock}
        />

        <div className={styles.footer}>
            <Skeleton width="140px" height="40px" />
            <div className={styles.views}>
                <Skeleton height="24px" width="35px" />
                <Icon Icon={EyeIcon} />
            </div>
        </div>
    </Card>
);

export default BigTileItemSkeleton;
