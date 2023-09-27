import { useMemo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import Card from '@/shared/ui/Card';
import Text from '@/shared/ui/Text';

import styles from './Notification.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    item: Notification
}

const NotificationItem = ({ className, item }: NotificationItemProps) => {
    const content = useMemo(() => (
        <Card
            className={classNames(styles.Notification, {}, [className])}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    ), [className, item.description, item.title]);
    if (item.href) {
        return (
            <AppLink to={item.href} className={styles.link}>
                {content}
            </AppLink>
        );
    }
    return content;
};

export default NotificationItem;
