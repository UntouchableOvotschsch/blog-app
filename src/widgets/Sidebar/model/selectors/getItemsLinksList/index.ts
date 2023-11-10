import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles.svg';
import HomeIconDeprecated from '@/shared/assets/icons/home.svg';
import AboutIconDeprecated from '@/shared/assets/icons/list.svg';
import ProfileDeprecated from '@/shared/assets/icons/profile.svg';
import HomeIcon from '@/shared/assets/icons/Redesigned/home-icon.svg';
import AboutIcon from '@/shared/assets/icons/Redesigned/about-icon.svg';
import ProfileIcon from '@/shared/assets/icons/Redesigned/profile-icon.svg';
import ArticlesIcon from '@/shared/assets/icons/Redesigned/articles-icon.svg';
import { getRouteAboutPage, getRouteArticlesPage, getRouteMainPage, getRouteProfilePage } from '@/shared/const/router';
import { toggleFeature } from '@/shared/lib/features/toggleFeature';

import { ItemType } from '../../types/item';

export const getItemsLinksList = createSelector(getUserAuthData, (userData) => {
    const result: ItemType[] = [
        {
            path: getRouteMainPage(),
            Icon: toggleFeature({ name: 'isAppRedesigned', on: () => HomeIcon, off: () => HomeIconDeprecated }),
            text: 'Главная',
        },
        {
            path: getRouteAboutPage(),
            Icon: toggleFeature({ name: 'isAppRedesigned', on: () => AboutIcon, off: () => AboutIconDeprecated }),
            text: 'О нас',
        },
    ];
    if (userData) {
        result.push(
            {
                path: getRouteProfilePage(userData.id),
                Icon: toggleFeature({ name: 'isAppRedesigned', on: () => ProfileIcon, off: () => ProfileDeprecated }),
                text: 'Мой профиль',
                authOnly: true,
            },
            {
                path: getRouteArticlesPage(),
                Icon: toggleFeature({
                    name: 'isAppRedesigned',
                    on: () => ArticlesIcon,
                    off: () => ArticlesIconDeprecated,
                }),
                text: 'Статьи',
                authOnly: true,
            },
        );
    }
    return result;
});
