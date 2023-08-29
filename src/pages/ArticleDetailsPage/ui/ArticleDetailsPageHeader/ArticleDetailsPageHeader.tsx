import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import Text from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData';
import styles from './ArticleDetailsPageHeader.module.scss';
import { getUserCanEditArticle } from '../../model/selectors/getUserCanEditArticle';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

const ArticleDetailsPageHeader = ({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation('articleDetails');
    const canEdit = useSelector(getUserCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    return (
        <div className={classNames(styles.ArticleDetailsPageHeader, {}, [className])}>
            <Button
                theme={ThemeButton.OUTLINE}
            >
                <AppLink to={RoutePath.articles}>
                    <Text title={t('Назад к списку')} />
                </AppLink>
            </Button>
            {
                canEdit && (
                    <Button
                        theme={ThemeButton.OUTLINE}
                    >
                        <AppLink to={`${RoutePath.article_details}/${article?.id}/edit`}>
                            <Text title={t('Редактировать')} />
                        </AppLink>
                    </Button>
                )
            }
        </div>
    );
};

export default ArticleDetailsPageHeader;
