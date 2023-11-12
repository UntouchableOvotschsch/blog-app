import { useMemo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import CardDeprecated from '@/shared/ui/deprecated/Card';
import TextDeprecated from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/AppLink';
import Card from '@/shared/ui/Card';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import styles from './Notification.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

const NotificationItem = ({ className, item }: NotificationItemProps) => {
    const content = useMemo(
        () => (
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <Card className={classNames(styles.Notification, {}, [className])}>
                        <Text title={item.title} text={item.description} />
                    </Card>
                }
                off={
                    <CardDeprecated className={classNames(styles.Notification, {}, [className])}>
                        <TextDeprecated title={item.title} text={item.description} />
                    </CardDeprecated>
                }
            />
        ),
        [className, item.description, item.title],
    );
    if (item.href) {
        return (
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <AppLink to={item.href} className={styles.link}>
                        {content}
                    </AppLink>
                }
                off={
                    <AppLinkDeprecated to={item.href} className={styles.link}>
                        {content}
                    </AppLinkDeprecated>
                }
            />
        );
    }
    return content;
};

export default NotificationItem;
