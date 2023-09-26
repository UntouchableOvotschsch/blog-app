import { useTranslation } from 'react-i18next';
import { Suspense, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack';
import Text, { TextSize } from '@/shared/ui/Text';
import { CommentForm, CommentsList } from '@/entities/Comment';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { addNewCommentToArticleService } from '../model/service/addNewCommentToArticle';
import { getArticleCommentsLoading } from '../model/selectors/getArticleCommentsLoading';
import { articleCommentsSelectors, articleCommentsSliceReducer } from '../model/slice/articleCommentsSlice';
import { fetchCommentsByArticleId } from '../model/service/fetchCommentsByArticleId';

interface ArticleCommentsProps {
    className?: string;
    id: string
}

const reducers: ReducerList = {
    articleComments: articleCommentsSliceReducer,
};

const ArticleComments = ({ className, id }: ArticleCommentsProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchCommentsByArticleId(id));
        }
    }, [dispatch, id]);

    const addNewComment = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(addNewCommentToArticleService(id));
        }
    }, [dispatch, id]);

    const isLoading = useSelector(getArticleCommentsLoading);
    const comments = useSelector(articleCommentsSelectors.selectAll);

    return (
        <DynamicModuleLoader reducerList={reducers}>
            <VStack gap="4" className={classNames('', {}, [className])} align="start">
                <Text title={`${t('Комментарии')}:`} size={TextSize.L} />
                {/* TODO сделать скелетон на подгрузку формы */}
                <Suspense fallback="">
                    <CommentForm addNewCommentTo={addNewComment} />
                </Suspense>
                <CommentsList
                    isLoading={isLoading}
                    comments={comments}
                />
            </VStack>
        </DynamicModuleLoader>
    );
};

export default ArticleComments;
