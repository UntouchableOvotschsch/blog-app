import { RatingType } from '@/entities/Rating';

export interface ArticleRatingType extends RatingType {
    userId: string,
    articleId: string
}
