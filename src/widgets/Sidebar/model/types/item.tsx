import React from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import ListIcon from 'shared/assets/icons/list.svg';
import Profile from 'shared/assets/icons/profile.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';

export interface ItemType {
    path: string | undefined,
    text: string,
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const ItemsLinksList: ItemType[] = [
    {
        path: routeConfig.profile.path,
        Icon: Profile,
        text: 'Мой профиль',
        authOnly: true,
    },
    {
        path: routeConfig.main.path,
        Icon: HomeIcon,
        text: 'Главная',
    },
    {
        path: routeConfig.articles.path,
        Icon: ArticlesIcon,
        text: 'Статьи',
        authOnly: true,
    },
    {
        path: routeConfig.about.path,
        Icon: ListIcon,
        text: 'О нас',
    },

];
