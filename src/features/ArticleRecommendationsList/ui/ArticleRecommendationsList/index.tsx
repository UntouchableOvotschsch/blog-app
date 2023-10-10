import React from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleList, ArticleViewTypes } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import Text, { TextSize, ThemeText } from '@/shared/ui/Text';

import { useGetArticlesRecommendationsQuery } from '../../model/api';

const ArticleRecommendationsList = () => {
    const { t } = useTranslation('articleRecommendationsList');
    const { data: articles, isLoading, isError } = useGetArticlesRecommendationsQuery(7);
    if ((!articles?.length || isError) && !isLoading) {
        return <Text theme={ThemeText.ERROR} title={t('Произошла ошибка при получении рекомендаций')} />;
    }
    return (
        <VStack align='start' data-testid='ArticleRecommendationsList'>
            <Text title={`${t('Рекомендации')}:`} size={TextSize.L} />
            <ArticleList
                articles={articles}
                isLoading={isLoading}
                view={ArticleViewTypes.SMALL_TILE_ROW}
                target='_blank'
            />
        </VStack>
    );
};

export default ArticleRecommendationsList;
