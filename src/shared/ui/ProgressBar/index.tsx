import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
    className?: string;
    width?: string | number
}

const ProgressBar = ({ className, width }: ProgressBarProps) => (
    <div className={classNames(styles.container, {}, [className])}>
        <div
            className={styles.progressBar}
            style={{
                width: `${width}%`,
            }}
        />
    </div>
);

export default ProgressBar;
