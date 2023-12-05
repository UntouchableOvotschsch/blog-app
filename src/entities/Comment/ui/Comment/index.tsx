import { useTranslation } from 'react-i18next';

import { getRouteProfilePage } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import AvatarDeprecated from '@/shared/ui/deprecated/Avatar';
import TextDeprecated, { TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/AppLink';
import Avatar from '@/shared/ui/Avatar';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import Card from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

import styles from './Comment.module.scss';
import { CommentType } from '../../model/types/comment';

interface CommentProps {
    className?: string;
    comment: CommentType;
}

const Comment = ({ className, comment }: CommentProps) => {
    const { t } = useTranslation();
    const { text, user } = comment;

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Card className={classNames('', {}, [className])} padding='8' rounded>
                    <HStack className={styles.cardContainer} data-testid='CommentItem' gap='16' align='start'>
                        <AppLink className={styles.userInfo} to={getRouteProfilePage(user.id)}>
                            <Avatar avatar={user?.avatar} alt={t('Аватар пользователя')} width='32px' height='32px' />
                        </AppLink>
                        <Text text={text} size='size_l' align='justify' />
                    </HStack>
                </Card>
            }
            off={
                <div className={classNames(styles.container, {}, [className])} data-testid='CommentItem'>
                    <AppLinkDeprecated className={styles.userInfo} to={getRouteProfilePage(user.id)}>
                        {user?.avatar && (
                            <AvatarDeprecated
                                avatar={user?.avatar}
                                alt={t('Аватар пользователя')}
                                width='50px'
                                height='50px'
                            />
                        )}
                        <TextDeprecated text={user.username} size={TextSize.L} align={TextAlign.CENTER} />
                    </AppLinkDeprecated>
                    <div className={styles.comment}>
                        <TextDeprecated text={text} size={TextSize.L} />
                    </div>
                </div>
            }
        />
    );
};

export default Comment;
