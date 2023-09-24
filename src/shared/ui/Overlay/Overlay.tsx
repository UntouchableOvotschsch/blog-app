import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick: () => void
    visible: boolean
}

const Overlay = ({ className, onClick, visible }: OverlayProps) => {
    if (!visible) {
        return null;
    }
    return (
        <div onClick={onClick} className={classNames(styles.Overlay, {}, [className])} />
    );
};

export default Overlay;
