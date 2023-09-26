import { useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Popover } from '@/shared/ui/Popups';
import { Button, ThemeButton } from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import Drawer from '@/shared/ui/Drawer';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

const NotificationButton = ({ className }: NotificationButtonProps) => {
    const isMobile = useDeviceDetect();

    const [drawerVisible, setDrawerVisible] = useState(false);

    const drawerVisibility = useCallback(() => {
        setDrawerVisible((prevState) => !prevState);
    }, []);

    if (isMobile) {
        return (
            <div>
                <Button theme={ThemeButton.CLEAR} onClick={drawerVisibility}>
                    <Icon Icon={NotificationIcon} fill="inverted" />
                </Button>
                <Drawer visible={drawerVisible} changeVisibility={drawerVisibility}>
                    <NotificationList
                        className={
                            classNames(styles.NotificationList, {}, [styles.mobile])
                        }
                    />
                </Drawer>
            </div>
        );
    }
    return (
        <Popover
            className={classNames(styles.popover, {}, [className])}
            position="bottom left"
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon Icon={NotificationIcon} fill="inverted" />
                </Button>
            )}
        >
            <NotificationList
                className={
                    classNames(styles.NotificationList, {}, [styles.desktop])
                }
            />
        </Popover>
    );
};

export default NotificationButton;
