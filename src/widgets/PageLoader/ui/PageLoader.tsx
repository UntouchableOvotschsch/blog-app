import { memo } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string
}

export const PageLoader = memo(({ className }: PageLoaderProps) => (
    <div className={classNames(styles.PageLoader, {}, [className])}>
        <Loader />
    </div>

));
