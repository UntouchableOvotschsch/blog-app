import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Suspense, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'widgets/Article';
import { useParams } from 'react-router-dom';
import { CommentsList } from 'widgets/Comment';
import Text, { TextSize } from 'shared/ui/Text/Text';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { AddNewCommentForm } from 'features/AddNewComment';
import { PageWrapper } from 'widgets/PageWrapper';
import { ArticleViewTypes } from 'entities/Article';
import { fetchArticleRecommendations } from '../../model/service/fetchArticleRecommendations';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsPageReducers } from '../../model/slice';
import { fetchCommentsByArticleId } from '../../model/service/fetchCommentsByArticleId';
import { addNewCommentToArticleService } from '../../model/service/addNewCommentToArticle';
import styles from './ArticleDetailsPage.module.scss';
import { fetchArticleById } from '../../model/service/fetchArticleById';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData';
import { getArticleDetailsLoading } from '../../model/selectors/getArticleDetailsLoading';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError';
import { commentsSelectors } from '../../model/slice/articleDetailsPageCommentsSlice';
import { recommendationSelectors } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { getArticleCommentsLoading } from '../../model/selectors/getArticleCommentsLoading';
import {
    getArticleRecommendationsLoading,
} from '../../model/selectors/getArticleRecommendationsLoading';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducerList: ReducerList = {
    articlesDetailsPage: articleDetailsPageReducers,
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
    const recommendationsDataArray = useSelector(recommendationSelectors.selectAll);
    const recommendationsLoading = useSelector(getArticleRecommendationsLoading);

    const addNewComment = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(addNewCommentToArticleService());
        }
    }, [dispatch]);

    useEffect(() => {
        if (id && __PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
            dispatch(fetchCommentsByArticleId(id));
            dispatch(fetchArticleRecommendations());
        }
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducerList={reducerList}>
            <PageWrapper>
                <ArticleDetailsPageHeader />
                <div className={classNames(styles.container, {}, [className])}>
                    <ArticleDetails
                        article={article}
                        isLoading={isArticleLoading}
                        isError={isArticleError}
                    />
                    <div className={styles.recommendations}>
                        <Text title={`${t('Рекомендации')}:`} size={TextSize.L} />
                        <ArticleList
                            articles={recommendationsDataArray}
                            isLoading={recommendationsLoading}
                            view={ArticleViewTypes.SMALL_TILE}
                            className={styles.recommendationsList}
                            /* eslint-disable-next-line i18next/no-literal-string */
                            target="_blank"
                        />
                    </div>
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
