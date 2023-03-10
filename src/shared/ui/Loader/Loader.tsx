import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Loader.module.scss';

interface LoaderProps {
        className?: string
}
export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames(styles.LdsRoller, {}, [className])}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
    </div>
);
