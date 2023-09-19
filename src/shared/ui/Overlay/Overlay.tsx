import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick: () => void
}

const Overlay = ({ className, onClick }: OverlayProps) => (
    <div onClick={onClick} className={classNames(styles.Overlay, {}, [className])} />
);

export default Overlay;
