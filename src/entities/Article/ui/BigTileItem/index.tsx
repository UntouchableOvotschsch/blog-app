import React, { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@/shared/ui/Card/Card';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import Avatar from '@/shared/ui/Avatar';
import Text from '@/shared/ui/Text/Text';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import Icon from '@/shared/ui/Icon';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ArticleBlockTypes } from '../../model/consts';
import styles from './BigTileItem.module.scss';
import { Article, ArticleBlock, ArticleTextBlock } from '../../model/types/article';
import ArticleTextBlockCom from '../ArticleTextBlockCom';

interface BigTileItemProps {
    article: Article
    target?: HTMLAttributeAnchorTarget;
    className?: string
}

const BigTileItem = ({ article, target, className }: BigTileItemProps) => {
    const { t } = useTranslation('article');

    const navigateToArticle = __PROJECT__ !== 'storybook'
        ? `${RoutePath.article_details}/${article.id}` : '#';

    const articleText = article
        ?.blocks
        ?.find((block: ArticleBlock) => block.type === ArticleBlockTypes.TEXT) as ArticleTextBlock;

    return (
        <Card className={classNames(styles.container, {}, [className])}>
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
            <div className={styles.imageWrapper}>
                <img src={article.img} alt={article.title} className={styles.articleImg} />
            </div>

            {
                articleText && (
                    <ArticleTextBlockCom
                        block={articleText}
                        className={styles.textBlock}
                    />
                )
            }
            <div className={styles.footer}>
                <AppLink to={navigateToArticle} className={styles.appLink} target={target}>
                    <Button theme={ThemeButton.OUTLINE}>
                        {t('Читать далее')}
                    </Button>
                </AppLink>
                <div className={styles.views}>
                    <Text title={String(article.views)} />
                    <Icon Icon={EyeIcon} />
                </div>
            </div>
        </Card>
    );
};

export default BigTileItem;
