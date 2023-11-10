import { UIEvent, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import PageWrapper from '@/shared/ui/deprecated/PageWrapper';
import ProgressBar from '@/shared/ui/deprecated/ProgressBar';
import { VStack } from '@/shared/ui/Stack';

import styles from './ArticleDetailsPage.module.scss';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

const ArticleDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const checkID = __PROJECT__ === 'storybook' ? '1' : id;

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [needBar, setNeedBar] = useState(false);
    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        if (wrapperRef.current) {
            const viewPortHeight = window.innerHeight;
            const Offset = wrapperRef.current.offsetTop;
            const ScrollTop = e.currentTarget.scrollTop;
            const ScrollHeight = wrapperRef.current.scrollHeight;
            if (Math.round(ScrollHeight / viewPortHeight) > 1) {
                setNeedBar(true);
            }
            const percent = (ScrollTop / (ScrollHeight - viewPortHeight + Offset)) * 100;
            setWidth(percent > 100 ? 100 : percent);
        }
    };

    return (
        <PageWrapper className={styles.pageWrapper} onScroll={scrollHandler}>
            {needBar && <ProgressBar width={width} />}
            <VStack gap='8' align='start' className={styles.stackContainer}>
                <ArticleDetailsPageHeader id={checkID!} />
                <ArticleDetails id={checkID!} wrapperRef={wrapperRef} />
                <ArticleRating articleId={checkID!} />
                <ArticleRecommendationsList />
                <ArticleComments id={checkID!} />
            </VStack>
        </PageWrapper>
    );
};

export default ArticleDetailsPage;
