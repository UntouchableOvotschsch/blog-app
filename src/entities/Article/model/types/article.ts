import { User } from 'entities/User';

export enum ArticleBlockTypes {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    CODE = 'CODE'
}

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

export enum ArticleTypes {
    ALL = 'ALL',
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS'
}

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

export enum ArticleViewTypes {
    BIG_TILE = 'BIG_TILE',
    SMALL_TILE = 'SMALL_TILE',
    SMALL_TILE_ROW = 'SMALL_TILE_ROW'

}
