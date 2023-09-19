import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { ReactNode } from 'react';
import { useModal } from 'shared/lib/hooks/useModal';
import { Portal } from '../Portal/Portal';
import Overlay from '../Overlay/Overlay';
import styles from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children?: ReactNode
    visible: boolean;
    changeVisibility: () => void;

}

const Drawer = ({
    className,
    children,
    visible,
    changeVisibility,
}: DrawerProps) => {
    const { closing, opening, setVisibleHandler } = useModal({ visible, changeVisibility });

    const mods: Mods = {
        [styles.visible]: opening,
        [styles.closing]: closing,
    };

    return (
        <Portal>
            <div className={classNames(styles.Drawer, mods, [className])}>
                <Overlay onClick={setVisibleHandler} />
                <div
                    className={styles.content}
                    onClick={(event) => event.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Drawer;
