import React, { HTMLAttributeAnchorTarget } from 'react';
import Card from '@/shared/ui/Card';
import Text from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import Icon from '@/shared/ui/Icon';
import { AppLink } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Article } from '../../model/types/article';
import styles from './SmallTileItem.module.scss';
import { RoutePath } from '@/shared/const/router';

interface BigTileItemProps {
    article: Article
    target?: HTMLAttributeAnchorTarget;
    className?: string
}

const SmallTileItem = ({ article, target, className }: BigTileItemProps) => {
    const navigateToArticle = __PROJECT__ !== 'storybook'
        ? `${RoutePath.article_details}/${article.id}` : '#';

    return (
        <AppLink
            to={navigateToArticle}
            className={classNames(styles.appLink, {}, [className])}
            target={target}
        >
            <Card className={styles.container}>
                <div className={styles.imageWrapper}>
                    <img src={article.img} alt={article.title} className={styles.image} />
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

export default SmallTileItem;
