import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useGetArticleDetailsQuery } from '@/entities/Article';
import { getUserAuthData, getUserIsAdmin } from '@/entities/User';
import { getRouteArticleEditPage, getRouteArticlesPage } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import Text from '@/shared/ui/Text';

import styles from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    id: string
}

const ArticleDetailsPageHeader = ({ id }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation('articleDetails');
    const userData = useSelector(getUserAuthData);
    const { data: article } = useGetArticleDetailsQuery(id);
    const isAdmin = useSelector(getUserIsAdmin);

    const canEdit = userData?.id === article?.user?.id || isAdmin;

    return (
        <HStack justify="between">
            <Button
                theme={ThemeButton.OUTLINE}
            >
                <AppLink to={getRouteArticlesPage()} className={styles.appLink}>
                    <Text title={t('Назад к списку')} />
                </AppLink>
            </Button>
            {
                canEdit && (
                    <Button
                        theme={ThemeButton.OUTLINE}
                    >
                        <AppLink
                            to={getRouteArticleEditPage(id)}
                            className={styles.appLink}
                        >
                            <Text title={t('Редактировать')} />
                        </AppLink>
                    </Button>
                )
            }
        </HStack>
    );
};

export default ArticleDetailsPageHeader;
