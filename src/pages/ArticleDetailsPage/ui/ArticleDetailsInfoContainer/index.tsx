import React from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData, getUserIsAdmin } from '@/entities/User';
import { useGetArticleDetailsQuery } from '@/entities/Article';
import Card from '@/shared/ui/Card';
import { ArticleInfo } from '@/widgets/ArticleInfo';
import Text from '@/shared/ui/Text';
import Skeleton from '@/shared/ui/Skeleton';

import styles from './ArticleDetailsInfoContainer.module.scss';

const ArticleDetailsInfoContainer = ({ articleId }: { articleId: string }) => {
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data: article, isLoading, isError } = useGetArticleDetailsQuery(articleId);
    const isAdmin = useSelector(getUserIsAdmin);

    const canEdit = userData?.id === article?.user?.id || isAdmin;

    if (isLoading) {
        return <Skeleton width={264} height={210} border='32px' />;
    }

    if (isError) {
        return (
            <Card padding='24' rounded>
                <Text theme='error' title={t('Произошла ошибка при загрузке статьи')} />
            </Card>
        );
    }

    return (
        <Card padding='24' rounded className={styles.container}>
            <ArticleInfo
                articleId={articleId}
                isEditable={canEdit}
                user={article?.user}
                createdAt={article?.createdAt}
                views={article?.views}
            />
        </Card>
    );
};

export default ArticleDetailsInfoContainer;
