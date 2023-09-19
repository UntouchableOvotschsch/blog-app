import { FC, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal';
import Overlay from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children: ReactNode;
    visible: boolean;
    changeVisibility: () => void;

}

export const Modal: FC<ModalProps> = (
    {
        className,
        children,
        visible,
        changeVisibility,
    },
) => {
    const { closing, opening, setVisibleHandler } = useModal({ visible, changeVisibility });

    const mods: Mods = {
        [styles.visible]: opening,
        [styles.closing]: closing,
    };

    if (!visible) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className])}>
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
