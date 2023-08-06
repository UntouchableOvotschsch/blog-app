import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useCallback } from 'react';
import Text, { TextAlign, TextSize, ThemeText } from 'shared/ui/Text/Text';
import Avatar from 'shared/ui/Avatar';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Calendar from 'shared/assets/icons/calendar.svg';
import Icon from 'shared/ui/Icon';
import ArticleDetailsSkeleton from './ArticleDetailsSkeleton';
import styles from './ArticleDetails.module.scss';
import { Article, ArticleBlock, ArticleBlockTypes } from '../../model/types/article';
import ArticleTextBlockCom from '../ArticleTextBlockCom';
import ArticleCodeBlockCom from '../ArticleCodeBlockCom';
import ArticleImageBlockCom from '../ArticleImageBlockCom';

interface ArticleDetailsProps {
    className?: string;
    article?: Article
    isLoading: boolean
    isError?: string
}

const ArticleDetails = memo(({
    className,
    article,
    isLoading,
    isError,
}: ArticleDetailsProps) => {
    const { t } = useTranslation();

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
        );
    }
    return (
        <div className={classNames(styles.ArticleDetails, {}, [className])}>
            <div className={styles.header}>
                <Avatar
                    avatar={article?.img}
                    alt={t('Аватар статьи')}
                    className={styles.avatar}
                    width="150px"
                    height="150px"
                />
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.XL}
                />
                <div className={styles.articleInfo}>
                    <Icon Icon={EyeIcon} size="20" />
                    <Text text={article?.views.toString()} size={TextSize.L} />
                </div>
                <div className={styles.articleInfo}>
                    <Icon Icon={Calendar} size="20" />
                    <Text text={article?.createdAt} size={TextSize.L} />
                </div>
            </div>

            {
                article?.blocks && renderBlocks(article.blocks)
            }
        </div>
    );
});

export default ArticleDetails;
