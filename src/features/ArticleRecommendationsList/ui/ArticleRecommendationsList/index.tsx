import React from 'react';
import Text, { TextSize, ThemeText } from 'shared/ui/Text/Text';
import { ArticleList, ArticleViewTypes } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { useGetArticlesRecommendationsQuery } from '../../model/api';

const ArticleRecommendationsList = () => {
    const { t } = useTranslation('articleRecommendationsList');
    const { data: articles, isLoading, isError } = useGetArticlesRecommendationsQuery(7);
    if (!isLoading || !articles?.length || isError) {
        return (
            <Text
                theme={ThemeText.ERROR}
                title={t('Произошла ошибка при получении рекомендаций')}
            />
        );
    }
    return (
        <VStack align="start">
            <Text title={`${t('Рекомендации')}:`} size={TextSize.L} />
            <ArticleList
                articles={articles}
                isLoading={isLoading}
                view={ArticleViewTypes.SMALL_TILE_ROW}
                target="_blank"
            />
        </VStack>
    );
};

export default ArticleRecommendationsList;
