import React, { HTMLAttributeAnchorTarget } from 'react';

import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetailsPage } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import Card from '@/shared/ui/deprecated/Card';
import Icon from '@/shared/ui/deprecated/Icon';
import Text from '@/shared/ui/deprecated/Text';
import AppImage from '@/shared/ui/AppImage';
import Skeleton from '@/shared/ui/deprecated/Skeleton';
import Avatar from '@/shared/ui/deprecated/Avatar';

import styles from './BigTileItem.Deprecated.module.scss';
import { ArticleBlockTypes } from '../../../model/consts';
import { Article, ArticleBlock, ArticleTextBlock } from '../../../model/types/article';
import ArticleTextBlockCom from '../../ArticleTextBlockCom';

interface BigTileItemProps {
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
}

const BigTileItemDeprecated = ({ article, target, className }: BigTileItemProps) => {
    const { t } = useTranslation('article');

    const navigateToArticle = __PROJECT__ !== 'storybook' ? getRouteArticleDetailsPage(article.id) : '#';

    const articleText = article?.blocks?.find(
        (block: ArticleBlock) => block.type === ArticleBlockTypes.TEXT,
    ) as ArticleTextBlock;

    return (
        <Card className={classNames(styles.container, {}, [className])}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <Avatar avatar={article.user?.avatar} alt={article.user?.username} width='50px' height='50px' />
                    <Text title={article.user.username} />
                </div>
                <Text title={article.createdAt} />
            </div>
            <Text title={article.title} />
            <Text title={article.type.join(', ')} />
            <div className={styles.imageWrapper}>
                <AppImage
                    fallback={<Skeleton className={styles.articleImg} />}
                    src={article.img}
                    alt={article.title}
                    className={styles.articleImg}
                />
            </div>

            {articleText && <ArticleTextBlockCom block={articleText} className={styles.textBlock} />}
            <div className={styles.footer}>
                <AppLink to={navigateToArticle} className={styles.appLink} target={target}>
                    <Button theme={ThemeButton.OUTLINE}>{t('Читать далее')}</Button>
                </AppLink>
                <div className={styles.views}>
                    <Text title={String(article.views)} />
                    <Icon Icon={EyeIcon} />
                </div>
            </div>
        </Card>
    );
};

export default BigTileItemDeprecated;
