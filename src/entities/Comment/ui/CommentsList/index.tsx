import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import TextDeprecated from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/Stack';

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
        return <CommentsListSkeleton />;
    }

    return (
        <VStack className={classNames('', {}, [className])} data-testid='CommentList.Content' gap='8'>
            {comments?.length ? (
                comments?.map((comment) => <Comment key={comment.id} comment={comment} />)
            ) : (
                <TextDeprecated text={t('Комментарии отсутствуют')} />
            )}
        </VStack>
    );
};

export default CommentsList;
