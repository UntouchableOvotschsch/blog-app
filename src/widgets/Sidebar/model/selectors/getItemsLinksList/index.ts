import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import ListIcon from '@/shared/assets/icons/list.svg';
import Profile from '@/shared/assets/icons/profile.svg';
import { getRouteAboutPage, getRouteArticlesPage, getRouteMainPage, getRouteProfilePage } from '@/shared/const/router';

import { ItemType } from '../../types/item';

export const getItemsLinksList = createSelector(getUserAuthData, (userData) => {
    const result: ItemType[] = [
        {
            path: getRouteMainPage(),
            Icon: HomeIcon,
            text: 'Главная',
        },
        {
            path: getRouteAboutPage(),
            Icon: ListIcon,
            text: 'О нас',
        },
    ];
    if (userData) {
        result.push(
            {
                path: getRouteProfilePage(userData.id),
                Icon: Profile,
                text: 'Мой профиль',
                authOnly: true,
            },
            {
                path: getRouteArticlesPage(),
                Icon: ArticlesIcon,
                text: 'Статьи',
                authOnly: true,
            },
        );
    }
    return result;
});
