import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import Skeleton from '@/shared/ui/Skeleton';

import { getArticleRating, rateArticle } from '../../api/articleRatingApi';

interface ArticleRatingProps {
    articleId: string
}

const ArticleRating = ({ articleId }: ArticleRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading: isRatingLoading } = getArticleRating({ userId: userData?.id!, articleId });
    const [rateArticleMutation, { isLoading: isMutationLoading }] = rateArticle();

    const articleRating = data?.[0];

    const acceptWithFeedback = useCallback((starCount: number, feedback?: string) => {
        rateArticleMutation({
            rating: starCount,
            userId: userData?.id!,
            feedback,
            articleId,
        });
    }, [articleId, rateArticleMutation, userData?.id]);

    if (isRatingLoading || isMutationLoading) {
        return (
            <Skeleton width="100%" height="200px" />
        );
    }

    return (
        <RatingCard
            selectedStars={articleRating?.rating}
            feedbackText={articleRating?.feedback}
            initialTitle={t('Поставьте, пожалуйста, оценку')}
            successTitle={t('Вы уже оценили эту статью')}
            feedbackTitle={t('Оставьте, пожалуйста, отзыв')}
            onAcceptWithFeedback={acceptWithFeedback}
            onAcceptWithoutFeedback={acceptWithFeedback}
        />
    );
};

export default ArticleRating;
