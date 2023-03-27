import {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
    className?: string
    children: ReactNode
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>

}

export const Modal: FC<ModalProps> = (
    {
        className,
        children,
        visible,
        setVisible,
    },
) => {
    const [closing, setClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const mods: Record<string, boolean> = {
        [styles.visible]: visible,
        [styles.closing]: closing,
    };

    const setVisibleHandler = useCallback(() => {
        setClosing(true);
        timerRef.current = setTimeout(() => {
            setVisible((prevState) => !prevState);
            setClosing(false);
        }, 300);
    }, [setVisible]);

    useEffect(() => {
        const onEscCloseListener = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                setVisibleHandler();
            }
        };
        document.addEventListener('keydown', onEscCloseListener);
        return () => {
            document.removeEventListener('keydown', onEscCloseListener);
            clearTimeout(timerRef.current);
        };
    }, [setVisibleHandler]);

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
