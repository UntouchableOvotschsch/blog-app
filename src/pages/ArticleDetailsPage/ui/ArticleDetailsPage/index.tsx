import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { PageWrapper } from 'widgets/PageWrapper';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { ArticleDetails } from 'entities/Article';
import { ArticleComments } from 'features/ArticleComments';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';

const ArticleDetailsPage = () => {
    const { t } = useTranslation('articleDetails');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <Text theme={ThemeText.ERROR} title={t('Произошла ошибка при переходе на страницу')} />
        );
    }

    return (
        <PageWrapper className={styles.ArticleDetailsPage}>
            <VStack gap="8" align="start">
                <ArticleDetailsPageHeader id={id} />
                <ArticleDetails id={id} />
                <ArticleRecommendationsList />
                <ArticleComments id={id} />
            </VStack>
        </PageWrapper>
    );
};

export default ArticleDetailsPage;
