import React, { HTMLAttributeAnchorTarget } from 'react';

import { useTranslation } from 'react-i18next';

import { getRouteArticleDetailsPage } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import Card from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import Avatar from '@/shared/ui/Avatar';
import Text from '@/shared/ui/Text';
import Skeleton from '@/shared/ui/Skeleton';
import AppImage from '@/shared/ui/AppImage';
import { Button } from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import EyeIcon from '@/shared/assets/icons/Redesigned/eye-icon.svg';
import { AppLink } from '@/shared/ui/AppLink';

import { ArticleBlockTypes } from '../../model/consts';
import { Article, ArticleBlock, ArticleTextBlock } from '../../model/types/article';
import BigTileItemDeprecated from './Deprecated';
import styles from './BigTileItem.module.scss';

interface BigTileItemProps {
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
}

const BigTileItem = (props: BigTileItemProps) => {
    const { t } = useTranslation('article');

    const { article, target, className } = props;
    const navigateToArticle = getRouteArticleDetailsPage(article.id);

    const articleText = article?.blocks?.find(
        (block: ArticleBlock) => block.type === ArticleBlockTypes.TEXT,
    ) as ArticleTextBlock;

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Card className={classNames('', {}, [className])} maxWidth padding='24' rounded>
                    <VStack gap='16' align='start'>
                        <VStack gap='8' align='start'>
                            <HStack gap='8'>
                                <Avatar
                                    avatar={article.user?.avatar}
                                    alt={article.user?.username}
                                    width='50px'
                                    height='50px'
                                />
                                <Text text={article.user.username} bold />
                                <Text text={article.createdAt} />
                            </HStack>
                            <Text title={article.title} bold size='size_xl' />
                        </VStack>
                        <Text title={article.subtitle} size='size_m' />
                        <AppImage
                            fallback={<Skeleton width='100%' height='420px' />}
                            src={article.img}
                            alt={article.title}
                            width='100%'
                            height='420px'
                            style={{ objectFit: 'cover' }}
                        />
                        {articleText.paragraphs && (
                            <Text
                                text={articleText.paragraphs.slice(0, 2).join(' ')}
                                className={styles.textBlock}
                                align='justify'
                            />
                        )}

                        <HStack justify='between'>
                            <Button theme='outline'>
                                <AppLink target={target} to={navigateToArticle}>
                                    {t('Читать далее')}
                                </AppLink>
                            </Button>
                            <HStack gap='8' maxWidth={false}>
                                <Icon Icon={EyeIcon} />
                                <Text text={String(article.views)} />
                            </HStack>
                        </HStack>
                    </VStack>
                </Card>
            }
            off={<BigTileItemDeprecated {...props} />}
        />
    );
};

export default BigTileItem;
