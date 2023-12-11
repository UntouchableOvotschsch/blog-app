import { memo, RefObject, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { HStack, VStack } from '@/shared/ui/Stack';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import Avatar from '@/shared/ui/Avatar';
import AppImage from '@/shared/ui/AppImage';
import TextDeprecated, { TextAlign, ThemeText } from '@/shared/ui/deprecated/Text';

import ArticleDetailsDeprecated from './Deprecated';
import styles from './ArticleDetails.module.scss';
import ArticleDetailsSkeleton from './ArticleDetails.skeleton';
import ArticleDetailsSkeletonDeprecated from './Deprecated/Skeleton';
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
    withArticleInfo?: boolean;
}

const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id, wrapperRef, withArticleInfo = true } = props;

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
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <VStack>
                        {isLoading && <ArticleDetailsSkeleton />}
                        {isError && (
                            <Text theme='error' title={t('Произошла ошибка при получении статьи')} align='center' />
                        )}
                    </VStack>
                }
                off={
                    <VStack>
                        {isLoading && <ArticleDetailsSkeletonDeprecated />}
                        {isError && (
                            <TextDeprecated
                                theme={ThemeText.ERROR}
                                title={t('Произошла ошибка при получении статьи')}
                                align={TextAlign.CENTER}
                            />
                        )}
                    </VStack>
                }
            />
        );
    }

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <VStack gap='16' align='start' ref={wrapperRef} className={className}>
                    <VStack gap='8' align='start'>
                        {withArticleInfo && (
                            <HStack gap='8'>
                                <Avatar
                                    avatar={article?.user?.avatar}
                                    alt={article?.user?.username ?? 'Аватар пользователя'}
                                    width='32'
                                    height='32'
                                />
                                <Text text={article?.user?.username} bold />
                                <Text text={article?.createdAt} />
                            </HStack>
                        )}
                        <Text title={article?.title} size='size_xl' bold />
                    </VStack>
                    <Text title={article?.subtitle} />
                    <AppImage
                        alt={article?.title}
                        src={article?.img}
                        height='420px'
                        width='100%'
                        style={{ objectFit: 'cover' }}
                    />
                    <VStack gap='8'>{!!article?.blocks?.length && renderBlocks(article?.blocks)}</VStack>
                </VStack>
            }
            off={<ArticleDetailsDeprecated {...props} />}
        />
    );
});

export default ArticleDetails;
