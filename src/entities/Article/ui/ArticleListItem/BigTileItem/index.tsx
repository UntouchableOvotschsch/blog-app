import React, { useCallback } from 'react';
import { Article, ArticleTextBlockCom } from 'entities/Article';
import Card from 'shared/ui/Card/Card';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import Avatar from 'shared/ui/Avatar';
import Text from 'shared/ui/Text/Text';
import {
    ArticleBlock,
    ArticleBlockTypes,
    ArticleTextBlock,
} from 'entities/Article/model/types/article';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Icon from 'shared/ui/Icon';
import styles from './BigTileItem.module.scss';

interface BigTileItemProps {
    article: Article
    isLoading?: boolean
}

const BigTileItem = ({ article, isLoading }: BigTileItemProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const navigateToArticle = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            navigate(`${RoutePath.article_details}/${article.id}`);
        }
    }, [article.id, navigate]);

    const articleText = article
        ?.blocks
        ?.find((block: ArticleBlock) => block.type === ArticleBlockTypes.TEXT) as ArticleTextBlock;

    return (
        <Card className={styles.container} onClick={navigateToArticle}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <Avatar
                        avatar={article.user?.avatar}
                        alt={article.user?.username}
                        width="50px"
                        height="50px"
                    />
                    <Text title={article.user.username} />
                </div>
                <Text title={article.createdAt} />
            </div>
            <Text title={article.title} />
            <Text title={article.type.join(', ')} />

            <img src={article.img} alt={article.title} className={styles.articleImg} />
            {
                articleText && (
                    <ArticleTextBlockCom
                        block={articleText}
                        className={styles.textBlock}
                    />
                )
            }
            <div className={styles.footer}>
                <Button theme={ThemeButton.OUTLINE} onClick={navigateToArticle}>
                    {t('Читать далее')}
                </Button>
                <div className={styles.views}>
                    <Text title={String(article.views)} />
                    <Icon Icon={EyeIcon} />
                </div>
            </div>
        </Card>
    );
};

export default BigTileItem;
