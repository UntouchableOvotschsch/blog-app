import { User } from '@/entities/User';
import { ArticleBlockTypes, ArticleTypes } from '../consts/index';

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockTypes;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockTypes.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockTypes.IMAGE;
    title: string;
    src: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockTypes.TEXT;
    title?: string;
    paragraphs: string[];
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export interface Article {
    id: string;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleTypes[];
    blocks?: ArticleBlock[];
    user: User;
}
