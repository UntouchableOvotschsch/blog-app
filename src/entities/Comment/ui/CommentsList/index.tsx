import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Text from '@/shared/ui/deprecated/Text';

import styles from './CommentsList.module.scss';
import CommentsListSkeleton from './CommentsListSkeleton';
import { CommentType } from '../../model/types/comment';
import Comment from '../Comment';

interface CommentsListProps {
    className?: string;
    comments?: CommentType[];
    isLoading?: boolean;
}

const CommentsList = ({ className, comments, isLoading }: CommentsListProps) => {
    const { t } = useTranslation('commentsList');

    if (isLoading) {
        return (
            <div className={classNames(styles.CommentsList, {}, [className])}>
                <CommentsListSkeleton />
            </div>
        );
    }

    return (
        <div className={classNames(styles.CommentsList, {}, [className])} data-testid='CommentList.Content'>
            {comments?.length ? (
                comments?.map((comment) => <Comment key={comment.id} comment={comment} />)
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </div>
    );
};

export default CommentsList;
