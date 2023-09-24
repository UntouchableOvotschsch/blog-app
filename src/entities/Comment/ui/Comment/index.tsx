import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Avatar from '@/shared/ui/Avatar';
import Text, { TextAlign, TextSize } from '@/shared/ui/Text/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { CommentType } from '../../model/types/comment';
import styles from './Comment.module.scss';
import { RoutePath } from '@/shared/config/routeConfig/routePath';

interface CommentProps {
    className?: string;
    comment: CommentType
}

const Comment = ({ className, comment }: CommentProps) => {
    const { t } = useTranslation();
    const { text, user } = comment;

    return (
        <div className={classNames(styles.container, {}, [className])}>
            <AppLink className={styles.userInfo} to={`${RoutePath.profile}/${user?.id}`}>
                {
                    user?.avatar && (
                        <Avatar
                            avatar={user?.avatar}
                            alt={t('Аватар пользователя')}
                            width="50px"
                            height="50px"
                        />
                    )
                }
                <Text text={user.username} size={TextSize.L} align={TextAlign.CENTER} />
            </AppLink>
            <div className={styles.comment}>
                <Text text={text} size={TextSize.L} />
            </div>
        </div>
    );
};

export default Comment;
