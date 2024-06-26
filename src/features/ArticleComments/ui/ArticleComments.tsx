import { Suspense, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentForm, CommentsList } from '@/entities/Comment';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import TextDeprecated, { TextSize } from '@/shared/ui/deprecated/Text';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import { getArticleCommentsLoading } from '../model/selectors/getArticleCommentsLoading';
import { addNewCommentToArticleService } from '../model/service/addNewCommentToArticle';
import { fetchCommentsByArticleId } from '../model/service/fetchCommentsByArticleId';
import { articleCommentsSelectors, articleCommentsSliceReducer } from '../model/slice/articleCommentsSlice';

interface ArticleCommentsProps {
    className?: string;
    id: string;
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
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <VStack gap='16' className={classNames('', {}, [className])} align='start'>
                        <Text title={`${t('Комментарии')}:`} size='size_l' />
                        {/* TODO сделать скелетон на подгрузку формы */}
                        <Suspense fallback=''>
                            <CommentForm addNewCommentTo={addNewComment} />
                        </Suspense>
                        <CommentsList isLoading={isLoading} comments={comments} />
                    </VStack>
                }
                off={
                    <VStack gap='4' className={classNames('', {}, [className])} align='start'>
                        <TextDeprecated title={`${t('Комментарии')}:`} size={TextSize.L} />
                        {/* TODO сделать скелетон на подгрузку формы */}
                        <Suspense fallback=''>
                            <CommentForm addNewCommentTo={addNewComment} />
                        </Suspense>
                        <CommentsList isLoading={isLoading} comments={comments} />
                    </VStack>
                }
            />
        </DynamicModuleLoader>
    );
};

export default ArticleComments;
