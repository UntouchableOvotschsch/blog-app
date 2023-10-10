import { memo, RefObject, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import Calendar from '@/shared/assets/icons/calendar.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Avatar from '@/shared/ui/Avatar';
import Icon from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import Text, { TextAlign, TextSize, ThemeText } from '@/shared/ui/Text';

import styles from './ArticleDetails.module.scss';
import ArticleDetailsSkeleton from './ArticleDetailsSkeleton';
import { useGetArticleDetailsQuery } from '../../model/api';
import { ArticleBlockTypes } from '../../model/consts';
import { ArticleBlock } from '../../model/types/article';
import ArticleCodeBlockCom from '../ArticleCodeBlockCom';
import ArticleImageBlockCom from '../ArticleImageBlockCom';
import ArticleTextBlockCom from '../ArticleTextBlockCom';

interface ArticleDetailsProps {
    className?: string;
    id: string;
    wrapperRef?: RefObject<HTMLDivElement>;
}

const ArticleDetails = memo(({ className, id, wrapperRef }: ArticleDetailsProps) => {
    const { t } = useTranslation('articleDetails');
    const { data: article, isLoading, isError } = useGetArticleDetailsQuery(id);

    const renderBlocks = useCallback(
        (blocks: ArticleBlock[]) =>
            blocks.map((block, index) => {
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
                    default:
                        return null;
                }
            }),
        [],
    );

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
        <div
            className={classNames(styles.ArticleDetails, {}, [className])}
            ref={wrapperRef}
            data-testid='ArticleDetails.Content'
        >
            <div className={styles.header} data-testid='ArticleDetails.ArticleInfo'>
                <Avatar
                    avatar={article?.img}
                    alt={t('Аватар статьи')}
                    className={styles.avatar}
                    width='150px'
                    height='150px'
                />
                <Text title={article?.title} text={article?.subtitle} size={TextSize.XL} />
                <div className={styles.articleInfo}>
                    <Icon Icon={EyeIcon} size='20' />
                    <Text text={article?.views?.toString()} size={TextSize.L} />
                </div>
                <div className={styles.articleInfo}>
                    <Icon Icon={Calendar} size='20' />
                    <Text text={article?.createdAt} size={TextSize.L} />
                </div>
            </div>

            {article?.blocks && renderBlocks(article.blocks)}
        </div>
    );
});

export default ArticleDetails;
