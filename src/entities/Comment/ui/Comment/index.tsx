import { useTranslation } from 'react-i18next';

import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import Avatar from '@/shared/ui/Avatar';
import Text, { TextAlign, TextSize } from '@/shared/ui/Text';

import styles from './Comment.module.scss';
import { CommentType } from '../../model/types/comment';

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
