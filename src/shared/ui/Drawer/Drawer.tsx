import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { ReactNode } from 'react';
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
    className, children, visible, changeVisibility,
}: DrawerProps) => {
    const mods: Mods = {
        [styles.opened]: visible,
    };
    return (
        <Portal>
            <div className={classNames(styles.Drawer, mods, [className])}>
                <Overlay onClick={changeVisibility} />
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
