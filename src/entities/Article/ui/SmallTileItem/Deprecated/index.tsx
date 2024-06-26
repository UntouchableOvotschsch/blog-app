import React, { HTMLAttributeAnchorTarget } from 'react';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetailsPage } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import Card from '@/shared/ui/deprecated/Card';
import Icon from '@/shared/ui/deprecated/Icon';
import Text from '@/shared/ui/deprecated/Text';
import AppImage from '@/shared/ui/AppImage';
import Skeleton from '@/shared/ui/deprecated/Skeleton';

import styles from './SmallTileItem.Deprecated.module.scss';
import { Article } from '../../../model/types/article';

interface BigTileItemProps {
    article: Article;
    target?: HTMLAttributeAnchorTarget;
    className?: string;
}

const SmallTileItemDeprecated = ({ article, target, className }: BigTileItemProps) => {
    const navigateToArticle = __PROJECT__ !== 'storybook' ? getRouteArticleDetailsPage(article.id) : '#';

    return (
        <AppLink to={navigateToArticle} className={classNames(styles.appLink, {}, [className])} target={target}>
            <Card className={styles.container}>
                <div className={styles.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton className={styles.image} />}
                        src={article.img}
                        alt={article.title}
                        className={styles.image}
                    />
                    <Text title={article.createdAt} classname={styles.createdAt} />
                </div>
                <div className={styles.footer}>
                    <div className={styles.infoWrapper}>
                        <Text title={article.type.join(', ')} classname={styles.types} />
                        <div className={styles.views}>
                            <Text title={String(article.views)} />
                            <Icon Icon={EyeIcon} className={styles.eyeIcon} />
                        </div>
                    </div>
                    <Text title={article.title} classname={styles.title} />
                </div>
            </Card>
        </AppLink>
    );
};

export default SmallTileItemDeprecated;
