import { useCallback, useState } from 'react';

import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification.svg';
import NotificationIcon from '@/shared/assets/icons/Redesigned/notification-icon.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import Drawer from '@/shared/ui/Drawer';
import DrawerDeprecated from '@/shared/ui/deprecated/Drawer';
import IconDeprecated from '@/shared/ui/deprecated/Icon';
import Icon from '@/shared/ui/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Popover } from '@/shared/ui/Popups';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

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
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <div>
                        <Icon Icon={NotificationIcon} onClick={drawerVisibility} clickable />
                        <Drawer visible={drawerVisible} changeVisibility={drawerVisibility}>
                            <NotificationList className={classNames(styles.NotificationList, {}, [styles.mobile])} />
                        </Drawer>
                    </div>
                }
                off={
                    <div>
                        <ButtonDeprecated theme={ThemeButton.CLEAR} onClick={drawerVisibility}>
                            <IconDeprecated Icon={NotificationIconDeprecated} fill='inverted' />
                        </ButtonDeprecated>
                        <DrawerDeprecated visible={drawerVisible} changeVisibility={drawerVisibility}>
                            <NotificationList className={classNames(styles.NotificationList, {}, [styles.mobile])} />
                        </DrawerDeprecated>
                    </div>
                }
            />
        );
    }
    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Popover
                    className={classNames('', {}, [className])}
                    position='bottom left'
                    trigger={<Icon Icon={NotificationIcon} clickable onClick={() => undefined} />}>
                    <NotificationList className={classNames(styles.NotificationList, {}, [styles.desktop])} />
                </Popover>
            }
            off={
                <PopoverDeprecated
                    className={classNames(styles.NotificationListDeprecated, {}, [className, styles.popover])}
                    position='bottom left'
                    trigger={
                        <ButtonDeprecated theme={ThemeButton.CLEAR}>
                            <IconDeprecated Icon={NotificationIcon} fill='inverted' />
                        </ButtonDeprecated>
                    }>
                    <NotificationList className={classNames(styles.NotificationList, {}, [styles.desktop])} />
                </PopoverDeprecated>
            }
        />
    );
};

export default NotificationButton;
