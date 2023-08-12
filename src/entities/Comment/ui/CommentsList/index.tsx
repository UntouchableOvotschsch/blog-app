import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CommentType } from 'entities/Comment';
import Text from 'shared/ui/Text/Text';
import Comment from 'entities/Comment/ui/Comment';
import CommentsListSkeleton from 'entities/Comment/ui/CommentsList/CommentsListSkeleton';
import styles from './CommentsList.module.scss';

interface CommentsListProps {
    className?: string;
    comments?: CommentType[]
    isLoading?: boolean
}

const CommentsList = ({ className, comments, isLoading }: CommentsListProps) => {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(styles.CommentsList, {}, [className])}>
                <CommentsListSkeleton />
            </div>
        );
    }

    return (
        <div className={classNames(styles.CommentsList, {}, [className])}>
            {
                comments?.length
                    ? comments?.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))
                    : (
                        <Text text={t('Комментарии отсутствуют')} />
                    )

            }
        </div>
    );
};

export default CommentsList;