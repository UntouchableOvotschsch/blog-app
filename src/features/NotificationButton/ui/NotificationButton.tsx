import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

const NotificationButton = ({ className }: NotificationButtonProps) => (
    <Popover
        className={classNames(styles.popover, {}, [className])}
        position="bottom left"
        trigger={(
            <Button theme={ThemeButton.CLEAR}>
                <Icon Icon={NotificationIcon} fill="inverted" />
            </Button>
        )}
    >
        <NotificationList className={styles.NotificationList} />
    </Popover>
);

export default NotificationButton;
