import { ReactNode, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import { Portal } from '../Portal';
import Overlay from '../Overlay';
import styles from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children?: ReactNode
    visible: boolean;
    changeVisibility: () => void;

}

const height = window.innerHeight - 100;

const DrawerContent = ({
    className,
    children,
    visible,
    changeVisibility,
}: DrawerProps) => {
    const { Gesture, Spring } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (visible) {
            openDrawer();
        }
    }, [api, visible, openDrawer]);
    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: changeVisibility,
        });
    };
    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        },
    );
    const display = y.to((py) => (py < height ? 'block' : 'none'));

    if (!visible) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.Drawer, {}, [className])}>
                <Overlay visible={visible} onClick={() => close()} />
                <Spring.a.div
                    className={styles.content}
                    onClick={(event) => event.stopPropagation()}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
};

const DrawerLibsLoader = ({ ...props }: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

const Drawer = ({ ...props }: DrawerProps) => (
    <AnimationProvider>
        <DrawerLibsLoader {...props} />
    </AnimationProvider>
);

export default Drawer;
