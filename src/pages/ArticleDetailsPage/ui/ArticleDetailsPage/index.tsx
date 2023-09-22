import { useParams } from 'react-router-dom';
import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { VStack } from '@/shared/ui/Stack';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';
import { ArticleRating } from '@/features/ArticleRating';

const ArticleDetailsPage = () => {
    const { id } = useParams<{id: string}>();

    const checkID = __PROJECT__ === 'storybook' ? '1' : id;

    return (
        <PageWrapper className={styles.ArticleDetailsPage}>
            <VStack gap="8" align="start">
                <ArticleDetailsPageHeader id={checkID!} />
                <ArticleDetails id={checkID!} />
                <ArticleRating articleId={checkID!} />
                <ArticleRecommendationsList />
                <ArticleComments id={checkID!} />
            </VStack>
        </PageWrapper>
    );
};

export default ArticleDetailsPage;
