import React, { HTMLAttributeAnchorTarget } from 'react';

import { getRouteArticleDetailsPage } from '@/shared/const/router';
import Card from '@/shared/ui/Card';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import AppImage from '@/shared/ui/AppImage';
import Skeleton from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import Text from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/Redesigned/eye-icon.svg';
import Icon from '@/shared/ui/Icon';
import Avatar from '@/shared/ui/Avatar';
import { AppLink } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { ArticleBlockTypes } from '../../model/consts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import styles from './SmallTileItem.module.scss';
import SmallTileItemDeprecated from './Deprecated';

interface BigTileItemProps {
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
}

const SmallTileItem = (props: BigTileItemProps) => {
    const { target, className, article } = props;
    const navigateToArticle = getRouteArticleDetailsPage(article.id);

    const [firstParagraph, ..._] = (
        article?.blocks?.find((block) => block.type === ArticleBlockTypes.TEXT) as ArticleTextBlock
    ).paragraphs;

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <AppLink to={navigateToArticle} target={target}>
                    <Card className={classNames(styles.container, {}, [className])} rounded padding='0'>
                        <AppImage
                            fallback={<Skeleton width='100%' height='130px' />}
                            src={article.img}
                            alt={article.title}
                            width='100%'
                            height='130px'
                            style={{ objectFit: 'cover', display: 'flex' }}
                        />
                        <VStack className={styles.infoContainer} gap='4'>
                            <Text title={firstParagraph} className={styles.articleText} />
                            <HStack justify='between'>
                                <Text text={article.createdAt} />
                                <HStack gap='8' maxWidth={false}>
                                    <Icon Icon={EyeIcon} />
                                    <Text text={String(article.views)} />
                                </HStack>
                            </HStack>
                            <HStack gap='4'>
                                <Avatar
                                    avatar={article.user.avatar}
                                    alt={article.user.username}
                                    width={32}
                                    height={32}
                                />
                                <Text text={article.user.username} bold />
                            </HStack>
                        </VStack>
                    </Card>
                </AppLink>
            }
            off={<SmallTileItemDeprecated {...props} />}
        />
    );
};

export default SmallTileItem;
