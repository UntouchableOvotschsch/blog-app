import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
    visible: boolean;
    onClose: () => void;
    delay?: number;
}

export const useModal = ({ delay = 300, onClose, visible }: UseModalProps) => {
    const [closing, setClosing] = useState(false);
    const [opening, setOpening] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const setVisibleHandler = useCallback(() => {
        setClosing(true);
        timerRef.current = setTimeout(() => {
            setOpening(false);
            onClose();
            setClosing(false);
        }, delay);
    }, [onClose, delay]);

    useEffect(() => {
        const onEscCloseListener = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                setVisibleHandler();
            }
        };

        if (visible) {
            timerRef.current = setTimeout(() => {
                setOpening(true);
            }, delay);
        }

        document.addEventListener('keydown', onEscCloseListener);
        return () => {
            document.removeEventListener('keydown', onEscCloseListener);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [visible, setVisibleHandler, delay]);

    return {
        closing,
        opening,
        setVisibleHandler,
    };
};
