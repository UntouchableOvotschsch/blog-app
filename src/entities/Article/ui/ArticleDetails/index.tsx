import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetailsData';
import Text, { TextAlign, TextSize, ThemeText } from 'shared/ui/Text/Text';
import { getArticleDetailsError, getArticleDetailsLoading } from 'entities/Article';
import Avatar from 'shared/ui/Avatar';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Calendar from 'shared/assets/icons/calendar.svg';
import Icon from 'shared/ui/Icon';
import ArticleDetailsSkeleton from './ArticleDetailsSkeleton';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import styles from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockTypes } from '../../model/types/article';
import ArticleTextBlockCom from '../ArticleTextBlockCom';
import ArticleCodeBlockCom from '../ArticleCodeBlockCom';
import ArticleImageBlockCom from '../ArticleImageBlockCom';

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
    className?: string;
    id: string
}

const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const data = useSelector(getArticleDetailsData);

    const isLoading = useSelector(getArticleDetailsLoading);
    const isError = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    const renderBlocks = useCallback((blocks: ArticleBlock[]) => blocks.map((block, index) => {
        switch (block.type) {
        case ArticleBlockTypes.TEXT:
            return (
                <ArticleTextBlockCom
                    block={block}
                    className={styles.block}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                />
            );
        case ArticleBlockTypes.CODE:
            return (
                <ArticleCodeBlockCom
                    block={block}
                    className={styles.block}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                />
            );
        case ArticleBlockTypes.IMAGE:
            return (
                <ArticleImageBlockCom
                    block={block}
                    className={styles.block}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                />
            );
        default: return null;
        }
    }), []);

    if (isLoading || isError) {
        return (
            <DynamicModuleLoader reducerList={reducers}>
                <div className={classNames(styles.status, { [styles.error]: isError }, [])}>
                    {isLoading && <ArticleDetailsSkeleton />}
                    {isError && (
                        <Text
                            theme={ThemeText.ERROR}
                            title={t('Произошла ошибка')}
                            text={t(isError)}
                            align={TextAlign.CENTER}
                        />
                    )}
                </div>
            </DynamicModuleLoader>
        );
    }
    return (
        <DynamicModuleLoader reducerList={reducers}>
            <div className={classNames(styles.ArticleDetails, {}, [className])}>
                <div className={styles.header}>
                    <Avatar
                        avatar={data?.img}
                        alt={t('Аватар статьи')}
                        className={styles.avatar}
                        width="150px"
                        height="150px"
                    />
                    <Text
                        title={data?.title}
                        text={data?.subtitle}
                        size={TextSize.XL}
                    />
                    <div className={styles.articleInfo}>
                        <Icon Icon={EyeIcon} size="20" />
                        <Text text={data?.views.toString()} size={TextSize.L} />
                    </div>
                    <div className={styles.articleInfo}>
                        <Icon Icon={Calendar} size="20" />
                        <Text text={data?.createdAt} size={TextSize.L} />
                    </div>
                </div>

                {
                    data?.blocks && renderBlocks(data?.blocks)
                }
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticleDetails;
