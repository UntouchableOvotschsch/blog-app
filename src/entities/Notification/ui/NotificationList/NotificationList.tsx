import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useMemo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import NotificationItemSkeleton from '../Notification/NotificationItem.skeleton';
import NotificationItem from '../Notification/NotificationItem';
import { useGetNotificationsQuery } from '../../api/notificationApi';

interface NotificationListProps {
    className?: string;
}

const NotificationList = ({ className }: NotificationListProps) => {
    const user = useSelector(getUserAuthData);
    const { data: notifications, isLoading } = useGetNotificationsQuery(user?.id!, {
        pollingInterval: 10000,
    });
    const renderItems = useMemo(() => (
        notifications?.map((item) => (
            <NotificationItem item={item} key={item.id} />
        ))
    ), [notifications]);

    if (isLoading) {
        return (
            <VStack gap="8" className={classNames('', {}, [className])}>
                <NotificationItemSkeleton />
                <NotificationItemSkeleton />
                <NotificationItemSkeleton />
            </VStack>
        );
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            {renderItems}
        </VStack>
    );
};

export default NotificationList;
