import React, { UIEvent, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails } from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import PageWrapper from '@/shared/ui/deprecated/PageWrapper';
import ProgressBar from '@/shared/ui/deprecated/ProgressBar';
import { HStack, VStack } from '@/shared/ui/Stack';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import Card from '@/shared/ui/Card';
import StickyContentLayout from '@/shared/layouts/StickyContentLayout';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteArticlesPage } from '@/shared/const/router';
import BackIcon from '@/shared/assets/icons/Redesigned/arrow-icon.svg';
import Icon from '@/shared/ui/Icon';

import ArticleDetailsInfoContainer from '../ArticleDetailsInfoContainer';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';

const ArticleDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const checkID = __PROJECT__ === 'storybook' ? '1' : id;

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslation();

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
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <StickyContentLayout
                    leftContent={
                        <AppLink to={getRouteArticlesPage()}>
                            <HStack>
                                <Icon className={styles.backIcon} Icon={BackIcon} onClick={() => undefined} clickable />
                                {t('Назад')}
                            </HStack>
                        </AppLink>
                    }
                    content={
                        <Card padding='24' rounded style={{ maxWidth: '750px' }}>
                            <VStack gap='24' align='start'>
                                <ArticleDetails id={checkID!} withArticleInfo={false} />
                                <ArticleRating articleId={checkID!} />
                                <ArticleRecommendationsList />
                                <ArticleComments id={checkID!} />
                            </VStack>
                        </Card>
                    }
                    rightContent={<ArticleDetailsInfoContainer articleId={checkID!} />}
                />
            }
            off={
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
            }
        />
    );
};

export default ArticleDetailsPage;
