import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import Text, { TextAlign, TextSize, ThemeText } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import Avatar from '@/shared/ui/Avatar';
import Icon from '@/shared/ui/Icon';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import Calendar from '@/shared/assets/icons/calendar.svg';
import { ArticleBlockTypes } from '../../model/consts';
import ArticleDetailsSkeleton from './ArticleDetailsSkeleton';
import styles from './ArticleDetails.module.scss';
import { ArticleBlock } from '../../model/types/article';
import ArticleTextBlockCom from '../ArticleTextBlockCom';
import ArticleCodeBlockCom from '../ArticleCodeBlockCom';
import ArticleImageBlockCom from '../ArticleImageBlockCom';
import { useGetArticleDetailsQuery } from '../../model/api';

interface ArticleDetailsProps {
    className?: string;
    id: string
}

const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation('articleDetails');
    const { data: article, isLoading, isError } = useGetArticleDetailsQuery(id);
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
            <VStack>
                {isLoading && <ArticleDetailsSkeleton />}
                {isError && (
                    <Text
                        theme={ThemeText.ERROR}
                        title={t('Произошла ошибка при получении статьи')}
                        align={TextAlign.CENTER}
                    />
                )}
            </VStack>
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
                    <Text text={article?.views?.toString()} size={TextSize.L} />
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
