import React from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleList, ArticleViewTypes } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import TextDeprecated, { TextSize, ThemeText } from '@/shared/ui/deprecated/Text';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import { useGetArticlesRecommendationsQuery } from '../../model/api';

const ArticleRecommendationsList = () => {
    const { t } = useTranslation('articleRecommendationsList');
    const { data: articles, isLoading, isError } = useGetArticlesRecommendationsQuery(7);
    if ((!articles?.length || isError) && !isLoading) {
        return <TextDeprecated theme={ThemeText.ERROR} title={t('Произошла ошибка при получении рекомендаций')} />;
    }
    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <VStack align='start' data-testid='ArticleRecommendationsList' gap='16'>
                    <Text title={`${t('Рекомендации')}:`} size='size_l' />
                    <ArticleList
                        articles={articles}
                        isLoading={isLoading}
                        view={ArticleViewTypes.SMALL_TILE_ROW}
                        target='_blank'
                    />
                </VStack>
            }
            off={
                <VStack align='start' data-testid='ArticleRecommendationsList'>
                    <TextDeprecated title={`${t('Рекомендации')}:`} size={TextSize.L} />
                    <ArticleList
                        articles={articles}
                        isLoading={isLoading}
                        view={ArticleViewTypes.SMALL_TILE_ROW}
                        target='_blank'
                    />
                </VStack>
            }
        />
    );
};

export default ArticleRecommendationsList;
