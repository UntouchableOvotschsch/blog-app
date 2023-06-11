import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number
    width?: string | number
    border?: string
}

const Skeleton = ({
    className,
    height,
    width,
    border,
}: SkeletonProps) => {
    const { t } = useTranslation();

    const skeletonStyles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(styles.Skeleton, {}, [className])}
            style={skeletonStyles}
        >
            <div />
        </div>
    );
};

export default Skeleton;
