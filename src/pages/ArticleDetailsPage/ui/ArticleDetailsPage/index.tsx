import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Suspense, useCallback, useEffect } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import CommentsList from 'entities/Comment/ui/CommentsList';
import Text, { TextSize } from 'shared/ui/Text/Text';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/service/fetchCommentsByArticleId';
import {
    addNewCommentToArticleService,
} from 'pages/ArticleDetailsPage/model/service/addNewCommentToArticle';
import { AddNewCommentForm } from 'features/AddNewComment';
import PageWrapper from 'shared/ui/PageWrapper';
import styles from './ArticleDetailsPage.module.scss';
import {
    articleDetailsPageReducer,
    commentsSelectors,
    getArticleCommentsLoading,
} from '../../model/slice/articleDetailsPageSlice';
import { fetchArticleById } from '../../model/service/fetchArticleById';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData';
import { getArticleDetailsLoading } from '../../model/selectors/getArticleDetailsLoading';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducerList: ReducerList = {
    articlesDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('articleDetails');
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isArticleLoading = useSelector(getArticleDetailsLoading);
    const isCommentsLoading = useSelector(getArticleCommentsLoading);
    const isArticleError = useSelector(getArticleDetailsError);
    const commentsDataArray = useSelector(commentsSelectors.selectAll);

    const addNewComment = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(addNewCommentToArticleService());
        }
    }, [dispatch]);

    useEffect(() => {
        if (id && __PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
            dispatch(fetchCommentsByArticleId(id));
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducerList={reducerList}>
            <PageWrapper>
                <div className={classNames(styles.container, {}, [className])}>
                    <ArticleDetails
                        article={article}
                        isLoading={isArticleLoading}
                        isError={isArticleError}
                    />
                    <div className={styles.comments}>
                        <Text title={`${t('Комментарии')}:`} size={TextSize.L} />
                        <Suspense fallback="">
                            <AddNewCommentForm addNewCommentTo={addNewComment} />
                        </Suspense>
                        <CommentsList
                            isLoading={isCommentsLoading}
                            comments={commentsDataArray}
                        />
                    </div>

                </div>
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticleDetailsPage;
