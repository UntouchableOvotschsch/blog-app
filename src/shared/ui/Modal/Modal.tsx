import {
    FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';

import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
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
    const [closing, setClosing] = useState(false);
    const [opening, setOpening] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const mods: Mods = {
        [styles.visible]: opening,
        [styles.closing]: closing,
    };

    const setVisibleHandler = useCallback(() => {
        setClosing(true);
        timerRef.current = setTimeout(() => {
            setOpening(false);
            changeVisibility();
            setClosing(false);
        }, 300);
    }, [changeVisibility]);

    useEffect(() => {
        const onEscCloseListener = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                setVisibleHandler();
            }
        };

        if (visible) {
            timerRef.current = setTimeout(() => {
                setOpening(true);
            }, 0);
        }

        document.addEventListener('keydown', onEscCloseListener);
        return () => {
            document.removeEventListener('keydown', onEscCloseListener);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [visible, setVisibleHandler]);

    if (!visible) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className])}>
                <div
                    className={styles.overlay}
                    onClick={setVisibleHandler}
                >
                    <div
                        className={styles.content}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
