import { CSSProperties } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

/**
 * @deprecated
 */

const Skeleton = ({ className, height, width, border }: SkeletonProps) => {
    const skeletonStyles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div className={classNames(styles.Skeleton, {}, [className])} style={skeletonStyles}>
            <div />
        </div>
    );
};

export default Skeleton;
