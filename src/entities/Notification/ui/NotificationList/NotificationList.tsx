import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';

import { useGetNotificationsQuery } from '../../api/notificationApi';
import NotificationItem from '../Notification/NotificationItem';
import NotificationItemSkeleton from '../Notification/NotificationItem.skeleton';

interface NotificationListProps {
    className?: string;
}

const NotificationList = ({ className }: NotificationListProps) => {
    const user = useSelector(getUserAuthData);
    const { data: notifications, isLoading } = useGetNotificationsQuery(user?.id!, {
        pollingInterval: 10000,
    });
    const renderItems = useMemo(
        () => notifications?.map((item) => <NotificationItem item={item} key={item.id} />),
        [notifications],
    );

    if (isLoading) {
        return (
            <VStack gap='16' className={classNames('', {}, [className])}>
                <NotificationItemSkeleton />
                <NotificationItemSkeleton />
                <NotificationItemSkeleton />
            </VStack>
        );
    }

    return <VStack className={classNames('', {}, [className])}>{renderItems}</VStack>;
};

export default NotificationList;
