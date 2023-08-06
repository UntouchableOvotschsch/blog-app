import React, { useCallback } from 'react';
import { Article } from 'entities/Article';
import Card from 'shared/ui/Card/Card';
import Text from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Icon from 'shared/ui/Icon';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import styles from './SmallTileItem.module.scss';

interface BigTileItemProps {
    article: Article
    isLoading?: boolean
}

const SmallTileItem = ({ article, isLoading }: BigTileItemProps) => {
    const navigate = useNavigate();

    const navigateToArticle = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            navigate(`${RoutePath.article_details}/${article.id}`);
        }
    }, [article.id, navigate]);

    return (
        <Card className={styles.container} onClick={navigateToArticle}>
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
    );
};

export default SmallTileItem;
