import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import Text, { ThemeText } from '@/shared/ui/Text/Text';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import { getArticlesActiveTypes } from '../../model/selectors/getArticlesActiveTypes';
import { getArticleError } from '../../model/selectors/getArticlesError';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import styles from './ArticlesPage.module.scss';
import { initArticlesPage } from '../../model/service/initArticlesPage';
import { getArticlesSortField } from '../../model/selectors/getArticlesSortField';
import { getArticlesSortOrder } from '../../model/selectors/getArticlesSortOrder';
import { getArticlesSearch } from '../../model/selectors/getArticlesSearch';
import ArticleInfiniteList from '../ArticleInfiniteList/ArticleInfiniteList';

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
    const { t } = useTranslation('article');
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const error = useSelector(getArticleError);
    const sortField = useSelector(getArticlesSortField);
    const sortOrder = useSelector(getArticlesSortOrder);
    const search = useSelector(getArticlesSearch);
    const types = useSelector(getArticlesActiveTypes);

    const mods: Mods = {
        [styles.errorPage]: !!error,
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(initArticlesPage(searchParams));
            setSearchParams({
                sortField,
                sortOrder,
                search,
                types,
            });
        }
    }, [dispatch, search, searchParams, setSearchParams, sortField, sortOrder, types]);

    return (
        <DynamicModuleLoader
            reducerList={reducers}
            dontRemoveAfterUnmount
        >
            <PageWrapper
                className={classNames(styles.ArticlePage, mods, [])}
            >
                {
                    error
                        ? (
                            <Text
                                title={t('Произошла ошибка при загрузке статей')}
                                theme={ThemeText.ERROR}
                            />
                        )
                        : (
                            <ArticleInfiniteList />
                        )
                }
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
