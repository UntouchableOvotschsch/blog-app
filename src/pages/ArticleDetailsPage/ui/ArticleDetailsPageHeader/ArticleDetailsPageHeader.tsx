import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import Text from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useGetArticleDetailsQuery } from 'entities/Article';
import { getUserAuthData, getUserIsAdmin } from 'entities/User';
import { HStack } from 'shared/ui/Stack';
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
                <AppLink to={RoutePath.articles} className={styles.appLink}>
                    <Text title={t('Назад к списку')} />
                </AppLink>
            </Button>
            {
                canEdit && (
                    <Button
                        theme={ThemeButton.OUTLINE}
                    >
                        <AppLink
                            to={`${RoutePath.article_details}/${article?.id}/edit`}
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
