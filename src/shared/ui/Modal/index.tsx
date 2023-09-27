import { FC, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal';

import styles from './Modal.module.scss';
import Overlay from '../Overlay';
import { Portal } from '../Portal';

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
    const { closing, opening, setVisibleHandler } = useModal({
        visible,
        onClose: changeVisibility,
    });

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
                <Overlay visible={visible} onClick={setVisibleHandler} />
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
