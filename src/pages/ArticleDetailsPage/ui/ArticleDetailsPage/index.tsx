import { useParams } from 'react-router-dom';
import { UIEvent, useRef, useState } from 'react';
import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { VStack } from '@/shared/ui/Stack';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';
import { ArticleRating } from '@/features/ArticleRating';
import ProgressBar from '@/shared/ui/ProgressBar/ProgressBar';

const ArticleDetailsPage = () => {
    const { id } = useParams<{id: string}>();

    const checkID = __PROJECT__ === 'storybook' ? '1' : id;

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        if (wrapperRef.current) {
            const viewPortHeight = window.innerHeight;
            const Offset = wrapperRef.current.offsetTop;
            const ScrollTop = e.currentTarget.scrollTop - Offset;
            const ScrollHeight = wrapperRef.current.scrollHeight;
            const percent = (ScrollTop / (ScrollHeight - viewPortHeight)) * 100;
            setWidth(percent > 100 ? 100 : percent);
        }
    };

    return (
        <PageWrapper
            className={styles.pageWrapper}
            onScroll={scrollHandler}
        >
            <ProgressBar width={width} />
            <VStack gap="8" align="start" className={styles.stackContainer}>
                <ArticleDetailsPageHeader id={checkID!} />
                <ArticleDetails
                    id={checkID!}
                    wrapperRef={wrapperRef}
                />
                <ArticleRating articleId={checkID!} />
                <ArticleRecommendationsList />
                <ArticleComments id={checkID!} />
            </VStack>
        </PageWrapper>

    );
};

export default ArticleDetailsPage;
